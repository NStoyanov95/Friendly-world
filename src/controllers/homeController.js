const router = require('express').Router();

const animalsService = require('../services/animalsService');

router.get('/', async (req, res) => {
    try {
        const animals = await animalsService.getLastThree().lean();
        res.render('home', { animals });;
    } catch (error) {
        res.redirect('/404');
    }
});

module.exports = router;