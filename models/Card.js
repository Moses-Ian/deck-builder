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
        multiverseId: {
            type: DataTypes.INTEGER,
            allowNull: false
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