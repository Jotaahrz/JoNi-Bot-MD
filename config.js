import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

global.owner = [
   ['573155227977', 'Jota 🐼', true],
   ['573248105417', 'Nicky 🌷', true],
]

global.creator = ['573155227977',
                  '573248105417',
]

global.botname = 'JoNi Bot'
global.dev = 'by Jota x Nicky'
global.errorm = 'Error: ${error.message}'
global.namebot = 'JoNi Bot'
global.textmain = 'JoNi Bot'
global.textmain2 = 'JoNi Bot MD'

global.sessions = 'JoNiSession'
global.jadi = 'JadiBots'


global.catalogo = fs.readFileSync('./media/catalogo.jpg')

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment        


global.multiplier = 69 
global.maxwarn = '3'


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})