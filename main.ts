import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import { createClientAndConnect, synchronizeDB } from './src/database/specs'
import { BASE_PATH } from './src/utils/constants'
import { userApi } from './src/api/user'

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
    app.use(`${BASE_PATH}/`, userApi)

    const sequelize = createClientAndConnect()

    synchronizeDB(sequelize)

    app.get('/', (_, res) => {
        res.send('It`s alive!')
    })

    app.listen(serverPort, () => {
        console.log(`App is listening on port ${serverPort}`)
    })
}

startServer()
