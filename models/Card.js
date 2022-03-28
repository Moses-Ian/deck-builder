const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Card extends Model { }

Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cardType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        power: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        toughness: {
            type: DataTypes.INTEGER,
            allownull: false

        }

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'card'  
    }
)


module.exports = Card;