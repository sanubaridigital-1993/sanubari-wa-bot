const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require("pino")
const qrcode = require("qrcode-terminal")

async function startWhatsApp(){

    const { state, saveCreds } = await useMultiFileAuthState("./session")

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ["Sanubari Bot","Chrome","1.0"]
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", ({ connection, qr, lastDisconnect }) => {

        if(qr){
            console.log("SCAN QR DI BAWAH INI")
            qrcode.generate(qr, { small: true })
        }

        if(connection === "open"){
            console.log("WHATSAPP CONNECTED")
        }

        if(connection === "close"){
            console.log("WHATSAPP DISCONNECTED")

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut

            if(shouldReconnect){
                console.log("RECONNECTING...")
                startWhatsApp()
            }
        }

    })

    return sock
}

module.exports = startWhatsApp
