const express = require('express');
const orderService = require('../services/orderService');
const orderDomain = require('../domain/orderDomain');
const router = express.Router();


// Add other routes as needed

// Route to display the orders
router.get('/', async (req, res) => {
    try {
      console.log(req.session.user._id);
      const orders = await  orderDomain.getOrdersByUserId(req.session.user._id);
      res.render('order', { orders });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Route to handle the creation of a new order
router.post('/place', async (req, res) => {
    try {
      console.log("running1");
      await orderDomain.placeOrder(req.body.userId);
      console.log("running2");
        res.redirect('/orders');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;