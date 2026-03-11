const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys")
const pino = require("pino")

async function startWhatsApp(){

    const { state, saveCreds } = await useMultiFileAuthState("./session")

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", (update)=>{

        const { connection, qr } = update

        if(qr){
            console.log("QR:", qr)
        }

        if(connection === "open"){
            console.log("WHATSAPP CONNECTED")
        }

    })

    return sock
}

module.exports = startWhatsApp