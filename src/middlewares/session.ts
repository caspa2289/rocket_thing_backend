import pg from 'pg'
import { Express } from 'express'
import pgSimple from 'connect-pg-simple'
import expressSession from 'express-session'
import { v4 as uuid } from 'uuid'

export const setupSessionMiddleware = (
    env: Record<string, any>,
    app: Express
) => {
    const PGSession = pgSimple(expressSession)
    const sessionPool = new pg.Pool({
        host: env.POSTGRES_HOST,
        port: Number(env.POSTGRES_PORT),
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        database: env.POSTGRES_DB,
        max: 1000,
    })

    app.use(
        expressSession({
            genid: () => uuid(),
            store: new PGSession({
                pool: sessionPool,
                createTableIfMissing: true,
            }),
            saveUninitialized: true,
            secret: env.COOKIE_SECRET,
            resave: false,
            cookie: { maxAge: 10 * 24 * 60 * 60 * 1000 },
        })
    )
}
