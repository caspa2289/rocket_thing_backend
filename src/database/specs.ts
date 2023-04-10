import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

import User from './tables/User'

export const createClientAndConnect = (): Sequelize | null => {
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

    sequelize.sync({ force: false }).then((res) => {
        console.log('Connected to the database with options:', res.options)
    })
}
