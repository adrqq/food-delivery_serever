'use strict';

const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth-middleware');

const router = express.Router();
const { body } = require('express-validator');

router.post(
  '/registration',
  body('name').isString(),
  body('role').isString(),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6, max: 32 }),
  userController.registration
);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post(
  '/change-user-data',
  body('name').isString(),
  body('role').isString(),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6, max: 32 }),
  userController.changeUserData
)
router.post('/send-activation-link', userController.sendActivationLink);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getAllUsers);

module.exports = { router };
