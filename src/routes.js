const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const animalsController = require('./controllers/animalsController');

router.use(homeController);
router.use('/auth', authController);
router.use('/animals', animalsController);


module.exports = router;