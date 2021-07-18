require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = process.env.PORT;

// register database
const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// register authentication
const User = require('./models/user')
require('./services/auth/register')(app, (data) => {
    return User.find(data)
});

// register cloudnary
require('./services/cloudinary/register')(app);

// prepare & register routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
const routes = require('./routes')(app);
app.use('/api', routes);

app.listen(apiPort, () => console.info(`Server running on port ${apiPort}`));

module.exports = app