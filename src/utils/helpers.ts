import { Response } from 'express'

export interface IResponseBody {
    status?: number
    message: string
    response?: Record<string, any>
}

export const generateResponse = (res: Response, body: IResponseBody) => {
    const { status = 200, message, response = {} } = body

    res.status(status)
    res.send({
        status,
        message,
        response,
    })
}
