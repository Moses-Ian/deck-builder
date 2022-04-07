const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Deck, Deck_Components } = require('../../models');
const mtg = require('mtgsdk');


router.get('/:id', (req, res) => {
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
			let deck = dbDeckData.get({ plain: true });
			const username = req.session.username || null;
			if (dbDeckData.deck_components.length == 0) {
				// res.json(dbDeckData);
				deck.cards = [];
				res.render('single-deck', {
					deck,
					loggedIn: req.session.loggedIn,
					username
				});
				return;
			}
			// res.json(dbDeckData);
			//get the cards from mtg based on the multiverse ids
			const id_arr = dbDeckData.deck_components.map(card => card.multiverseId);
			const id_str = id_arr.join(',');
			// console.log(id_arr);
			mtg.card.where({ multiverseid: id_str })
				.then(cards => {
					deck.cards = cards.map(card => {
				card.count = id_arr.filter(id => card.multiverseid == id ).length;
				return card;
			});
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


router.get('/', (req, res) => {
	Deck.findAll({
		include: [
			{
				model: User,
				attributes: ['id', 'username']
			},
            {
				model: Deck_Components,
				attributes: ['imageUrl']
			}
		],
		order: [
			['created_at', 'DESC']
		],
		limit: 16
	})
		.then(dbDeckData => {
			const decks = dbDeckData.map(deck => {
				const deckData = deck.get({ plain: true })
				if( !deckData.deck_components[0] )
					deckData.imageUrl = "/images/card-back.jpg";
				else
					deckData.imageUrl = deckData.deck_components[0].imageUrl;
				return deckData;
			});
			const username = req.session.username || null;
			res.render('decks', {
				decks,
				loggedIn: req.session.loggedIn,
				username
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
})

module.exports = router;