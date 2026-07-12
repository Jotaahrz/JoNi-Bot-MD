// config.js
import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'

// ========== PROPIETARIOS ==========
global.owner = [
  ['573155227977', 'Jota 🐼', true],
  ['573248105417', 'Nicky 🌷', true],
]

global.creator = [
  '573155227977',
  '573248105417',
]

// ========== INFORMACIÓN DEL BOT ==========
global.botname = 'JoNi Bot'
global.dev = 'by Jota x Nicky'
global.errorm = 'Error: ${error.message}'
global.namebot = 'JoNi Bot'
global.textmain = 'JoNi Bot'
global.textmain2 = 'JoNi Bot MD'

// ========== SESIONES Y AUTENTICACIÓN ==========
global.sessions = 'JoNiSession'
global.jadi = 'JadiBots'

// ========== EMOJIS GLOBALES ==========
global.emojis = '✅'      // Para mensajes de éxito
global.emoji = '⚠️'       // Para mensajes de advertencia
global.moneda = '🪙'      // Moneda del bot

// ========== MULTIMEDIA ==========
global.catalogo = fs.readFileSync('./media/catalogo.jpg')

// ========== LIBRERÍAS GLOBALES ==========
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment

// ========== CONFIGURACIONES DEL BOT ==========
global.multiplier = 69
global.maxwarn = '3'

// ========== MENSAJES DE ERROR PREDEFINIDOS ==========
global.message = {
  error: {
    notAdmin: '*⚠️ Solo los administradores pueden usar este comando.*',
    notBotAdmin: '*⚠️ Necesito ser administrador para ejecutar este comando.*',
    notGroup: '*⚠️ Este comando solo funciona en grupos.*',
    notPrivate: '*⚠️ Este comando solo funciona en privado.*',
    notOwner: '*⚠️ Solo el propietario puede usar este comando.*',
    notPremium: '*⭐ Este comando es solo para usuarios premium.*',
    notRegistered: '*⚠️ Debes registrarte primero. Usa: .reg nombre.edad*',
    restrict: '*⚠️ Esta característica está desactivada.*'
  }
}

// ========== CONFIGURACIÓN DE ADMINISTRACIÓN ==========
global.admin = {
  allowKickOwner: false,  // ¿Permitir eliminar al creador?
  allowSelfKick: false,   // ¿Permitir auto-expulsión?
  logKicks: true,         // ¿Registrar expulsiones?
  kickMessage: '👋 El usuario {user} fue eliminado del grupo por {admin}'
}

// ========== LÍMITES Y COOLDOWNS ==========
global.limit = {
  free: 15,
  premium: 50
}

global.cooldown = 5000 // 5 segundos

// ========== VERSIÓN Y REPOSITORIO ==========
global.version = '1.0.0'
global.repo = 'https://github.com/JotaX3/JoNi-Bot'
global.website = 'https://jonibot.xyz'

// ========== WATCH FILE ==========
let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
