const jwt = require('../lib/jwt');
const ENV = require('../utils/constants');

const animalsService = require('../services/animalsService');

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, ENV.SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAuth = true;
        return next();

    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }

    next();
};

exports.isOwner = async (req, res, next) => {

    const animal = await animalsService.getOne(req.params.animalId);
    const user = req.user?._id;
    const isOwner = user == animal.owner._id;

    if (!isOwner) {
        return res.redirect('/404');
    }

    return next();
};
exports.isUser = async (req, res, next) => {
    const animal = await animalsService.getOne(req.params.animalId);
    const user = req.user?._id;
    console.log(user);
    console.log(animal);
    const isUser = animal.owner._id != user;
    
    if (isUser) {
        return next();
    }
    return res.redirect('/404')
    
}

exports.isGuest = (req, res, next) => {
    const user = req.user;

    if (!user) {
        return next();
    }

    return res.redirect('/404');
}
