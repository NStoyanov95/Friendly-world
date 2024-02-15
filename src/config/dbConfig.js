const mongoose = require('mongoose');

const dbConfigurator = async () =>{
    await mongoose.connect('mongodb://127.0.0.1:27017/friendly-world');
};

module.exports = dbConfigurator;

