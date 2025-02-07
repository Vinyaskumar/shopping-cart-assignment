const cart = require('../cart');

test('Add products to cart', () => {
    cart.addProduct('cornflakes', 2, 2.52);
    const state = cart.getCartState();
    expect(state.items[0].quantity).toBe(2);
    expect(state.subtotal).toBe('5.04');
    expect(state.tax).toBe(0.63);
    expect(state.total).toBe(5.67);
});
