const jwt = require('../lib/jwt');
const ENV = require('../utils/constants');

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
        return res.redirect('/auth/login');
    }

    next();
}