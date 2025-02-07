const express = require('express');
const app = express();
const cart = require('./cart');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.post('/add-to-cart', (req, res) => {
    const { product, quantity, price } = req.body;
    cart.addProduct(product, quantity, price);
    res.send(cart.getCartState());
});

app.post('/remove-from-cart', (req, res) => {
    const { product } = req.body;
    cart.removeProduct(product);
    res.send(cart.getCartState());
});

app.post('/update-quantity', (req, res) => {
    const { product, quantity } = req.body;
    cart.updateQuantity(product, quantity);
    res.send(cart.getCartState());
});

app.get('/cart', (req, res) => {
    res.send(cart.getCartState());
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
