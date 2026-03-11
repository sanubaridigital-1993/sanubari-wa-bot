const express = require("express")
const startWhatsApp = require("./whatsapp")

const app = express()
app.use(express.json())

let sock = null

startWhatsApp().then(s => {
    sock = s
})

app.get("/", (req,res)=>{
    res.send("SANUBARI WHATSAPP BOT ONLINE")
})

app.post("/send", async (req,res)=>{

    const { number, message } = req.body

    if(!sock){
        return res.send("Bot belum siap")
    }

    try{

        await sock.sendMessage(number+"@s.whatsapp.net",{
            text: message
        })

        res.send("Pesan terkirim")

    }catch(err){

        res.send("Error: "+err)

    }

})

app.listen(process.env.PORT || 3000)