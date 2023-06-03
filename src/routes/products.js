'use strict';

const express = require('express');
const productsController = require('../controllers/products');
const imageUploadMiddleware = require('../middlewares/img-upload-middleware');
const multer = require('multer');
const ImgModel = require('../models/img-model');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../src/uploads')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/products', productsController.getAll);
router.get('/products/chunk', productsController.getChunk);
router.get('/products/length', productsController.getLength);
router.get('/products/search', productsController.search);
router.get('/products/user/cart', productsController.getUserCart);
router.post('/products/add', productsController.addProduct);
router.post('/products/likes/add', productsController.increaseLikesCount);
router.post('/products/user/cart/add', productsController.addProductToUserCart);
router.post('/products/user/cart/remove', productsController.removeProductFromUserCart);
router.post('/products/user/cart/delete', productsController.deleteProductFromUserCart);
router.post('/products/image/upload', upload.single('image'), productsController.uploadImage);
router.get('/products/image/get', productsController.getImage);
// router.post('/products/user/cart/clear', productsController.clearUserCart);

module.exports = { router }
