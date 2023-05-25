const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
  productId: { type: Number, required: true },
  count: { type: Number, required: true },
});

const CartSchema = new Schema({
  userId: String,
  itemsData: [ItemSchema],
});

module.exports = model('Cart', CartSchema, 'carts');
