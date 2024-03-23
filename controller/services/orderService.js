const Order = require('../../model/order');

const createOrder = async (orderData) => {
    const order = new Order(orderData);
    await order.save();
    return order;
}

const getOrders = async () => {
    return await Order.find({});
}

//function to get all orders by user id
const getOrderById = async (userId) => {
    return await Order.find({ user: userId });
}

const confirmOrder = async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    order.status = 'Confirmed';
    await order.save();
    return order;
};

const cancelOrder = async (orderId) => {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
}
module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    confirmOrder,
    cancelOrder
};