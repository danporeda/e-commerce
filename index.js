const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminproductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['jdshjkdhfjkdfkskll']
  })
);
app.use(authRouter);
app.use(adminproductsRouter);
app.use(productsRouter);

app.listen(3000, () => {
  console.log('Listening');
});
