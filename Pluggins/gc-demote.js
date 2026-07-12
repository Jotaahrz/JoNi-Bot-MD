/* 
Created by Crxstian Escobar 🌙
*/

const handler = async (m, { conn }) => {
  if (!m.mentionedJid[0] && !m.quoted) {
    let texto = `*${emojis} Menciona o responde al mensaje del usuario que deseas quitarle el admin.*`
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) })
  }

  let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
  let groupMetadata = await conn.groupMetadata(m.chat)

  if (user === groupMetadata.owner) {
    return m.reply(`*⚠️ No puedes degradar al creador del grupo.*`)
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'demote')
  m.reply(`*✅ El usuario fue degradado de la administración.*`)
}

handler.help = ['demote']
handler.tags = ['gc']
handler.command = /^(demote|quitarpoder|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler