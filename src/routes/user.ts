import { Router, type Request, type Response, NextFunction } from 'express'
import { USER_PATH } from '../utils/constants'
import User from '../database/tables/User'
import { generateResponse } from '../utils/helpers'
import { omit } from 'lodash'
import passport from 'passport'

const handleHealthCheck = async (_: Request, res: Response) => {
    res.send('User api is healthy')
}

const handleAuthCheck = async (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        generateResponse(res, {
            message: 'Авторизован',
            response: req.user,
        })
    } else {
        generateResponse(res, {
            status: 500,
            message: 'Не авторизован',
        })
    }
}

const handleSignUp = async (req: Request, res: Response) => {
    try {
        const { password, login, name } = req.body

        const [user, isCreated] = await User.findOrCreate({
            where: { login },
            defaults: { password, login, name, money: 100 },
            attributes: { exclude: ['password'] },
        })

        if (isCreated) {
            generateResponse(res, {
                message: 'Пользователь успешно зарегистрирован',
                response: omit(user.dataValues, 'password'),
            })
        } else {
            generateResponse(res, {
                message: 'Пользователь с таким логином уже зарегистрирован',
                response: omit(user.dataValues, 'password'),
            })
        }
    } catch (err: any) {
        generateResponse(res, {
            status: 500,
            message: err.message,
        })
    }
}

const handleSignIn = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        passport.authenticate('local', (err: any, user: any) => {
            req.login(user, (err) => {
                if (err) {
                    generateResponse(res, {
                        status: 500,
                        message: 'Неверный логин или пароль',
                    })

                    return
                }

                generateResponse(res, {
                    message: 'Успешный вход',
                    response: omit(user.dataValues, 'password'),
                })

                return
            })
        })(req, res, next)
    } catch (err: any) {
        generateResponse(res, {
            status: 500,
            message: err.message,
        })
    }
}

const handleSignOut = (req: Request, res: Response, next: NextFunction) => {
    try {
        req.session.destroy(() => {
            generateResponse(res, {
                message: 'Успешный выход',
            })
        })
    } catch (err: any) {
        generateResponse(res, {
            status: 500,
            message: err.message,
        })
    }
}

export const userApi = Router()
    .get(`${USER_PATH}/checkAuth`, handleAuthCheck)
    .get(`${USER_PATH}/health`, handleHealthCheck)
    .post(`${USER_PATH}/signup`, handleSignUp)
    .post(`${USER_PATH}/signin`, handleSignIn)
    .get(`${USER_PATH}/signout`, handleSignOut)
