const Product = require('../../model/product');

const createProduct = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
    }

const getAllProducts = async () => {
    return await Product.find({});
    }

const getProductById = async (id) => {
    
   return await Product.findById(id);
   
    }
const deleteProduct = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}
    module.exports = {
        createProduct,
        getAllProducts,
        getProductById,
        deleteProduct
    };