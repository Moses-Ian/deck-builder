//can't be tested until card model is done
const router = require('express').Router();
const { Card } = require('../../models');

// GET /api/cards
router.get('/', (req, res) => {
	Card.findAll({
		attributes: [
			'id',
			'name'
		]
	})
		.then(dbCardData => res.json(dbCardData))
		.catch(err => {
			console.error(err);
			res.status(500).json(err);
		});
});

// GET /api/cards/1
router.get('/:id', (req, res) => {
	Card.findOne({
		where: {
			id: req.params.id
		},
		attributes: [
			'id',
			'name'
		]
	})
		.then(dbCardData => {
			if (!dbCardData) {
        res.status(404).json({ message: 'No card found with this id' });
        return;
			}
			res.json(dbCardData)
		})
		.catch(err => {
			console.error(err);
			res.status(500).json(err);
		});
});

// POST /api/cards
// router.post('/', (req, res) => {});

// PUT /api/cards/1
// router.put('/:id', (req, res) => {});

// DELETE /api/cards/1
// router.delete('/:id', (req, res) => {});

module.exports = router;