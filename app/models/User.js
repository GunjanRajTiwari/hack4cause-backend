const mongoose = require('mongoose');
require('dotenv').config()

const userSchema = mongoose.Schema({
    googleID: {
        type: String,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;