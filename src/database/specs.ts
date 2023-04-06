const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_HOST,
} = process.env

import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const testConnection = async (sequelize: Sequelize) => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export const createClientAndConnect = (): Sequelize | null => {
    try {
        const sequelizeOptions: SequelizeOptions = {
            username: POSTGRES_USER,
            host: POSTGRES_HOST,
            database: POSTGRES_DB,
            password: POSTGRES_PASSWORD,
            port: Number(POSTGRES_PORT),
            dialect: 'postgres',
        }

        const sequelize = new Sequelize(sequelizeOptions)

        testConnection(sequelize)

        return sequelize
    } catch (e) {
        console.error(e)
    }

    return null
}
