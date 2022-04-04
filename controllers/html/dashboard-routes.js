const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Deck, Deck_Components } = require('../../models');
const {withAuth} = require('../../utils/auth');

router.use(withAuth);

router.get('/', (req, res) => {
	console.log(req.session);
	User.findOne({
		where: {
			id: req.session.user_id
		},
		include: [
			{
				model: Deck,
				include: [	//this is silly as shit, but it's the best way to get the data I need
					{
						model: User,
						attributes: ['username']
					}
				]
			}
		]
	})
		.then(dbUserData => {
			// console.log(dbUserData);
			const data = dbUserData.get({ plain: true });
			console.log(data);
			res.render('dashboard', {
				data,
				loggedIn: req.session.loggedIn
			});
		})
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/edit/:id', withAuth, (req, res) => {
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
			// }, {
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
			// const post = dbPostData.get({ plain: true });

			// res.render('edit-post', {
				// post,
				// loggedIn: true
			// });
    // })
    // .catch(err => {
      // console.log(err);
      // res.status(500).json(err);
    // });
// });

module.exports = router;