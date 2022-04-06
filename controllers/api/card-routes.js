//these routes represent fetching the ACTUAL card data
const router = require('express').Router();
const mtg = require('mtgsdk');

// GET /api/cards
// GET /api/cards?name=Squee
router.get('/', (req, res) => {
	let {page, pageSize, ...query} = req.query;
	page = page || 1;
	pageSize = pageSize || 20;
	mtg.card.where({ page, pageSize, ...query })
		.then(cards => {
			cards.forEach(card => console.log(card.name));
			res.json(cards);
		});
});

// GET /api/cards/3
router.get('/:multiverseid', (req, res) => {
	mtg.card.find(req.params.multiverseid)
		.then(cardData => {
			if (!cardData) {
				res.status(404).json({ message: 'No card found with this multiverseid' });
        return;
			}
			res.json(cardData.card);
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