let cartItems = [];

function addProduct(product, quantity, price) {
    const existingItem = cartItems.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ product, quantity, price });
    }
}

function removeProduct(product) {
    cartItems = cartItems.filter(item => item.product !== product);
}

function updateQuantity(product, quantity) {
    const item = cartItems.find(item => item.product === product);
    if (item) item.quantity = quantity;
}

function calculateTotals() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = +(subtotal * 0.125).toFixed(2);
    const total = +(subtotal + tax).toFixed(2);
    return { subtotal: subtotal.toFixed(2), tax, total };
}

function getCartState() {
    return { items: cartItems, ...calculateTotals() };
}

module.exports = { addProduct, removeProduct, updateQuantity, getCartState };
