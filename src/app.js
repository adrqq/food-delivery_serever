const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const { router: productsRouter } = require('./routes/products');
const { router: userRouter } = require('./routes/user');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express()

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

  app.use(errorMiddleware)

  return app;
}

setup()

module.exports = app;
