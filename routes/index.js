const router = require('express').Router();
const routeUser = require('./users');
const routeMovies = require('./movies');
const routeAllOthers = require('./allOthers');

router.use('/users', routeUser);
router.use('/movies', routeMovies);
router.use('/*', routeAllOthers);

module.exports = router;
