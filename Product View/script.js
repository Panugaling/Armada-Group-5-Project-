document.getElementById('increase').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;

    updateTotal();
});

document.getElementById('decrease').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }

    updateTotal();
});

function updateTotal() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const pricePerItem = 10.00; // Each item costs $10.00
    const totalAmount = document.querySelector('.total-amount .amount');

    totalAmount.innerText = `$${(quantity * pricePerItem).toFixed(2)}`;
}

// Ensure the correct total amount is displayed on page load
updateTotal();

// Add to Cart Button - Redirect to Checkout Page
document.querySelector('.add-to-cart').addEventListener('click', function() {
    const quantity = document.getElementById('quantity').value;
    const pricePerItem = 10.00;
    const totalPrice = (quantity * pricePerItem).toFixed(2);

    // Redirect to checkout.html with quantity & total price as URL parameters
    window.location.href = `checkout.html?quantity=${quantity}&total=${totalPrice}`;
});


/* ITO GAMITIN PARA E RETRIEVE ANG DATA NA GALING SA PRODUCT VIEW PAPUNTA SA CART */
/* // Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get quantity and total from URL
const quantity = getQueryParam('quantity');
const total = getQueryParam('total');

// Display the values on checkout.html
document.getElementById('checkout-quantity').innerText = quantity;
document.getElementById('checkout-total').innerText = `$${total}`;
 */

/* PLACE HOLDER NA KAYLANGAN GAMITIN */
/*  <h2>Checkout Summary</h2>
    <p>Quantity: <span id="checkout-quantity"></span></p>
    <p>Total Price: <span id="checkout-total"></span></p>
 */