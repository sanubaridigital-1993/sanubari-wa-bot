const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const pino = require("pino")

async function startWhatsApp(){

const { state, saveCreds } = await useMultiFileAuthState("./session")

const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: pino({ level: "silent" }),
auth: state,
browser: ["Ubuntu","Chrome","20.0"]
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", async ({ connection }) => {

if(connection === "open"){
console.log("WHATSAPP CONNECTED")
}

if(connection === "close"){
console.log("WHATSAPP DISCONNECTED")
}

})

/* request pairing setelah socket siap */

setTimeout(async ()=>{

if(!sock.authState.creds.registered){

try{

const phoneNumber = "628XXXXXXXXXX" // ganti nomor anda

const code = await sock.requestPairingCode(phoneNumber)

console.log("")
console.log("PAIRING CODE ANDA:")
console.log(code)
console.log("")

}catch(err){

console.log("PAIRING ERROR:",err.message)

}

}

},5000)

return sock
}

module.exports = startWhatsApp
