const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jwt');
const ENV = require('../utils/constants');

exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('Email already exist');
    }
    const createdUser = await User.create(userData);

    const token = await generateToken(createdUser);

    return token;
}


exports.login = async (loginData) => {
    const user = await User.findOne({ email: loginData.email });

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isValid = await bcrypt.compare(loginData.password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password.');
    }

    const token = await generateToken(user);
    return token;
};

function generateToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    return jwt.sign(payload, ENV.SECRET, { expiresIn: '1d' });
}