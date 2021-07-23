const bcrypt = require('bcrypt')

module.exports = {
  createHashFromPassword: (passwordPlain) => {
    return bcrypt.hash(passwordPlain, 10)
  },
  isValidPassword: async (user, passwordPlain) => {
    return await bcrypt.compare(passwordPlain, user.password)
  }
}
