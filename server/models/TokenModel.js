import {Model, DataTypes } from 'sequelize'
import sequelize from "../config/sequelizedb.js"

class TokenModel extends Model {}

TokenModel.init({
    // Model attributes are defined here
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        required: true
    },
    user_ip: {
        type: DataTypes.STRING,
        required: true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'user_tokens', // We need to choose the model name
    underscored: true, // If true, sequelize created fields without uppercase letters
    freezeTableName: true // Sequelize refers to the name specified in the "modelName" option
    // timestamps: false
})

export default sequelize.models.user_tokens