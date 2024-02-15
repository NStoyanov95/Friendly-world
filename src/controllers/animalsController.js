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
        const isDonate = animal.donations.some(x => x._id == req.user?._id);
        res.render('animals/details', { animal, isUser, isOwner, isDonate })
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:animalId/donate', async (req, res) => {
    const userId = req.user?._id
    try {
        await animalsService.donate(req.params.animalId, userId);
        res.redirect(`/animals/${req.params.animalId}/details`);

    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:animalId/delete', async (req, res) => {
    try {
        await animalsService.delete(req.params.animalId);
        res.redirect('/animals/dashboard');
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:animalId/edit', async (req, res) => {
    try {
        const animal = await animalsService.getOne(req.params.animalId).lean();
        res.render('animals/edit', { animal });
    } catch (error) {
        res.redirect('/404');
    }
})

router.post('/:animals/edit', async (req, res) => {
    const animal = req.body;

    try {
        await animalsService.update(req.params.animals, animal);
        res.redirect(`/animals/${req.params.animals}/details`);
    } catch (error) {
        res.render('animals/edit', { error: getErrorMessage(error), animal });
    }
})


module.exports = router;