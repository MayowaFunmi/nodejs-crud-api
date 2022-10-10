const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phone: String,
}, { timestamps: true });

const people = new mongoose.model('People', peopleSchema);
module.exports = people;