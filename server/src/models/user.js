const mongoose = require('../../utils/dbConn');

const userModel = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        default: '',
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
    },
    address: {
        type: String,
        trim: true,
        default: '',
    },
    state : {
        type: String,
        trim: true,
        default: '',
    },
    postalCode : {
        type: String,
        trim: true,
        default: '',
    },
    city : {
        type: String,
        trim: true,
        default: '',
    },
    userType : {
        type: String,
        trim: true,
        default: '',
    },
    phoneNumber : {
        type: String,
        trim: true,
        default: '',
    },
    bio: {
        type: String,
        trim: true,
        default: '',
    }, 
});

module.exports = mongoose.model('users', userModel);
