import { Server } from 'socket.io'
import { RequestHandler } from 'express'
const sharedsession = require('express-socket.io-session')

export const setupWebsocketMiddleware = (
    session: RequestHandler,
    env: Record<string, any>
) => {
    const io = new Server({
        cors: {
            origin: [
                'http://127.0.0.1:3000',
                'http://localhost:3000',
                'http://localhost:63342',
                'https://caspa2289.github.io',
            ],
        },
    })

    io.use(
        sharedsession(session, {
            autoSave: true,
        })
    )

    io.listen(env.PORT)

    io.on('connection', (socket: any) => {
        console.log(socket.handshake.session)
    })

    setInterval(() => {
        io.emit('test', {
            someProperty: 'some value',
            otherProperty: 'other value',
        })
    }, 10000)
}
