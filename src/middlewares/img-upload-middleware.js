const multer = require('multer');
const ImgModel = require('../models/img-model');
const fs = require('fs');
const ApiError = require('../exceptions/api-error');

module.exports = function (req, res, next) {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '../uploads')
      },

      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })

    const upload = multer({ storage: storage })

    upload.single('testImg')

    next();
  } catch (e) {
    next(ApiError.UnauthorizedError());
  }
}