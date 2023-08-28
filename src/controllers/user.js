const UserService = require('../services/user.js')
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { name, role, email, password } = req.body;

      console.log('name', name, 'role', role, 'email', email, 'password', password);

      const userData = await UserService.registration(name, role, email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, remember } = req.body;
      const userData = await UserService.login(email, password);
      console.log('remember', remember);

      if (remember) {
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      }

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);

      console.log('refreshToken', refreshToken);

      res.clearCookie('refreshToken');

      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);

      return res.redirect(`${process.env.CLIENT_URL}`);
    } catch (e) {
      next(e);
    }
  }

  async sendActivationLink(req, res, next) {
    try {
      const { email } = req.body;

      await UserService.sendActivationLink(email);

      return res.json('Activation link has been sent to your email');
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async changeUserData(req, res, next) {
    try {
      const {
        oldEmail,
        oldPassword,
        name,
        role,
        email,
        password
      } = req.body;

      const userData = await UserService.changeUserData(
        oldEmail,
        oldPassword,
        name,
        role,
        email,
        password
      );

      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
};

module.exports = new UserController();