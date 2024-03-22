const Order = require('../../model/order');

const createOrder = async (orderData) => {
    const order = new Order(orderData);
    await order.save();
    return order;
}

const getOrders = async () => {
    return await Order.find({});
}

module.exports = {
    createOrder,
    getOrders
};