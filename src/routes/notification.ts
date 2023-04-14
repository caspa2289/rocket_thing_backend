import { Router, type Request, type Response } from 'express'
import webPush from 'web-push'
import { NOTIFICATION_PATH } from '../utils/constants'
import { generateResponse } from '../utils/helpers'

interface ISubscription {
    endpoint: string
    key: string
    authSecret: string
}

let subscriptions: ISubscription[] = []

const { publicKey, privateKey } = webPush.generateVAPIDKeys()
webPush.setVapidDetails('mailto:blank', publicKey, privateKey)

setInterval(() => {
    subscriptions.forEach(({ endpoint, key, authSecret }) => {
        webPush
            .sendNotification(
                {
                    endpoint,
                    keys: {
                        p256dh: key,
                        auth: authSecret,
                    },
                },
                JSON.stringify({
                    title: 'Уведомление от сервера',
                    body: `Случайное число: ${Math.random()}`,
                })
            )
            .catch((err) => {
                console.error(err)
                removeSubscription(endpoint)
            })
    })
}, 5000)

const removeSubscription = (endpoint: string) => {
    subscriptions = subscriptions.filter(
        (subscription) => subscription.endpoint === endpoint
    )
}

const handlePublicKey = async (req: Request, res: Response) => {
    generateResponse(res, {
        message: 'Публичный ключ получен',
        response: { publicKey },
    })
}

const handleRegister = async (req: Request, res: Response) => {
    const { endpoint, key, authSecret }: ISubscription = req.body

    if (
        !subscriptions.find(
            (subscription) => subscription.endpoint === endpoint
        )
    ) {
        subscriptions.push({ endpoint, key, authSecret })
    }

    generateResponse(res, {
        message: 'Успешно зарегистрирован',
    })
}

const handleUnregister = async (req: Request, res: Response) => {
    const { endpoint }: ISubscription = req.body
    removeSubscription(endpoint)

    generateResponse(res, {
        message: 'Успешно отписан',
    })
}

export const notificationApi = Router()
    .get(`${NOTIFICATION_PATH}/publicKey`, handlePublicKey)
    .post(`${NOTIFICATION_PATH}/register`, handleRegister)
    .post(`${NOTIFICATION_PATH}/unregister`, handleUnregister)
