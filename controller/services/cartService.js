const Cart = require('../../model/cart');

const createCart = async (cartData) => {
    const cart = new Cart(cartData);
    await cart.save();
    return cart;
}

const getCart = async () => {
    return await Cart.find({});
}

const deleteCart = async (id) => {  
    const cart = await Cart.findByIdAndDelete(id);
    if (!cart) {
        throw new Error('Cart not found');
    }
    return cart;
};

module.exports = {
    createCart,
    getCart
};
