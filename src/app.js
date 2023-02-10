const express = require('express')
const cors = require('cors');

require('dotenv').config();

const { router: artistsRouter } = require('./routes/artists');

const app = express()

async function setup() {
  app.use(cors());

  app.use('/artists', express.json(), artistsRouter);

  return app;
}

setup()

module.exports = app;