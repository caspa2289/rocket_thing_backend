import { Express } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../database/tables/User'

export const setupPassportMiddleWare = (app: Express) => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'login' },
            async (login, password, done) => {
                try {
                    const user = await User.findOne({ where: { login } })

                    if (!user || user.password !== password) {
                        return done(null, false)
                    }

                    return done(null, user)
                } catch (err) {
                    console.error(err)
                }
            }
        )
    )

    passport.serializeUser((user: any, done) => {
        done(null, user.dataValues.id as number)
    })

    passport.deserializeUser(async (id: number, done) => {
        try {
            const user = await User.findByPk(id)
            done(null, user)
        } catch (err) {
            done(err)
        }
    })

    app.use(passport.initialize())
    app.use(passport.session())
}
