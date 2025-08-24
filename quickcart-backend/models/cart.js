const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
  quantity: Number,
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
