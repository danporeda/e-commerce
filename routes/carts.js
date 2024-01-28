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

  const existingItem = cart.items.find(item => req.body.productId === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }
  await cartsRepo.update(cart.id, {
    items: cart.items
  });
  res.send('Product added to cart');
})

module.exports = router;