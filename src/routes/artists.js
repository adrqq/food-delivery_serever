'use strict';

const express = require('express');
const artistsController = require('../controllers/artists');

const router = express.Router();

router.get('/', artistsController.getAll)
// router.post('/', artistsController.insert)

module.exports = { router }