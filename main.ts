import express from 'express'
import dotenv from 'dotenv'
import { userApi } from './src/routes/user'
import { setupMiddlewares } from './src/middlewares'
import { notificationApi } from './src/routes/notification'
import * as https from 'https'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

dotenv.config()

async function startServer() {
    const app = express()

    const clientPort = Number(process.env.CLIENT_PORT) || 3000

    const corsOptions = {
        credentials: true,
        origin: [
            `http://127.0.0.1:${clientPort}`,
            `http://localhost:${clientPort}`,
            'http://localhost:63342',
            'https://caspa2289.github.io',
        ],
    }

    app.use(cors(corsOptions))
    app.use(bodyParser.json())

    const serverPort = Number(process.env.PORT) || 6969

    app.use('/', userApi)
    app.use('/', notificationApi)

    app.get('/', (_, res) => {
        res.send('It`s alive!')
    })

    const server = https.createServer(app)

    setupMiddlewares(process.env, app, server)

    server.listen(serverPort, () => {
        console.log(`\x1b[32mSERVER LISTENING ON PORT ${serverPort}`)
    })
}

startServer()
