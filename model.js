const mongoose = require('mongoose');

const Profiles = mongoose.Schema({
    fristname: {
        type: String,
        required:true,
    },
    lastname: {
        type: String,
        required:true,
    },
    Email: {
        type: String,
    },
    Phonenumber: {
        type: String,
    },
    reasonforcontact: {
        type: String,
    },
    companyname: {
        type: String
    },
    contacttype: {
        type: String
    },
    date : {
        type :Date,
        default: Date.now
    }
})

module.exports = mongoose.model('profiles',Profiles)