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
			console.log(dbDeckData);
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
		Deck.findOne({
			where: {
				id: req.params.id
			}
		}),
		mtg.card.where({
			page: 1,
			// pageSize: 20
			pageSize: 5	//limit this because my internet sucks while i'm testing
		})
	])
    .then(([dbDeckData, cards]) => res.render('build', {
			username: req.session.username,
			deck: dbDeckData.get({ plain: true }),
			cards,
			loggedIn: req.session.loggedIn
		}))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
	
	
	
});

module.exports = router;