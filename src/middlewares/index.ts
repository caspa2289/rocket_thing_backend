import { Express } from 'express'
import { setupSessionMiddleware } from './session'
import { setupPassportMiddleWare } from './passport'
import cors from 'cors'
import bodyParser from 'body-parser'
import { setupSequelizeMiddleware, synchronizeDB } from './sequelize'
import { Server } from 'https'

export const setupMiddlewares = (
    env: Record<string, any>,
    app: Express,
    server: Server
) => {
    const clientPort = Number(env.CLIENT_PORT) || 3000

    const corsOptions = {
        credentials: true,
        origin: [
            `http://127.0.0.1:${clientPort}`,
            `http://localhost:${clientPort}`,
            'http://localhost:63342',
            'https://caspa2289.github.io',
        ],
    }

    setupSessionMiddleware(env, app, server)
    setupPassportMiddleWare(app)

    app.use(cors(corsOptions))
    app.use(bodyParser.json())

    const sequelize = setupSequelizeMiddleware()
    synchronizeDB(sequelize)
}
