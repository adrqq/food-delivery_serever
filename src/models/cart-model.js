const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
  product: { type: Object, required: true },
  count: { type: Number, required: true },
});

const CartSchema = new Schema({
  userId: String,
  itemsData: [ItemSchema],
});

module.exports = model('Cart', CartSchema, 'carts');
