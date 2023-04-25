const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'user', required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
})

module.exports = model('Product', ProductSchema);