const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
    total: { type: Number, default: 0 },
    status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);