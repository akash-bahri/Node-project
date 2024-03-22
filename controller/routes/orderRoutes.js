const express = require('express');
const orderService = require('../services/orderService');
const router = express.Router();

router.get('/:userId', orderService.getOrders);
router.post('/:userId', orderService.createOrder);
// Add other routes as needed

// Route to display the orders
router.get('/:userId', async (req, res) => {
    try {
      req.session.views++;
      const orders = await  orderService.getOrders();
      res.render('orders', { orders });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Route to handle the creation of a new order
router.post('/:userId', async (req, res) => {
    try {
      await orderService.createOrder(req.body);
        res.redirect('/orders');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;