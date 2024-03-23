const cartService = require('../services/cartService');
const productService = require('../services/productService');

const addToCart = async (userId, productId) => {
    console.log(productId);
    let product = await productService.getProductById(productId);
    
    if (!product) {
        throw new Error('Product not found');
    }

    let carts = await cartService.getCart();
    let cart = carts.find(c => c.user === userId);
    
    if (!cart) {
        cart = await cartService.createCart({ user: userId, products: [] });
    }
    
    const productIndex = cart.products.findIndex(p => p.productId === productId);

    if (productIndex > -1) {
        // Product exists in the cart, increase quantity
        cart.products[productIndex].quantity += 1;
    } else {
        // Product not in cart, add new item
        cart.products.push({ productId: productId, quantity: 1, name: product.name, price: product.price, imageUrl: product.imageUrl});
    }

    await cart.save();
    return cart;
};

const getCart = async (userId) => {
    let carts = await cartService.getCart();
    let cart = carts.find(c => c.user === userId);
    return cart;
};

const deleteFromCart = async (userId, productId) => {
    let cart = await cartService.getCartById(userId);

    if (!cart) {
        throw new Error('Cart not found');
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex > -1) {
        // Product exists in the cart, decrease quantity
        cart.products[productIndex].quantity -= 1;
        if (cart.products[productIndex].quantity <= 0) {
            // Remove product from cart if quantity is 0
            cart.products.splice(productIndex, 1);
        }
    } else {
        throw new Error('Product not found in cart');
    }

    await cart.save();
    return cart;
};
module.exports = {
    addToCart,
    deleteFromCart,
    getCart
};