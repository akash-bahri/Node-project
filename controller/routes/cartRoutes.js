const express = require('express');
const cartService = require('../services/cartService');
const router = express.Router();


// Add other routes as needed

// Route to display the cart
router.get('/:userId', async (req, res) => {
    try {
      req.session.views++;
      const cart = await  cartService.getCart();
      res.render('cart', { cart });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Route to handle the adding of a product to the cart
router.post('/:userId', async (req, res) => {
    try {
      await cartService.addToCart(req.body);
        res.redirect('/cart');
    } catch (error) {
        res.status(400).send(error.message);
    }
} );



module.exports = router;