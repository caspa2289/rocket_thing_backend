import { Router, type Request, type Response } from 'express'
import { USER_PATH } from '../utils/constants'
import User from '../database/tables/User'
import { generateResponse } from '../utils/helpers'

const handleHealthCheck = async (_: Request, res: Response) => {
    res.send('User api is healthy')
}

const handleSignUp = async (req: Request, res: Response) => {
    const { password, login, name } = req.body

    try {
        const [user, isCreated] = await User.findOrCreate({
            where: { login },
            defaults: { password, login, name, money: 100 },
        })

        if (isCreated) {
            generateResponse(res, {
                message: 'Пользователь успешно зарегистрирован',
                response: user,
            })
        } else {
            generateResponse(res, {
                message: 'Пользователь с таким логином уже зарегистрирован',
                response: user,
            })
        }
    } catch (err: any) {
        generateResponse(res, {
            status: 500,
            message: err.message,
        })
    }
}

export const userApi = Router()
    .get(`${USER_PATH}/health`, handleHealthCheck)
    .post(`${USER_PATH}/signup`, handleSignUp)
