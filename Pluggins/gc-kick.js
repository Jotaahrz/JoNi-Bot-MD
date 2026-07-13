let handler = async (m, { conn, args, participants }) => {

  let target

  if (m.quoted) {
    target = m.quoted.sender
  } else if (args[0]) {
    let mentioned = args[0].replace(/[@+]/g, '') + '@s.whatsapp.net'
    target = mentioned
  } else {
    return conn.reply(m.chat, '*Debes mencionar o responder a alguien 👤*', m)
  }

  let exists = participants.find(p => p.id === target)
  if (!exists) {
    return conn.reply(m.chat, '*Ese usuario no está en el grupo* ⚠️', m)
  }

  await conn.reply(m.chat, `👢 *Expulsando a* @${target.split('@')[0]}...`, m, {
    mentions: [target]
  })

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
  } catch (e) {
    conn.reply(m.chat, 'No pude expulsar al usuario, revisa permisos ⚠️', m)
  }
}

handler.command = ['kick', 'sacar','ban']
handler.tags = ['grupos']
handler.help = ['kick']
handler.admin = true
export default handler