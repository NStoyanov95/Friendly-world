const Animal = require('../models/Animal');

exports.getAll = () => Animal.find();

exports.getLastThree = () => Animal.find().sort({createdAt: -1}).limit(3);

exports.create = (animalData) => Animal.create(animalData);