import { Express } from 'express'
import { setupSessionMiddleware } from './session'
import { setupPassportMiddleWare } from './passport'
import cors from 'cors'
import bodyParser from 'body-parser'
import { setupSequelizeMiddleware, synchronizeDB } from './sequelize'

export const setupMiddlewares = (env: Record<string, any>, app: Express) => {
    const clientPort = Number(env.CLIENT_PORT) || 3000

    const corsOptions = {
        credentials: true,
        origin: [
            `http://127.0.0.1:${clientPort}`,
            `http://localhost:${clientPort}`,
        ],
    }

    setupSessionMiddleware(env, app)
    setupPassportMiddleWare(app)

    app.use(cors(corsOptions))
    app.use(bodyParser.json())

    const sequelize = setupSequelizeMiddleware()
    synchronizeDB(sequelize)
}
