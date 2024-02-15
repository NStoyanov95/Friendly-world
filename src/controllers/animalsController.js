const router = require('express').Router();

const animalsService = require('../services/animalsService');

const { getErrorMessage } = require('../utils/errorUtils');

router.get('/create', (req, res) => {
    res.render('animals/create');
});

router.post('/create', async (req, res) => {
    animalData = req.body;
    animalData.owner = req.user._id
    try {
        await animalsService.create(animalData);
        res.redirect('/animals/dashboard');
    } catch (error) {
        res.render('animals/create', { error: getErrorMessage(error) });
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const animals = await animalsService.getAll().lean();
        res.render('animals/dashboard', { animals });
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:animalId/details', async (req, res) => {
    try {
        const animal = await animalsService.getOne(req.params.animalId).lean();
        const isUser = req.user;
        const isOwner = req.user?._id == animal.owner._id;
        res.render('animals/details', { animal, isUser, isOwner })
    } catch (error) {
        res.redirect('/404');
    }
})




module.exports = router;