const { DataTypes } = require("sequelize");
const orm = require("./index");

const UserModel = orm.define('user', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM("customer", "administrator"),
        allowNull: false,
        defaultValue: "customer"
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwd: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value){
            this.setDataValue("passwd", value)
        }
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = UserModel;