import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

const fkontak = {
  key: {
    participant: '0@s.whatsapp.net',
    remoteJid: 'status@broadcast',
    fromMe: false,
    id: 'Halo'
  },
  message: {
    contactMessage: {
      displayName: '𝗝𝗼𝗡𝗶 𝗕𝗼𝘁\n✅ sticker creado con exito',
      vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sticker;Exito;;;\nFN:🖼️ sticker creado con exito\nORG:Sticker Exito\nTEL;type=CELL;type=VOICE;waid=1234567890:+1 234 567 890\nEND:VCARD`
    }
  }
}

let handler = async (m, { conn, args }) => {
  let stiker = false
  let q = m.quoted || m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  const mensajeError = `${emojis} *Conversión fallida, responde a una imagen o video para convertir en sticker.*`

  try {
    if (mime.startsWith('image/') || mime.startsWith('video/') || mime === 'image/webp') {
      let media = await q.download?.()
      if (!media) return conn.reply(m.chat, mensajeError, m)

      try {
        stiker = await sticker(media, false, global.packN, global.authN)
      } catch (e) {
        let url
        if (mime === 'image/webp') url = await webp2png(media)
        else if (mime.startsWith('image/')) url = await uploadImage(media)
        else if (mime.startsWith('video/')) url = await uploadFile(media)

        if (!url || typeof url !== 'string' || !isValidUrl(url)) {
          return conn.reply(m.chat, '❌ No se pudo obtener una URL válida del archivo.', m)
        }

        stiker = await sticker(false, url, global.packN, global.authN)
      }

    } else if (args[0]) {
      if (!isValidUrl(args[0])) return conn.reply(m.chat, '❌ La *URL* es inválida.', m)
      stiker = await sticker(false, args[0], global.packN, global.authN)
    } else {
      return conn.reply(m.chat, mensajeError, m)
    }

  } catch {
    stiker = false
  }

  if (stiker && Buffer.isBuffer(stiker)) {
    await conn.sendMessage(
      m.chat,
      { sticker: stiker },
      { quoted: fkontak }
    )
  } else {
    conn.reply(m.chat, '❌ No se pudo generar el sticker. Asegúrate de que el archivo sea válido.', m)
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler

function isValidUrl(text) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(text)
}