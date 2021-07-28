require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Boot = require('./boot');
const app = express();
const apiPort = process.env.PORT || 3300;
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  console.info('🐵 DEVELOPMENT MODE')
  const cors = require('cors');
  app.use(cors());
}

// initialize application
Boot(app)

// prepare & register routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const routes = require('./routes')(app);
app.use('/api', routes);

app.listen(apiPort, () => console.info(`Server running on port ${apiPort}`));

module.exports = app