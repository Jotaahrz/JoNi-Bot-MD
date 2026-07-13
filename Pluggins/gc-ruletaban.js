let handler = async (m, { conn, participants }) => {
  // Filtrar solo usuarios válidos (no el bot ni administradores si quieres)
  let users = participants.filter(p => !p.admin && p.id !== conn.user.jid).map(p => p.id)

  if (users.length === 0) {
    return conn.reply(m.chat, '*No hay usuarios disponibles para eliminar* 🎯', m)
  }

  let elegido = users[Math.floor(Math.random() * users.length)]

  await conn.reply(m.chat, `🎡 *La ruleta giró... y salió:* @${elegido.split('@')[0]} 😈\n> serás eliminadx del grupo.`, m, {
    mentions: [elegido]
  })

  try {
    await conn.groupParticipantsUpdate(m.chat, [elegido], 'remove')
  } catch (e) {
    conn.reply(m.chat, '*No pude eliminar al usuario, revisa permisos* ⚠️', m)
  }
}

handler.command = ['ruletaban','rban']
handler.tags = ['grupos']
handler.help = ['rban']
export default handler