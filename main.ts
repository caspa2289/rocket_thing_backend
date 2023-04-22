import express from 'express'
import dotenv from 'dotenv'
import { userApi } from './src/routes/user'
import { setupMiddlewares } from './src/middlewares'
import { notificationApi } from './src/routes/notification'
import * as https from 'https'

dotenv.config()

async function startServer() {
    const app = express()

    const serverPort = Number(process.env.PORT) || 6969
    const server = https.createServer(app)

    setupMiddlewares(process.env, app, server)

    app.use('/', userApi)
    app.use('/', notificationApi)

    app.get('/', (_, res) => {
        res.send('It`s alive!')
    })

    server.listen(serverPort, () => {
        console.log(`\x1b[32mSERVER LISTENING ON PORT ${serverPort}`)
    })
}

startServer()
