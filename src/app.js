const express = require('express')
const cors = require('cors');

require('dotenv').config();

const { router: productsRouter } = require('./routes/products');

const app = express()

async function setup() {
  app.use(cors());

  app.use('/', express.json(), productsRouter);

  return app;
}

setup()

module.exports = app;
