const { Deck_Components } = require('../../models');

const deck_componentdata = [
	{
		multiverseId: 1,
		deck_id: 1
	}, {
		multiverseId: 2,
		deck_id: 1
	}, {
		multiverseId: 3,
		deck_id: 1
	}, {
		multiverseId: 4,
		deck_id: 1
	}, {
		multiverseId: 5,
		deck_id: 1
	}
		// multiverseId: ,
		// deck_id: 1
	// }, {
];

const seedDeck_Components = () => Deck_Components.bulkCreate(deck_componentdata);

module.exports = seedDeck_Components;
