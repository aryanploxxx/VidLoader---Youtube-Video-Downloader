const express = require('express')
const ytdl = require('ytdl-core')

const app = express()
var cors = require("cors");
app.use(cors());
require("dotenv").config()

const PORT = process.env.PORT || 4000

app.get('/', (req, res) => {
    try {
        res.send("API Working successfully.")
    } catch(error) {
        return res.status(500).json({message: error})
    }
})


app.get('/download', async (req, res) => {
    try {
        const url = req.query.url
        const videoId = await ytdl.getURLVideoID(url)
        const metaInfo = await ytdl.getInfo(url)
        let data = {
            url: 'https://www.youtube.com/embed/'+videoId,
            info: metaInfo.formats
        }
        return res.send(data)
    } catch(error) {
        return res.status(500)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})