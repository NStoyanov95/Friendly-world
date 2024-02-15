const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
    },
    years: {
        type: Number,
        required: [true, 'Please enter years'],
    },
    kind: {
        type: String,
        required: [true, 'Please enter kind'],
    },
    image: {
        type: String,
        required: [true, 'Please enter image'],
    },
    need: {
        type: String,
        required: [true, 'Please enter need'],
    },
    location: {
        type: String,
        required: [true, 'Please enter location'],
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],
    },
    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});


const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;