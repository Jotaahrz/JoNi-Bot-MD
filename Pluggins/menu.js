import { join } from 'path'
import { readFileSync } from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
  let taguser = m.mentionedJid?.[0] || m.quoted?.sender || m.sender
  
  // Si quieres usar la URL directamente:
  const imgUrl = 'https://files.evogb.win/NGI1Nh.jpg'
  
  // Texto del menú
  let menuText = `🌷 *[ JoNi Bot MD ]* 🐼\n\n`
  menuText += `👤 Usuario: @${taguser.split('@')[0]}\n`
  menuText += `⚙️ Prefijo: ${usedPrefix}\n\n`

  let help = Object.values(global.plugins).filter(p => p.help && !p.disabled)
  let groups = {}

  for (let plugin of help) {
    let category = plugin.tags?.[0] || 'otros'
    if (!groups[category]) groups[category] = []
    groups[category].push(...(Array.isArray(plugin.help) ? plugin.help : [plugin.help]))
  }

  for (let category of Object.keys(groups).sort()) {
    menuText += `🌷 ${category.toUpperCase()}\n`
    for (let cmd of groups[category].sort()) {
      menuText += `   ➤ ${usedPrefix}${cmd}\n`
    }
    menuText += `───────────────\n\n`
  }

  menuText += `> JoNi Bot MD`

  // Enviar imagen desde URL
  await conn.sendMessage(m.chat, { 
    image: { url: imgUrl }, 
    caption: menuText, 
    mentions: [taguser] 
  }, { quoted: m })
}
handler.command = /^(menu|help|menú)$/i

export default handler