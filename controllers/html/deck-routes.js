const router = require('express').Router();

router.get('/', (req,res) => {
	res.render('decks')
})

module.exports = router;