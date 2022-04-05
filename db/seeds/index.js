const sequelize = require('../../config/connection');
const seedUser = require('./userData');
const seedDecks = require('./deckData');
const seedDeck_Components = require('./deck_componentData');

const seedAll = async () => {
		await sequelize.sync({ force: true });		

	try {
		await seedUser();
	} catch (err) {
		console.error('error when seeding users');
		console.log(err);
	}

	try {
		await seedDecks();
	} catch (err) {
		console.error('error when seeding decks');
		console.log(err);
	}

	try {
		await seedDeck_Components();
	} catch (err) {
		console.error('error when seeding deck_components');
		console.log(err);
	}
		process.exit(0);
};

seedAll();
