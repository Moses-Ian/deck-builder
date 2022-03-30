const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Deck_Components extends Model { }

Deck_Components.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        multiverseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        deck_id: {
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

module.exports = Deck_Components;