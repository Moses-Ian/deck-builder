const router = require('express').Router();
const { User, Deck, Deck_Components } = require('../../models');
const mtg = require('mtgsdk');
const { withAuth } = require('../../utils/auth');

// GET /api/decks
router.get('/', (req, res) => {
  Deck.findAll({
		include: [
			{
				model: User,
				attributes: ['id', 'username']
			}
		]
	})
		.then(dbDeckData => res.json(dbDeckData))
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// GET /api/decks/1
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
			if (dbDeckData.deck_components.length == 0) {
				res.json(dbDeckData);
				return;
			}
			// res.json(dbDeckData);
			//get the cards from mtg based on the multiverse ids
			let resObj = {
				id:   dbDeckData.id,
				name: dbDeckData.name,
				user: dbDeckData.user
			};
			const id_arr = dbDeckData.deck_components.map(card => card.multiverseId).join(',');
			console.log(id_arr);
			mtg.card.where({multiverseid: id_arr})
				.then(cards => {
					resObj.cards = cards;
					res.json(resObj);
				});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json(err);
		});
});

// POST /api/decks
router.post('/', withAuth, (req, res) => {
  Deck.create(req.body)
    .then(dbDeckData => res.json(dbDeckData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/decks/1
router.put('/:id', withAuth, (req, res) => {
	//need to ensure the user owns this deck
  Deck.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(dbDeckData => {
      if (!dbDeckData[0]) {
        res.status(404).json({ message: 'No deck found with this id' });
        return;
      }
      res.json(dbDeckData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/decks/1
router.delete('/:id', withAuth, (req, res) => {
	//need to ensure the user owns this deck
  Deck.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No deck found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/add-card', withAuth, (req, res) => {
	Deck.addCard(req.body, {Deck_Components})
		.then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/remove-card', withAuth, (req, res) => {
	Deck.removeCard(req.body, {Deck_Components})
		.then(result => res.json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



























module.exports = router;