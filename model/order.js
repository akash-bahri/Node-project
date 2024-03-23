const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: String,
    userName: String,
    products: [{ productId: String, name: String, quantity: Number, price: Number, imageUrl: String}],
    total: { type: Number, default: 0 },
    status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);