const orderService = require('../services/orderService'); 
const cartService = require('../services/cartService');

const getOrders = async () => {
    return await orderService.getOrders();
}

const getOrdersByUserId = async (userId) => {
    return await orderService.getOrderById(userId);
}

const placeOrder = async (userId) => {
    console.log("running3");
    console.log(userId);
    const cart = await cartService.getCartById(userId);
    console.log("running4");
    if (!cart) {
        throw new Error('Cart not found');
    }
    console.log("running5");
    const total = cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const orderData = {
        user: userId,
        products: cart.products,
        total: total
    };
    console.log("running6");
    cartService.deleteCart(cart._id);
    return await orderService.createOrder(orderData);
}

module.exports = {
    getOrders,
    placeOrder,
    getOrdersByUserId
};

