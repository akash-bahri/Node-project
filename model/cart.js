const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: String,
    products: [{ productId: String, name: String, quantity: Number, price: Number, imageUrl: String}],
});

module.exports = mongoose.model('Cart', CartSchema);
