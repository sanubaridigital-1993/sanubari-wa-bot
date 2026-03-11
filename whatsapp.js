const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const pino = require("pino")
const qrcode = require("qrcode-terminal")

async function startWhatsApp(){

    const { state, saveCreds } = await useMultiFileAuthState("./session")

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", ({ connection, qr }) => {

        if(qr){
            console.log("SCAN QR WHATSAPP DI BAWAH:")
            qrcode.generate(qr, { small: true })
        }

        if(connection === "open"){
            console.log("WHATSAPP BERHASIL TERHUBUNG")
        }

        if(connection === "close"){
            console.log("WHATSAPP DISCONNECTED")
        }

    })

    return sock
}

module.exports = startWhatsApp
