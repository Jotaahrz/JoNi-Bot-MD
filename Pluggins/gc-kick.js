let handler = async (m, { conn, participants, usedPrefix, command, isROwner }) => {
  if (!global.db.data.settings[conn.user.jid].restrict)
{
return m.reply(`*${emoji} El actual owner tiene deshabilitado esta función*`);
}
    let kickte = `*${emojis} Menciona al usuario que deseas eliminar del grupo.*`

    if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)})

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let owr = m.chat.split`-`[0]

    // Verificamos si el usuario a eliminar es el creador del grupo
    let groupMetadata = await conn.groupMetadata(m.chat)
    let owner = groupMetadata.owner

    if (user === owner) {
        return m.reply(`*⚠️ No puedes eliminar al creador del grupo.*`)
    }

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
    m.reply(`*${emojis} El participante fue eliminado del grupo.*`)
}

handler.help = ['kick']
handler.tags = ['gc']
handler.command = ['kick', 'expulsar', 'ban', 'rip', 'sacar'] 
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
