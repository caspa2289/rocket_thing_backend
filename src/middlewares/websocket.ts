import { Server } from 'socket.io'

export const setupWebsocketMiddleware = () => {
    const io = new Server({
        cors: {
            origin: 'http://localhost:3000',
        },
    })

    io.listen(6970)

    io.on('connection', () => {
        console.log('a user connected')
    })

    setInterval(() => {
        io.emit('test', {
            someProperty: 'some value',
            otherProperty: 'other value',
        })
    }, 10000)
}
