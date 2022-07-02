import {Model, DataTypes } from 'sequelize'
import sequelize from "../config/sequelizedb.js"

class PostModel extends Model {}

PostModel.init({
    // Model attributes are defined here
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    picture: {
        type: DataTypes.STRING
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'posts', // We need to choose the model name
    underscored: true, // If true, sequelize created fields without uppercase letters
    freezeTableName: true, // Sequelize refers to the name specified in the "modelName" option
    // timestamps: false
});

export default sequelize.models.posts