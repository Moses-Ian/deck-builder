const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Deck, Deck_Components } = require('../models');
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
		limit: 20
	})
		.then(dbDeckData => {
			const decks = dbDeckData.map(deck => deck.get({ plain: true }));
			res.render('homepage', {
				decks,
				loggedIn: req.session.loggedIn
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/login', (req, res) => {
  // res.render('login');
});

router.get('/register', (req, res) => {
	res.render('register');
});

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
			mtg.card.where({multiverseid: id_arr})
				.then(cards => {
					deck.cards = cards;
					// res.json(deck);
					res.render('single-deck', {
						deck,
						loggedIn: req.session.loggedIn
					});
				});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
  // Post.findOne({
    // where: {
      // id: req.params.id
    // },
    // attributes: [
      // 'id',
      // 'post_url',
      // 'title',
      // 'created_at',
      // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    // ],
    // include: [
      // {
        // model: Comment,
        // attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        // include: {
          // model: User,
          // attributes: ['username']
        // }
      // },
      // {
        // model: User,
        // attributes: ['username']
      // }
    // ]
  // })
    // .then(dbPostData => {
      // if (!dbPostData) {
        // res.status(404).json({ message: 'No post found with this id' });
        // return;
      // }

      // serialize the data
      // const post = dbPostData.get({ plain: true });

      // pass data to template
      // res.render('single-post', { 
				// post,
				// loggedIn:	req.session.loggedIn
			// });
    // })
    // .catch(err => {
      // console.log(err);
      // res.status(500).json(err);
    // });
});

module.exports = router;