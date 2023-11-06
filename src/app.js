const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fs = require('fs');

require('dotenv').config();

const { router: productsRouter } = require('./routes/products');
const { router: userRouter } = require('./routes/user');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express()

const validationFile = fs.readFileSync('../3264C2478A6E0C5B33069F0CDF680FE5.txt');

async function setup() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
  app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }));
  app.use(cookieParser());

  app.use('/', express.json(), productsRouter);
  app.use('/', express.json(), userRouter);
  app.get('/.well-known/pki-validation/3264C2478A6E0C5B33069F0CDF680FE5.txt', (req, res) => {
    console.log('validationFile', validationFile);
    res.send(validationFile);
  });

  app.use(errorMiddleware)

  return app;
}

setup()

module.exports = app;
