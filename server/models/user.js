const mongoose = require('mongoose');
const injectable = require('../services/auth/user.inject');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: 'String', required: true },
    username: { type: 'String', required: true },
    password: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

// auth injects
const instance = mongoose.model('User', userSchema);
instance.isValidPassword = injectable.isValidPassword
instance.createHashFromPassword = injectable.createHashFromPassword

module.exports = instance 
