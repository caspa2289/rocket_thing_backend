import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createClientAndConnect, synchronizeDB } from './src/database/specs'

dotenv.config()

async function startServer() {
    const app = express()
    const clientPort = Number(process.env.CLIENT_PORT) || 3000
    const serverPort = Number(process.env.SERVER_PORT) || 6969

    const corsOptions = {
        credentials: true,
        origin: [
            `http://127.0.0.1:${clientPort}`,
            `http://localhost:${clientPort}`,
        ],
    }

    app.use(cors(corsOptions))
    app.use(bodyParser.json())

    const sequelize = createClientAndConnect()

    synchronizeDB(sequelize)

    app.get('/', (_, res) => {
        res.send('Hello World!')
    })

    app.listen(serverPort, () => {
        console.log(`Example app listening on port ${serverPort}`)
    })
}

startServer()
