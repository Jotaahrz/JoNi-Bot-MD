let handler = async (m, { conn, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat]

  if (!text) {
    if (chat.customWelcome) {
      return m.reply(`💬 Mensaje de bienvenida actual:\n\n${chat.customWelcome}`)
    } else {
      return m.reply(`✨ No hay mensaje personalizado.\nEl bot usa el mensaje predeterminado.`)
    }
  }

  if (text.trim().toLowerCase() === 'default') {
    chat.customWelcome = null
    return m.reply('🔁 Mensaje de bienvenida restaurado al original.')
  }

  chat.customWelcome = text.trim()
  m.reply('✅ Mensaje de bienvenida actualizado correctamente.')
}
handler.help = ['setwelcome <texto>']
handler.tags = ['grupos']
handler.command = /^setwelcome$/i
handler.admin = true
handler.group = true
export default handler