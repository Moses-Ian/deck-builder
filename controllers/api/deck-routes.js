const router = require('express').Router();
const { Deck } = require('../../models');
const { withAuth } = require('../../utils/auth');

// GET /api/decks
router.get('/', (req, res) => {
  Deck.findAll()
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
		}
    // include: [
			// {
				// model: User,
				// attributes: []
			// },
		// ]
	})
		.then(dbDeckData => {
			if (!dbDeckData) {
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

// POST /api/decks
router.post('/', (req, res) => {
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

module.exports = router;