const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const buildRoutes = require('./build-routes.js');
const deckRoutes = require('./deck-routes');

router.use('/build', buildRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/decks', deckRoutes);
router.use('/', homeRoutes);
router.use('/decks', deckRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;