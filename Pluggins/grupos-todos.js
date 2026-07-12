import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const handler = async (m, { isOwner, isAdmin, conn, participants, args, command }) => {
  try {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn);
      return;
    }

    const customMessage = args.join(' ');
    const groupMetadata = await conn.groupMetadata(m.chat).catch(() => ({ subject: 'Grupo', participants: [] }));
    const groupName = groupMetadata.subject;

    const countryFlags = [
      { prefijo: '502', bandera: '🇬🇹' }, { prefijo: '503', bandera: '🇸🇻' },
      { prefijo: '504', bandera: '🇭🇳' }, { prefijo: '505', bandera: '🇳🇮' },
      { prefijo: '506', bandera: '🇨🇷' }, { prefijo: '507', bandera: '🇵🇦' },
      { prefijo: '591', bandera: '🇧🇴' }, { prefijo: '593', bandera: '🇪🇨' },
      { prefijo: '595', bandera: '🇵🇾' }, { prefijo: '598', bandera: '🇺🇾' },
      { prefijo: '58',  bandera: '🇻🇪' }, { prefijo: '52',  bandera: '🇲🇽' },
      { prefijo: '54',  bandera: '🇦🇷' }, { prefijo: '57',  bandera: '🇨🇴' },
      { prefijo: '51',  bandera: '🇵🇪' }, { prefijo: '56',  bandera: '🇨🇱' },
      { prefijo: '55',  bandera: '🇧🇷' }, { prefijo: '34',  bandera: '🇪🇸' },
      { prefijo: '44',  bandera: '🇬🇧' }, { prefijo: '33',  bandera: '🇫🇷' },
      { prefijo: '49',  bandera: '🇩🇪' }, { prefijo: '39',  bandera: '🇮🇹' },
      { prefijo: '81',  bandera: '🇯🇵' }, { prefijo: '82',  bandera: '🇰🇷' },
      { prefijo: '86',  bandera: '🇨🇳' }, { prefijo: '91',  bandera: '🇮🇳' },
      { prefijo: '61',  bandera: '🇦🇺' }, { prefijo: '64',  bandera: '🇳🇿' },
      { prefijo: '1',   bandera: '🇺🇸' }, { prefijo: '7',   bandera: '🇷🇺' }
    ];

    const getCountryFlag = (mem) => {
      const rawJid = mem.jid || mem.id || '';
      const phoneNumber = rawJid.split('@')[0];
      const match = countryFlags.find(c => phoneNumber.startsWith(c.prefijo));
      return match ? match.bandera : '🚩';
    };

    let messageText = `╔═❖ *${groupName}* ❖═╗\n\n👥 Integrantes: ${participants.length}\n📝 Mensaje: ${customMessage}\n\n`;

    if (/2$/i.test(command)) {
      // Estilo con bandera al inicio de cada mención
      for (const mem of participants) {
        const realJid = mem.jid || mem.id || '';
        const displayNumber = realJid.split('@')[0];
        const flag = getCountryFlag(mem);
        messageText += `${flag} @${displayNumber}\n`;
      }
    } else {
      // Estilo fijo 🌷🐼
      for (const mem of participants) {
        const realJid = mem.jid || mem.id || '';
        const displayNumber = realJid.split('@')[0];
        messageText += `🌷🐼 @${displayNumber}\n`;
      }
    }

    messageText += `\n╚══════════════════╝`;

    await conn.sendMessage(m.chat, {
      text: messageText,
      mentions: participants.map(a => a.jid || a.id)
    }, { quoted: m });

  } catch (error) {
    console.error("[ERROR TAGALL]:", error);
    conn.reply(m.chat, `❌ Ocurrió un error al ejecutar el comando.`, m);
  }
};

handler.help = ['todos','todos2'];
handler.tags = ['group'];
handler.command = /^(tagall|t|todos|tagall2|t2|todos2)$/i;
handler.admin = true;
handler.group = true;

export default handler;