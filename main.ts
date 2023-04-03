import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.DEV_PORT ?? 6969

app.get('/', (_, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
