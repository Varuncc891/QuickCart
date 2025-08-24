const mongoose = require('mongoose');

const lastPurchaseSchema = new mongoose.Schema({
  name: String,
  username: String,
});

const LastPurchase = mongoose.model('LastPurchase', lastPurchaseSchema);

module.exports = LastPurchase;
