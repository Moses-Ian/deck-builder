const { Deck } = require('../../models');

const deckdata = [
	{
		name: "this deck",
		user_id: 1
	}, {
		name: "someOther Deck",
		user_id: 2
	}, {
		name: "Ragnarock",
		user_id: 3
	}, {
		name: "RatDeck",
		user_id: 4
	}, {
		name: "EleDont",
		user_id: 5
	}, {
		name: "JustDont",
		user_id: 3
	}, {
		name: "plzIgnore",
		user_id: 3
	}
		// name: ,
		// user_id: 
	// }, {
];

const seedDecks = () => Deck.bulkCreate(deckdata);

module.exports = seedDecks;
