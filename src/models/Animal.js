const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        minLength: [2, 'Name should be at least 2 characters long']
    },
    years: {
        type: Number,
        required: [true, 'Please enter years'],
        min: [1, 'Years should be between 1 and 100'],
        max: [100, 'Years should be between 1 and 100']
    },
    kind: {
        type: String,
        required: [true, 'Please enter kind'],
        minLength: [3, 'Kind should be at least 2 characters long']
    },
    image: {
        type: String,
        required: [true, 'Please enter image'],
        match: [/^https?:\/\//, ' Image is required and should start with http:// or https://']
    },
    need: {
        type: String,
        required: [true, 'Please enter need'],
        minLength: [3, 'Need should be at least 3 and no longer than 20'],
        maxLength: [20, 'Need should be at least 3 and no longer than 20']
    },
    location: {
        type: String,
        required: [true, 'Please enter location'],
        minLength: [5, 'Location should be at least 5 and no longer than 15'],
        maxLength: [15, 'Location should be at least 5 and no longer than 15']
    },
    description: {
        type: String,
        required: [true, 'Please enter description'],
        minLength: [5, 'Description should be at least 5 and no longer than 50'],
        maxLength: [50, 'Description should be at least 5 and no longer than 50']
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