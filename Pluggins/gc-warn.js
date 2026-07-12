
const handler = async (m, { conn, text, command, usedPrefix }) => {
  const pp = './media/catalogo.jpg';
  let who;

  if (m.isGroup) {
    who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted
      ? m.quoted.sender
      : text;
  } else who = m.chat;

  const chat = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {};
  chat.warns = chat.warns || {};

  const dReason = 'Sin motivo';
  const msgtext = text || dReason;
  const sdms = msgtext.replace(/@\d+-?\d* /g, '');
  const warntext = `*${emojis} Etiquete a una persona o responda a un mensaje del grupo para advertir al usuario.*`;

  if (!who || typeof who !== 'string' || !who.includes('@')) {
    return m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  const isOwner = global.owner.some(([num]) => who === num + '@s.whatsapp.net');
  if (isOwner) {
    await conn.reply(m.chat, `*⚠️ No puedes advertir al propietario del bot.*`, m, { mentions: [who] });
    return;
  }

  if (who === conn.user.jid) {
    await conn.reply(m.chat, `*⚠️ No puedes advertir al bot.*`, m, { mentions: [who] });
    return;
  }

  let groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : {};
  if (groupMetadata.owner && who === groupMetadata.owner) {
    await conn.reply(m.chat, `*⚠️ No puedes advertir al creador del grupo.*`, m, { mentions: [who] });
    return;
  }

  if (!chat.warns[who]) chat.warns[who] = 0;
  chat.warns[who] += 1;

  await m.reply(
    `*@${who.split`@`[0]}* *recibió una advertencia en este grupo.*\n\n🍂 *Motivo:* ${sdms}\n🥥 *Advertencias:* ${chat.warns[who]}/3`,
    null,
    { mentions: [who] }
  );

  if (chat.warns[who] >= 3) {
    chat.warns[who] = 0;
    await m.reply(
      `❗ *Advertencia final* ❗.\n\n*🥥 @${who.split`@`[0]}* superó las 3 advertencias y será eliminado.`,
      null,
      { mentions: [who] }
    );
    await conn.groupParticipantsUpdate(m.chat, [who], 'remove');
  }

  return !1;
};

handler.help = ['warn'];
handler.tags = ['gc'];
handler.command = ['advertir', 'advertencia', 'warn', 'warning'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;