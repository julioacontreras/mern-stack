const mongoose = require("mongoose");

module.exports = {
    openConnect (done) {
      mongoose.connect("mongodb://localhost:27017/JestDB",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
    },
    closeConnection (done) {
      mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
      });      
    }
}


