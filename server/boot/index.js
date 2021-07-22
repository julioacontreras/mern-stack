const db = require('../db');
const User = require('../models/user')
const AuthRegister = require('../services/auth/register')
const CloudnaryRegister = require('../services/cloudinary/register')

module.exports = (app) => {
  // register database
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // register authentication
  AuthRegister(app, (data) => {
    return User.find(data)
  });

  // register cloudnary
  CloudnaryRegister(app);
}
