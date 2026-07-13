// mute-unmute.js
const mutedUsers = new Set();

const handler = async (m, { conn, command }) => {
  if (!m.isGroup) return conn.reply(m.chat, global.message.error.notGroup, m);

  const target = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null);
  if (!target) return conn.reply(m.chat, '⚠️ *Debes mencionar o responder a alguien.*', m);

  const isOwner = Array.isArray(global.owner) 
    ? global.owner.some(o => target.includes(o)) 
    : false;
  const isBot = target === conn.user.jid;
  if (isOwner || isBot) {
    return conn.reply(m.chat, '⚠️ *No puedes mutear al propietario del bot*', m);
  }

  if (/^mute$/i.test(command)) {
    mutedUsers.add(target);
    conn.reply(m.chat, `🔇 Usuario @${target.split('@')[0]} ha sido muteado.`, m, { mentions: [target] });
  }

  if (/^unmute$/i.test(command)) {
    if (target === m.sender) {
      return conn.reply(m.chat, '⚠️ *No puedes desmutearte a ti mismo.*', m);
    }
    mutedUsers.delete(target);
    conn.reply(m.chat, `🔊 Usuario @${target.split('@')[0]} ha sido desmuteado.`, m, { mentions: [target] });
  }
};

const before = async (m, { conn }) => {
  if (mutedUsers.has(m.sender)) {
    try {
      await conn.sendMessage(m.chat, { delete: m.key });
    } catch (e) {
      console.error('Error al borrar mensaje:', e);
    }
    return true;
  }
  return false;
};

handler.command = /^(mute|unmute)$/i;
handler.tags = ['grupos'];
handler.help = ['mute','unmute'];
handler.group = true;
handler.admin = true;
handler.before = before;

export default handler;