const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Deck, Deck_Components } = require('../../models');
const mtg = require('mtgsdk');
const withAuth = require('../../utils/auth');

router.get('/new', (req, res) => {
	console.log('got here');
	Deck.create({
		name: 'Deck Name',
		user_id: req.session.user_id
	})
		.then(dbDeckData => {
			// console.log(dbDeckData);
			res.redirect(`/build/${dbDeckData.id}`)
		})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
	// make the deck, then show a basic search result
	Promise.all([
		//chain 1
		Deck.findOne({
			where: {
				id: req.params.id
			},
			include: [
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
				let resObj = dbDeckData.get({ plain: true });
				if (resObj.deck_components.length == 0)
					return resObj;
				const id_arr = dbDeckData.deck_components.map(card => card.multiverseId).join(',');
				// console.log(id_arr);
				return mtg.card.where({multiverseid: id_arr})
					.then(cards => {
						resObj.cards = cards;
						return resObj;
					});
			}),
		
		
		
		//chain 2
		mtg.card.where({
			page: 1,
			// pageSize: 20
			pageSize: 5	//limit this because my internet sucks while i'm testing
		})
	])
    .then(([dbDeckData, cards]) => {
			// console.log(dbDeckData);
			// console.log(cards);
			res.render('build', {
				username: req.session.username,
				deck: dbDeckData,
				cards,
				loggedIn: req.session.loggedIn
			})
		})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
	
	
	
});

module.exports = router;