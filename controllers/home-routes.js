const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Deck } = require('../models');

router.get('/', (req, res) => {
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


	
	
	
	
	// console.log(req.session);
	
  // Post.findAll({
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
			// const posts = dbPostData.map(post => post.get({ plain: true }));
      // res.render('homepage', { 
				// posts,
				// loggedIn: req.session.loggedIn
			// });
    // })
    // .catch(err => {
      // console.log(err);
      // res.status(500).json(err);
    // });
});

router.get('/login', (req, res) => {
  // res.render('login');
});

router.get('/post/:id', (req, res) => {
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