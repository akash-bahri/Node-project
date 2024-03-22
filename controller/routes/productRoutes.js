const express = require('express');
const productService = require('../services/productService');
const router = express.Router();

// Route to display the form for creating a new product
router.get('/', async (req, res) => {
    try {
      req.session.views++;
      const products = await productService.getAllProducts();
      res.render('catalog', { products });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


//----------additional feature to add a new product----------------


// Route to handle the creation of a new product
// router.post('/', async (req, res) => {
//     try {
//       await productService.createProduct(req.body);
//         res.redirect('/catalog');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// } );

module.exports = router;