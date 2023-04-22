import { Express } from 'express'
import { setupSessionMiddleware } from './session'
import { setupPassportMiddleWare } from './passport'
import { setupSequelizeMiddleware, synchronizeDB } from './sequelize'
import { Server } from 'https'
import { Server as HTTPServer } from 'http'

export const setupMiddlewares = (
    env: Record<string, any>,
    app: Express,
    server: Server | HTTPServer
) => {
    setupSessionMiddleware(env, app, server)
    setupPassportMiddleWare(app)

    const sequelize = setupSequelizeMiddleware()
    synchronizeDB(sequelize)
}
