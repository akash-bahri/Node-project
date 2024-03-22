// model/product.js
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    price: Number,
    category: String,
    imageUrl: String,
    // Add other fields as needed
});

module.exports = mongoose.model('Product', ProductSchema);
