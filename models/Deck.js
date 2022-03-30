const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Deck extends Model { }

Deck.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
				name: {
						type: DataTypes.STRING,
						allowNull: false
				},
				user_id: {
						type: DataTypes.INTEGER,
						references: {
							model: 'user',
							key: 'id'
						}
				}
    },
		{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'deck'
		}
)


module.exports = Deck;