const sequelize = require('../../config/connection');
const seedUser = require('./userData');
const seedDecks = require('./deckData');
const seedDeck_Components = require('./deck_componentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedDecks();
	
  await seedDeck_Components();

  process.exit(0);
};

seedAll();
