'use strict';

const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/products/chunk', productsController.getChunk);
router.get('/products/length', productsController.getLength);
router.get('/products/search', productsController.search);

module.exports = { router }
