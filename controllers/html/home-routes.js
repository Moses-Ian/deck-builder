const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Deck, Deck_Components } = require('../../models');
const mtg = require('mtgsdk');

router.get('/', (req, res) => {
	// console.log(req.session);
  Deck.findAll({
		include: [
			{
				model: User,
				attributes: ['id', 'username']
			}
		],
		order: [
			['created_at', 'DESC']
		],
		limit: 8
	})
		.then(dbDeckData => {
			const decks = dbDeckData.map(deck => deck.get({ plain: true }));
			const username = req.session.username || null;
			console.log(decks);
			res.render('homepage', {
				decks,
				loggedIn: req.session.loggedIn,
				username
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/decks', (req,res) => {
	res.render('decks')
})

router.get('/deck/:id', (req, res) => {
	Deck.findOne({
		where: {
			id: req.params.id
		},
		attributes: [
			'id',
			'name'
		],
    include: [
			{
				model: User,
				attributes: ['id', 'username']
			},
			{
				model: Deck_Components,
				attributes: ['id', 'multiverseId']
			}
		]
	})
		.then(dbDeckData => {
			if (!dbDeckData) {
				res.status(404).json({ message: 'No deck found with this id' });
				return;
			}
			// console.log(dbDeckData);
			if (dbDeckData.deck_components.length == 0) {
				res.json(dbDeckData);
				return;
			}
			// res.json(dbDeckData);
			//get the cards from mtg based on the multiverse ids
			let deck = dbDeckData.get({ plain: true });
			const id_arr = dbDeckData.deck_components.map(card => card.multiverseId).join(',');
			console.log(id_arr);
			const username = req.session.username || null;
			mtg.card.where({multiverseid: id_arr})
				.then(cards => {
					deck.cards = cards;
					// res.json(deck);
					res.render('single-deck', {
						deck,
						loggedIn: req.session.loggedIn,
						username
					});
				});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/login', (req, res) => {
	console.log('login route');
  // res.render('login');
});

router.get('/register', (req, res) => {
	const username = req.session.username || null;
	res.render('register', {
		username,
		loggedIn: req.session.loggedIn,
	});
});

module.exports = router;