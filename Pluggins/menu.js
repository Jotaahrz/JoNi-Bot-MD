import fs from 'fs'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let { exp, coins, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)

    exp = exp || 0
    role = role || 'Novato'

    const taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
    const uptime = clockString(process.uptime() * 1000)
    const readMore = '\u200b'.repeat(850)

    await m.react('✔️')

    const img = 'https://files.evogb.win/A1Xec6.jpg'

    // Solo categorías gc y tools
    let symbols = {
      tools: "◆",
      gc: "◇"
    }

    const tagTitles = {
      tools: "Herramientas",
      gc: "Grupos"
    }

    let tags = {}
    for (let key in symbols) {
      tags[key] = ` ${tagTitles[key]} `
    }

    let defaultMenu = {
      before: `─── MENU ───
Usuario: ${taguser}
Rol: ${role}
Nivel: ${level}
Exp: ${exp}

${readMore}
Comandos disponibles:`,
      header: category => `\n── ${category} ──`,
      body: (cmd, symbol) => `${symbol} ${cmd}`,
      footer: `──────────────`,
      after: `\n> ${dev}`
    }

    let help = Object.values(global.plugins)
      .filter(plugin => !plugin.disabled)
      .map(plugin => ({
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags]
      }))

    let groupsByTag = {}
    for (let tag in symbols) {
      groupsByTag[tag] = help.filter(plugin => plugin.tags.includes(tag))
    }

    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag =>
        [
          defaultMenu.header(tags[tag]),
          groupsByTag[tag]
            .flatMap(plugin => plugin.help.map(cmd => defaultMenu.body(usedPrefix + cmd, symbols[tag])))
            .join('\n'),
          defaultMenu.footer
        ].join('\n')
      ),
      defaultMenu.after
    ].join('\n')

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: menuText,
      mentions: [m.sender]
    }, { quoted: fkontak })

  } catch (e) {
    console.error(e)
    await m.reply('*❌ Hubo un error al generar el menú.*')
  }
}

handler.command = /^(menu|menú|help|info|comandos|ayuda|commands|cmd)$/i
export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}