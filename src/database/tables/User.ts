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
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: false,
    tableName: 'users',
})
class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    override id: number

    @AllowNull(false)
    @Length({ max: 20, min: 3 })
    @Column(DataType.STRING)
        name: string

    @Unique
    @AllowNull(false)
    @Length({ max: 20, min: 3 })
    @Column(DataType.STRING)
        login: string

    @AllowNull(false)
    @Length({ max: 20, min: 3 })
    @Column(DataType.STRING)
        password: string

    @AllowNull(false)
    @Column(DataType.INTEGER)
        money: number
}

export default User
