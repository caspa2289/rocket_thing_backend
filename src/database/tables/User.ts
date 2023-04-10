import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    Length,
    Model,
    PrimaryKey,
    Table,
    Unique,
} from 'sequelize-typescript'

@Table({
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users',
})
class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    override id: number

    @AllowNull(false)
    @Length({
        max: 20,
        min: 3,
        msg: 'Длина имени должна быть от 3 до 20 символов',
    })
    @Column(DataType.STRING)
        name: string

    @Unique
    @AllowNull(false)
    @Length({
        max: 20,
        min: 3,
        msg: 'Длина логина должна быть от 3 до 20 символов',
    })
    @Column(DataType.STRING)
        login: string

    @AllowNull(false)
    //Это акчли не будет стрелять, т.к хэш всегда одной длины. Надо особое внимание уделить этому на фронте
    @Length({ min: 3, msg: 'Минимальная длина пароля - 3 символа' })
    @Column(DataType.STRING)
        password: string

    @AllowNull(false)
    @Column(DataType.INTEGER)
        money: number
}

export default User
