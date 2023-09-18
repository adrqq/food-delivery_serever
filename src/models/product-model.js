const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, default: false },
  category: { type: String, required: true },
  count: { type: Number, required: true },
  likesCount: { type: Number, required: true },
  packageCost: { type: Number, required: true },
})

module.exports = model('Product', ProductSchema, 'products');
