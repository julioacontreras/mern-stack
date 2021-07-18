const bcrypt = require('bcrypt')

module.exports = {
  createHashFromPassword: (passwordPlain) => {
    return bcrypt.hash(passwordPlain, 10)
  },
  isValidPassword: (user, passwordPlain) => {
    return bcrypt.compare(passwordPlain, user.password)
  }
}
