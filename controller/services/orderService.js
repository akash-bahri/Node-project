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
module.exports = {
    createOrder,
    getOrders,
    getOrderById
};