const { User, Deck } = require('../models');

const withAuth = (req, res, next) => {
	if (!req.session.user_id) {
		res.redirect('/login');
		return;
	}
	next();
};

const writeAuth = (req, res, next) => {
	if (req.session.user_id != req.params.id) {
		res.status(401).json({ message: "not authorized" });
		return;
	}
	next();
}

const deckAuth = (req, res, next) => {
	return Deck.findOne({
		where: {
			id: req.body.deck_id
		},
		include: [
			{
				model: User,
				attributes: ['id']
			}
		]
	})
		.then(dbDeckData => {
			if (!dbDeckData)
				return;
			if (dbDeckData.user_id != req.session.user_id) 
				return;
			next();
		});
}

module.exports =
{
	withAuth,
	writeAuth,
	deckAuth
};