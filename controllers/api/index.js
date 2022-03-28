const router = require('express').Router();

const userRoutes = require('./user-routes');
const cardRoutes = require('./card-routes');
const deckRoutes = require('./deck-routes');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('/decks', deckRoutes);

module.exports = router;