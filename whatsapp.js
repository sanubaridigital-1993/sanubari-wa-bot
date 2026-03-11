const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require("pino")

async function startWhatsApp(){

const { state, saveCreds } = await useMultiFileAuthState("./session")

const sock = makeWASocket({
logger: pino({ level: "silent" }),
auth: state,
browser: ["SanubariBot","Chrome","1.0"]
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", async ({ connection }) => {

if(connection === "open"){
console.log("WHATSAPP CONNECTED")
}

})

/* ===== PAIRING CODE ===== */

if(!sock.authState.creds.registered){

const phoneNumber = "628xxxxxxxxxx" // ganti nomor WA anda

const code = await sock.requestPairingCode(phoneNumber)

console.log("PAIRING CODE ANDA:")
console.log(code)

}

return sock
}

module.exports = startWhatsApp
