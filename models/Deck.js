const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Deck extends Model {
	static addCard(body, models) {
		return models.Deck_Components.create({
			multiverseId: body.multiverseId,
			deck_id: body.deck_id
		});
	}
	
	static removeCard(body, models) {
		//todo
	}
}

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