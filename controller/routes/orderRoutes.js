const express = require('express');
const orderService = require('../services/orderService');
const orderDomain = require('../domain/orderDomain');
const router = express.Router();


// Add other routes as needed

// Route to display the orders
router.get('/', async (req, res) => {
    try {
      const orders = await  orderDomain.getOrdersByUserId(req.session.user._id);
      res.render('order', { orders });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Route to handle the creation of a new order
router.post('/place', async (req, res) => {
    try {
      await orderDomain.placeOrder(req.body.userId,req.session.user.name);
        res.redirect('/orders');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/all', async (req, res) => {
    try {
      const orders = await orderDomain.getOrders();
      res.render('allorder', { orders });  
    } catch (error) {
      res.status(500).send(error.message);
    }
});

// Route to handle the confirmation of an order
router.get('/confirm/:orderId', async (req, res) => {
  try {
    await orderDomain.confirmOrder(req.params.orderId);
    res.redirect('/orders/all');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to handle the cancellation of an order
router.get('/cancel/:orderId', async (req, res) => {
  try {
    await orderDomain.cancelOrder(req.params.orderId);
    res.redirect('/orders/all');
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;