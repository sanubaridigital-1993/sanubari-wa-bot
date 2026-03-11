const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const pino = require("pino")
const qrcode = require("qrcode-terminal")

async function startWhatsApp(){

const { state, saveCreds } = await useMultiFileAuthState("./session")

const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: pino({ level: "silent" }),
auth: state,
browser: ["Ubuntu","Chrome","20.0.04"],
connectTimeoutMs: 60000,
keepAliveIntervalMs: 10000
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", ({ connection, qr }) => {

if(qr){
console.log("SCAN QR DI BAWAH")
qrcode.generate(qr,{small:true})
}

if(connection === "open"){
console.log("WHATSAPP CONNECTED")
}

if(connection === "close"){
console.log("CONNECTION CLOSED")
}

})

return sock
}

module.exports = startWhatsApp
