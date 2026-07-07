
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = exports.constants = void 0;

const _fs2 = _interopRequireDefault(require('fs'));

const _util = require('util');

const _path = require('path');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function() {
    const self = this;
    const args = arguments;
    return new Promise(function(resolve, reject) {
      const gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError('attempted to get private field on non-instance');
  }
  return fn;
}

const fs = {
  read: (0, _util.promisify)(_fs2.default.read),
  write: (0, _util.promisify)(_fs2.default.write),
  open: (0, _util.promisify)(_fs2.default.open),
  close: (0, _util.promisify)(_fs2.default.close),
};
const nullByte = Buffer.alloc(1);
nullByte[0] = 0;
const constants = {
  TYPE_LOSSY: 0,
  TYPE_LOSSLESS: 1,
  TYPE_EXTENDED: 2,
};
exports.constants = constants;

function VP8Width(data) {
  const n = (data[7] << 8) | data[6];
  return n & 0b0011111111111111;
}

function VP8Height(data) {
  const n = (data[9] << 8) | data[8];
  return n & 0b0011111111111111;
}

function VP8LWidth(data) {
  const n = (data[2] << 8) | data[1];
  return (n & 0b0011111111111111) + 1;
}

function VP8LHeight(data) {
  let n = (data[4] << 16) | (data[3] << 8) | data[2];
  n = n >> 6;
  return (n & 0b0011111111111111) + 1;
}

function doesVP8LHaveAlpha(data) {
  return !!(data[4] & 0b00010000);
}

function createBasicChunk(name, data) {
  const chunk = Buffer.alloc(8);
  const size = data.length;
  let out;
  chunk.write(name, 0);
  chunk.writeUInt32LE(size, 4);
  out = [chunk, data];

  if (size & 1) {
    out[2] = nullByte;
  }

  return out;
}

const _convertToExtended = new WeakSet();

const _demuxFrame = new WeakSet();

const _readHeader = new WeakSet();

const _readChunkHeader = new WeakSet();

const _readChunkHeader_buf = new WeakSet();

const _readChunk_raw = new WeakSet();

const _readChunk_VP = new WeakSet();

const _readChunk_VP8_buf = new WeakSet();

const _readChunk_VP8L = new WeakSet();

const _readChunk_VP8L_buf = new WeakSet();

const _readChunk_VP8X = new WeakSet();

const _readChunk_ANIM = new WeakSet();

const _readChunk_ANMF = new WeakSet();

const _readChunk_ALPH = new WeakSet();

const _readChunk_ALPH_buf = new WeakSet();

const _readChunk_ICCP = new WeakSet();

const _readChunk_EXIF = new WeakSet();

const _readChunk_XMP = new WeakSet();

const _readChunk_Skip = new WeakSet();

const _read = new WeakSet();

class Image {
  constructor() {
    _read.add(this);

    _readChunk_Skip.add(this);

    _readChunk_XMP.add(this);

    _readChunk_EXIF.add(this);

    _readChunk_ICCP.add(this);

    _readChunk_ALPH_buf.add(this);

    _readChunk_ALPH.add(this);

    _readChunk_ANMF.add(this);

    _readChunk_ANIM.add(this);

    _readChunk_VP8X.add(this);

    _readChunk_VP8L_buf.add(this);

    _readChunk_VP8L.add(this);

    _readChunk_VP8_buf.add(this);

    _readChunk_VP.add(this);

    _readChunk_raw.add(this);

    _readChunkHeader_buf.add(this);

    _readChunkHeader.add(this);

    _readHeader.add(this);

    _demuxFrame.add(this);

    _convertToExtended.add(this);

    _defineProperty(this, 'data', null);

    _defineProperty(this, 'loaded', false);

    _defineProperty(this, 'path', '');
  }

  clear() {
    this.data = null;
    this.path = '';
    this.loaded = false;
  }

  get width() {
    if (!this.loaded) {
      return undefined;
    }

    const d = this.data;
    return d.extended ?
      d.extended.width :
      d.vp8l ?
      d.vp8l.width :
      d.vp8 ?
      d.vp8.width :
      undefined;
  }

  get height() {
    if (!this.loaded) {
      return undefined;
    }

    const d = this.data;
    return d.extended ?
      d.extended.height :
      d.vp8l ?
      d.vp8l.height :
      d.vp8 ?
      d.vp8.height :
      undefined;
  }

  get type() {
    return this.loaded ? this.data.type : undefined;
  }

  get hasAnim() {
    return this.loaded ?
      this.data.extended ?
        this.data.extended.hasAnim :
        false :
      false;
  }

  get anim() {
    return this.hasAnim ? this.data.anim : undefined;
  }

  get frameCount() {
    return this.anim ? this.anim.frameCount : 0;
  }

  get iccp() {
    return this.data.extended ?
      this.data.extended.hasICCP ?
        this.data.iccp.raw :
        undefined :
      undefined;
  }

  set iccp(raw) {
    if (!this.data.extended) {
      _classPrivateMethodGet(
          this,
          _convertToExtended,
          _convertToExtended2,
      ).call(this);
    }

    if (raw === undefined) {
      this.data.extended.hasICCP = false;
      delete this.data.iccp;
    } else {
      this.data.iccp = {
        raw,
      };
      this.data.extended.hasICCP = true;
    }
  }

  get exif() {
    return this.data.extended ?
      this.data.extended.hasEXIF ?
        this.data.exif.raw :
        undefined :
      undefined;
  }

  set exif(raw) {
    if (!this.data.extended) {
      _classPrivateMethodGet(
          this,
          _convertToExtended,
          _convertToExtended2,
      ).call(this);
    }

    if (raw === undefined) {
      this.data.extended.hasEXIF = false;
      delete this.data.exif;
    } else {
      this.data.exif = {
        raw,
      };
      this.data.extended.hasEXIF = true;
    }
  }

  get xmp() {
    return this.data.extended ?
      this.data.extended.hasXMP ?
        this.data.xmp.raw :
        undefined :
      undefined;
  }

  set xmp(raw) {
    if (!this.data.extended) {
      _classPrivateMethodGet(
          this,
          _convertToExtended,
          _convertToExtended2,
      ).call(this);
    }

    if (raw === undefined) {
      this.data.extended.hasXMP = false;
      delete this.data.xmp;
    } else {
      this.data.xmp = {
        raw,
      };
      this.data.extended.hasXMP = true;
    }
  }

  load(path) {
    const _this = this;

    return _asyncToGenerator(function* () {
      _this.path = path;
      _this.data = yield _classPrivateMethodGet(_this, _read, _read2).call(
          _this,
          path,
      );
      _this.loaded = true;
    })();
  }

  demuxAnim(path, frame = -1, prefix = '#FNAME#') {
    const _this2 = this;

    return _asyncToGenerator(function* () {
      let start = 0;
      let end = _this2.frameCount;

      if (end == 0) {
        throw new Error('This WebP isn\'t an animation');
      }

      if (frame != -1) {
        start = end = frame;
      }

      for (let i = start; i <= end; i++) {
        yield _classPrivateMethodGet(_this2, _demuxFrame, _demuxFrame2).call(
            _this2,
            `${path}/${prefix}_${i}.webp`.replace(
                /#FNAME#/g,
                (0, _path.basename)(_this2.path, '.webp'),
            ),
            _this2.anim.frames[i],
        );
      }
    })();
  }

  replaceFrame(path, frame) {
    const _this3 = this;

    return _asyncToGenerator(function* () {
      if (!_this3.hasAnim) {
        throw new Error('WebP isn\'t animated');
      }

      if (frame < 0 || frame >= _this3.frameCount) {
        throw new Error(
            `Frame index ${frame} out of bounds (0<=index<${_this3.frameCount})`,
        );
      }

      const r = new Image();
      yield r.load(path);

      switch (r.type) {
        case constants.TYPE_LOSSY:
        case constants.TYPE_LOSSLESS:
          break;

        case constants.TYPE_EXTENDED:
          if (r.hasAnim) {
            throw new Error('Merging animations not currently supported');
          }

          break;

        default:
          throw new Error('Unknown WebP type');
      }

      switch (_this3.anim.frames[frame].type) {
        case constants.TYPE_LOSSY:
          if (_this3.anim.frames[frame].vp8.alpha) {
            delete _this3.anim.frames[frame].alph;
          }

          delete _this3.anim.frames[frame].vp8;
          break;

        case constants.TYPE_LOSSLESS:
          delete _this3.anim.frames[frame].vp8l;
          break;

        default:
          throw new Error('Unknown frame type');
      }

      switch (r.type) {
        case constants.TYPE_LOSSY:
          _this3.anim.frames[frame].vp8 = r.data.vp8;
          break;

        case constants.TYPE_LOSSLESS:
          _this3.anim.frames[frame].vp8l = r.data.vp8l;
          break;

        case constants.TYPE_EXTENDED:
          if (r.data.vp8) {
            _this3.anim.frames[frame].vp8 = r.data.vp8;

            if (r.data.vp8.alpha) {
              _this3.anim.frames[frame].alph = r.data.alph;
            }
          } else if (r.data.vp8l) {
            _this3.anim.frames[frame].vp8l = r.data.vp8l;
          }

          break;
      }

      _this3.anim.frames[frame].width = r.width;
      _this3.anim.frames[frame].height = r.height;
    })();
  }

  muxAnim({path, bgColor = [255, 255, 255, 255], loops = 0} = {}) {
    const _this4 = this;

    return _asyncToGenerator(function* () {
      return Image.muxAnim({
        path,
        bgColor,
        loops,
        frames: _this4.frames,
      });
    })();
  }

  static muxAnim({
    path,
    frames,
    width = 0,
    height = 0,
    bgColor = [255, 255, 255, 255],
    loops = 0,
    delay = 100,
    x = 0,
    y = 0,
    blend = true,
    dispose = false,
  } = {}) {
    return _asyncToGenerator(function* () {
      const header = Buffer.alloc(12);
      let chunk = Buffer.alloc(18);
      const out = [];
      let img;
      let alpha = false;
      let size;
      let _w = 0;
      let _h = 0;

      const _width = width - 1;
      const _height = height - 1;

      if (frames.length == 0) {
        throw new Error('No frames to mux');
      } else if (_width <= 0 || _width > 1 << 24) {
        throw new Error('Width out of range');
      } else if (_height <= 0 || _height > 1 << 24) {
        throw new Error('Height out of range');
      } else if (_height * _width > Math.pow(2, 32) - 1) {
        throw new Error(`Width*height too large (${_width}, ${_height})`);
      } else if (loops < 0 || loops >= 1 << 24) {
        throw new Error('Loops out of range');
      } else if (delay < 0 || delay >= 1 << 24) {
        throw new Error('Delay out of range');
      } else if (x < 0 || x >= 1 << 24) {
        throw new Error('X out of range');
      } else if (y < 0 || y >= 1 << 24) {
        throw new Error('Y out of range');
      }

      header.write('RIFF', 0);
      header.write('WEBP', 8);
      chunk.write('VP8X', 0);
      chunk.writeUInt32LE(10, 4);
      chunk[8] |= 0b00000010;

      if (width != 0) {
        chunk.writeUIntLE(_width, 12, 3);
      }

      if (height != 0) {
        chunk.writeUIntLE(_height, 15, 3);
      }

      out.push(header, chunk);
      chunk = Buffer.alloc(14);
      chunk.write('ANIM', 0);
      chunk.writeUInt32LE(6, 4);
      chunk.writeUInt8(bgColor[2], 8);