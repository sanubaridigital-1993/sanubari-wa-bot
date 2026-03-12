const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const pino = require("pino")

async function startWhatsApp(){

const { state, saveCreds } = await useMultiFileAuthState("./session")

const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: pino({ level: "silent" }),
auth: state,
browser: ["SanubariBot","Chrome","1.0"]
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", ({ connection }) => {

if(connection === "open"){
console.log("WHATSAPP CONNECTED")
}

})

/* ===== LOGIN DENGAN NOMOR ===== */

if(!sock.authState.creds.registered){

const phoneNumber = "628xxxxxxxxxx" // ganti dengan nomor WA Anda

const code = await sock.requestPairingCode(phoneNumber)

console.log("PAIRING CODE ANDA:")
console.log(code)

}

return sock
}

module.exports = startWhatsApp
