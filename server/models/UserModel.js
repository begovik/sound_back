import {Model, DataTypes, literal} from 'sequelize'
import sequelize from "../config/sequelizedb.js"

class UserModel extends Model {}

UserModel.init({
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    is_activated: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    activation_link: {
        type: DataTypes.STRING,
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'users', // We need to choose the model name
    underscored: true, // If true, sequelize created fields without uppercase letters
    freezeTableName: true // Sequelize refers to the name specified in the "modelName" option
    // timestamps: false
})

export default sequelize.models.users