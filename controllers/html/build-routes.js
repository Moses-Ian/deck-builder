const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Deck, Deck_Components } = require('../../models');
const mtg = require('mtgsdk');

router.get('/', (req, res) => {
	
});

module.exports = router;