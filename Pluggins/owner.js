import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  await m.react('☕')

  // Mensaje de carga inicial
  let msgCarga = await conn.reply(m.chat, '🌷🐼 *Espere en lo que se actualiza su bot...*', m)

  try {
    let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : '')).toString().trim()
    let mensaje = stdout.includes('Already up to date') 
      ? '*⚪ El repositorio del bot está actualizado.*' 
      : '*🐼JoNi Bot actualizado con éxito🌷*\n\n' + stdout

    // Simula un pequeño delay antes de mostrar el resultado
    setTimeout(async () => {
      await conn.reply(m.chat, mensaje, m)
      await m.react('🌷')
    }, 2000) // 2 segundos de espera
  } catch (err) {
    await conn.reply(m.chat, `❌ Error al actualizar:\n${err.message}`, m)
  }
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'actualizar', 'fix', 'fixed'] 
handler.rowner = true

export default handler