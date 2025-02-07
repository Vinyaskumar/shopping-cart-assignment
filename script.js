async function addToCart() {
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    const priceList = {
        cheerios: 8.43,
        cornflakes: 2.52,
        frosties: 4.99,
        shreddies: 4.68,
        weetabix: 9.98
    };

    const price = priceList[product.toLowerCase()];
    if (!price) return alert('Invalid product name.');

    await fetch('http://localhost:3000/add-to-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, quantity, price })
    });

    updateCart();
}

async function removeFromCart(product) {
    await fetch('http://localhost:3000/remove-from-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product })
    });

    updateCart();
}

async function updateQuantity(product) {
    const newQuantity = prompt(`Enter new quantity for ${product}:`);
    if (newQuantity <= 0) {
        removeFromCart(product);
        return;
    }

    await fetch('http://localhost:3000/update-quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, quantity: parseInt(newQuantity) })
    });

    updateCart();
}

async function updateCart() {
    const response = await fetch('http://localhost:3000/cart');
    const data = await response.json();

    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = data.items.map(item =>
        `<div>
            ${item.quantity} × ${item.product} @ $${item.price} 
            <button onclick="updateQuantity('${item.product}')">Update Quantity</button>
            <button onclick="removeFromCart('${item.product}')">Remove</button>
        </div>`
    ).join('') +
    `<br><strong>Subtotal:</strong> $${data.subtotal}
     <br><strong>Tax (12.5%):</strong> $${data.tax}
     <br><strong>Total:</strong> $${data.total}`;
}
