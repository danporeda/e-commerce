const express = require('express');
const cartsRepo = require('../repositories/carts')

const router = express.Router();

router.post('/cart/products', async (req, res) => {
  // Figure out the cart
  let cart;
  if (!req.session.cartId) {
    // We don't have a cart, we need to create one,
    // and store the cart id on the req.session.cartId
    // property
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    // we have a cart, get it from repository
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  console.log(cart);
  // Either increment quantity for existing product
  // OR add new product to items array

  res.send('Product added to cart');
})

module.exports = router;