const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")
const pino = require("pino")

async function startWhatsApp(){

const { state, saveCreds } = await useMultiFileAuthState("./session")

const sock = makeWASocket({
logger: pino({ level: "silent" }),
auth: state
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", ({ connection, qr }) => {

if(qr){
qrcode.generate(qr, { small: true })
}

if(connection === "open"){
console.log("WHATSAPP CONNECTED")
}

})

return sock

}

module.exports = startWhatsApp
