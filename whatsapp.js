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

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {

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
