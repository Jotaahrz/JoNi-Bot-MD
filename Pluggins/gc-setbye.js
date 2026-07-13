let handler = async (m, { conn, text, usedPrefix, command }) => {
  let chat = global.db.data.chats[m.chat]

  if (!text) {
    if (chat.customBye) {
      return m.reply(`💬 Mensaje de despedida actual:\n\n${chat.customBye}`)
    } else {
      return m.reply(`👋 No hay mensaje personalizado.\nEl bot usa el mensaje predeterminado.`)
    }
  }

  if (text.trim().toLowerCase() === 'default') {
    chat.customBye = null
    return m.reply('🔁 Mensaje de despedida restaurado al original.')
  }

  chat.customBye = text.trim()
  m.reply('✅ Mensaje de despedida actualizado correctamente.')
}
handler.help = ['setbye <texto>']
handler.tags = ['grupos']
handler.command = /^setbye$/i
handler.admin = true
handler.group = true
export default handler