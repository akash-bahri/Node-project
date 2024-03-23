const orderService = require('../services/orderService'); 
const cartService = require('../services/cartService');

const getOrders = async () => {
    return await orderService.getOrders();
}

const getOrdersByUserId = async (userId) => {
    return await orderService.getOrderById(userId);
}

const placeOrder = async (userId,name) => {

    const cart = await cartService.getCartById(userId);

    if (!cart) {
        throw new Error('Cart not found');
    }

    const total = cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const orderData = {
        user: userId,
        userName: name,
        products: cart.products,
        total: total
    };
    cartService.deleteCart(cart._id);
    return await orderService.createOrder(orderData);
}

const confirmOrder = async (orderId) => {
    const order = await orderService.confirmOrder(orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
};

const cancelOrder = async (orderId) => {
    const order = await orderService.cancelOrder(orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
};

module.exports = {
    getOrders,
    placeOrder,
    getOrdersByUserId,
    confirmOrder,
    cancelOrder
};