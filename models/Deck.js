const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Deck extends Model {
	static addCard(body, models) {
		return models.Deck_Components.create({
			multiverseId: body.multiverseId,
			deck_id: body.deck_id
		});
	}
	
	static async removeCard(body, models) {
		//this version deletes all copies from the deck
		// return models.Deck_Components.destroy({
			// where: {
				// multiverseId: body.multiverseId,
				// deck_id: body.deck_id
			// }
		// });
		
		//this version deletes one copy from the deck
		const cardToRemove = await models.Deck_Components.findOne({
			where: {
				multiverseId: body.multiverseId,
				deck_id: body.deck_id
			}
		});
		return cardToRemove.destroy();
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
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'deck'
		}
)


module.exports = Deck;