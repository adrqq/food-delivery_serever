const { Schema, model } = require('mongoose');

const ImgSchema = new Schema({
  productId: { type: Number, required: true },
  name: { type: String, required: true },
  img: {
    data: Buffer,
    contentType: String
  }
})

module.exports = model('Img', ImgSchema, 'images');