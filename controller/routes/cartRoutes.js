const express = require('express');
const cartService = require('../services/cartService');
const router = express.Router();
const cartDomain = require('../domain/cartDomain');


// Add other routes as needed

// Route to display the cart
router.get('/', async (req, res) => {
    try {
      
      const cart = await cartDomain.getCart(req.session.user._id);
      res.render('cart', { cart });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Route to handle the adding of a product to the cart
router.post('/add/:userId', async (req, res) => {
  try {
    console.log("--------------------------------------------");
    console.log(req.body.productId);
    console.log(req.params.userId);
    if (!req.params.userId || !req.body.productId) {
      // Redirect to product page or show an error
      return res.redirect('/products/catalog');
    }
    await cartDomain.addToCart(req.params.userId,req.body.productId);
    res.redirect('/cart');
  } catch (error) {
    res.status(500).send(error.message);
  }
});



module.exports = router;