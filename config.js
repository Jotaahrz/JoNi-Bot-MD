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

global.botname = 'JaNi Bot'
global.dev = 'by Jota x Nicky'
global.errorm = 'Error: ${error.message}'
global.namebot = 'JaNi Bot'
global.textmain = 'JaNi Bot'
global.textmain2 = 'JaNi Bot MD'

global.sessions = 'JaNiSession'
global.jadi = 'JadiBots'

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