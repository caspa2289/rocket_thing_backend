import { Pool } from 'pg'
import { Express } from 'express'
import pgSimple from 'connect-pg-simple'
import expressSession from 'express-session'
import { v4 as uuid } from 'uuid'
import { setupWebsocketMiddleware } from './websocket'
import { Server } from 'https'
import { Server as HTTPServer } from 'http'

export const setupSessionMiddleware = (
    env: Record<string, any>,
    app: Express,
    server: Server | HTTPServer
) => {
    const PGSession = pgSimple(expressSession)
    const sessionPool = new Pool({
        host: env.POSTGRES_HOST,
        port: Number(env.POSTGRES_PORT),
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        database: env.POSTGRES_DB,
        max: 1000,
    })

    app.set('trust proxy', 1)

    const session = expressSession({
        genid: () => uuid(),
        store: new PGSession({
            pool: sessionPool,
            createTableIfMissing: true,
        }),
        saveUninitialized: true,
        secret: env.COOKIE_SECRET,
        resave: true,
        cookie: {
            sameSite: 'none',
            secure: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
        },
    })

    app.use(session)

    setupWebsocketMiddleware(session, env, app, server)
}
