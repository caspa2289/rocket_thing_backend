import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import User from '../database/tables/User'

export const setupSequelizeMiddleware = (): Sequelize | null => {
    try {
        const sequelizeOptions: SequelizeOptions = {
            username: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: Number(process.env.POSTGRES_PORT),
            dialect: 'postgres',
            models: [User],
        }

        return new Sequelize(sequelizeOptions)
    } catch (e) {
        console.error(e)
    }

    return null
}

export const synchronizeDB = (sequelize: Sequelize | null) => {
    if (!sequelize) throw new Error('Sequelize instance not found')

    sequelize.sync({ force: false }).then(() => {
        console.log('\x1b[32mCONNECTED TO THE DATABASE')
    })
}
