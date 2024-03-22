// model/cart.js
const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
});

module.exports = mongoose.model('Cart', CartSchema);
