'use strict';

const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

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
// router.post('/products/user/cart/clear', productsController.clearUserCart);

module.exports = { router }
