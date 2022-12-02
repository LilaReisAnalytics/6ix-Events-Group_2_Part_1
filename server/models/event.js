let mongoose = require('mongoose');

// create a model class
let eventModel = mongoose.Schema({
    name: String,
    date: String,
    description: String,
    price: Number
},
{
    collection: "events"
});

module.exports = mongoose.model('Event', eventModel);