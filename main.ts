import express from 'express'
import dotenv from 'dotenv'
import { userApi } from './src/routes/user'
import { setupMiddlewares } from './src/middlewares'
import { notificationApi } from './src/routes/notification'

dotenv.config()

async function startServer() {
    const app = express()

    const serverPort = Number(process.env.SERVER_PORT) || 6969

    setupMiddlewares(process.env, app)

    app.use('/', userApi)
    app.use('/', notificationApi)

    app.get('/', (_, res) => {
        res.send('It`s alive!')
    })

    app.listen(serverPort, () => {
        console.log(`\x1b[32mSERVER LISTENING ON PORT ${serverPort}`)
    })
}

startServer()
