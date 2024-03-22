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

    module.exports = {
        createProduct,
        getAllProducts,
        getProductById
    };