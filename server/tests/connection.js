const mongoose = require('mongoose');

module.exports = {
    async openConnect (done) {
      await mongoose.connection.close()
      await mongoose.connect('mongodb://localhost:27017/JestDB',
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => done());
    },
    closeConnection (done) {
      if (!mongoose.connection.db) {
        done()
        return
      }
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
      });      
    }
}
