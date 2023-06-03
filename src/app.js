const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const functions = require('firebase-functions');
// const multer = require('multer');
// const ImgModel = require('./models/img-model');
// const fs = require('fs');

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

  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, 'uploads')
  //   },

  //   filename: function (req, file, cb) {
  //     cb(null, file.originalname)
  //   }
  // })

  // const upload = multer({ storage: storage })

  // app.post('/upload', upload.single('testImg'), (req, res) => {
  //   const saveImg = new ImgModel({
  //     name: req.body.name,
  //     img: {
  //       data: fs.readFileSync('uploads/' + req.file.filename),
  //       contentType: 'image/png'
  //     }
  //   })

  //   saveImg.save()

  //   res.send('ok')
  // })

  return app;
}

setup()

module.exports = app;
