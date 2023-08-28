const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail');
const TokenService = require('./token');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const tokenModel = require('../models/token-model');
// const token = require('./token');
// const jwt = require('jsonwebtoken');

class UserService {

  async registration(name, role, email, password) {
    const candidate = await UserModel.findOne({ email, isActivated: true });

    if (candidate) {
      throw ApiError.BadRequest('User with this email already exists in the database');
    }

    const candidateNotActivated = await UserModel.findOne({ email, isActivated: false });

    if (candidateNotActivated) {
      UserModel.deleteOne({ email, isActivated: false });
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({ name, role, email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

    const userDto = new UserDto(user);

    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  // async registration(name, role, email, password) {
  //   const candidate = await UserModel.findOne({ email, isActivated: true });

  //   if (candidate) {
  //     throw ApiError.BadRequest('User with this email already exists in the database');
  //   }

  //   const usersNotActivated = await UserActivationModel.find({ email });

  //   if (usersNotActivated.length > 10) {
  //     throw ApiError.BadRequest('Too many requests, please try again later');
  //   }

  //   const hashPassword = await bcrypt.hash(password, 3);
  //   const activationLink = uuid.v4();
  //   const user = await UserActivationModel.create({ name, role, email, password: hashPassword, activationLink });
  //   await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

  //   const userDto = new UserDto(user);

  //   return { user: userDto };
  // }

  async login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('User with this email does not exist');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password');
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    if (!user.isActivated) {
      return {
        ...tokens, user: {
          ...userDto,
          isActivated: false,
        }
      };
    }

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      console.log('refreshToken', refreshToken);
      throw ApiError.UnauthorizedError();
    }



    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      console.log('refreshToken', refreshToken);
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);

    if (!user.isActivated) {
      return user.email;
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();

    return users;
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    const existingUser = await UserModel.findOne({ email: user.email, isActivated: true });

    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }

    if (existingUser) {
      throw ApiError.BadRequest('User with this email already activated');
    }

    user.isActivated = true;
    await user.save();

    return 'User successfully activated';
  };

  // async activate(activationLink) {
  //   const user = await UserActivationModel.findOne({ activationLink });
  //   const existingUser = await UserModel.findOne({ email: user.email, isActivated: true });

  //   if (existingUser) {
  //     throw ApiError.BadRequest('User with this email already exists in the database');
  //   }

  //   if (!user) {
  //     throw ApiError.BadRequest('Incorrect activation link');
  //   }

  //   const newUser = await UserModel.create({ name: user.name, role: user.role, email: user.email, password: user.password, isActivated: true });
  //   const userDto = new UserDto(user);
  //   const tokens = TokenService.generateToken({ ...userDto });
  //   await TokenService.saveToken(userDto.id, tokens.refreshToken);

  //   const fakeUsers = await UserActivationModel.find({ email: user.email });

  //   if (fakeUsers.length) {
  //     await UserActivationModel.deleteMany({ email: user.email });
  //   }

  //   return { ...tokens, user: userDto };
  // }

  async sendActivationLink(email) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ApiError.BadRequest('User with this email does not exist');
    }

    if (user.isActivated) {
      throw new ApiError.BadRequest('User is already activated');
    }

    const activationLink = uuid.v4();

    user.activationLink = activationLink;
    await user.save();

    await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);

    return activationLink;
  }

  async changeUserData(
    oldEmail,
    oldPassword,
    name,
    role,
    email,
    password,
  ) {
    const user = await UserModel.findOne({ email: oldEmail });

    if (!user) {
      console.log('MAIL', oldEmail);
      throw ApiError.BadRequest('User with this email does not exist');
    }

    const isPassEquals = await bcrypt.compare(oldPassword, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect old password, data is not changed');
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const changedUser = await UserModel.updateOne(
      {
        name,
        role,
        email,
        password: hashPassword,
        isActivated: email === oldEmail ? user.isActivated : false,
        activationLink,
        oldEmails: email === oldEmail ? user.oldEmails : [...user.oldEmails, user.email],
      },
    );

    if (email !== oldEmail) {
      await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${activationLink}`);
    }

    await tokenModel.deleteMany({ userId: user._id });

    const userDto = new UserDto(changedUser);

    return { user: userDto };
  }
}
module.exports = new UserService();