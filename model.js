const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    firstname: {  // Corrected typo
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,  // Added 'required' if Email is mandatory
    },
    Phonenumber: {
        type: String,
    },
    reasonforcontact: {
        type: String,
    },
    companyname: {
        type: String,
    },
    contacttype: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Profile', ProfileSchema); // Singular name for the model
