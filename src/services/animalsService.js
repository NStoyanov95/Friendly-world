const Animal = require('../models/Animal');

exports.getAll = () => Animal.find();

exports.getOne = (animalId) => Animal.findById(animalId).populate('owner').populate('donations');

exports.getLastThree = () => Animal.find().sort({ createdAt: -1 }).limit(3);

exports.create = (animalData) => Animal.create(animalData);

exports.update = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData, { runValidators: true });

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.donate = (animalId, userId) => Animal.findByIdAndUpdate(animalId, { $push: { donations: userId } });

exports.search = (search) => Animal.find({location: new RegExp(search, "i")});