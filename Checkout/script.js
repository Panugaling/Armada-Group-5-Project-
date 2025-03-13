document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.getElementById('profile-btn');
    const logoutDropdown = document.getElementById('logout-dropdown');

    profileBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        logoutDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        if (!profileBtn.contains(event.target) && !logoutDropdown.contains(event.target)) {
            logoutDropdown.classList.remove('show');
        }
    });

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        alert('Logging out...');
        window.location.href = '/login'; 
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const placeOrderBtn = document.querySelector('.placeorder');

    placeOrderBtn.addEventListener('click', function () {
        // Show success alert
        alert("You have successfully ordered!");

        // Reset prices
        const priceElements = document.querySelectorAll('.billingOrder ul li p:last-child');
        priceElements.forEach(price => {
            if (!price.textContent.includes("Free")) {
                price.textContent = "$0.00";
            }
        });

        // Reset radio buttons
        const paymentOptions = document.querySelectorAll('input[name="payment"]');
        paymentOptions.forEach(option => {
            option.checked = false;
        });

        // Check if "Save Information" is unchecked before resetting form fields
        const saveInfoCheckbox = document.getElementById('save-info');
        if (!saveInfoCheckbox.checked) {
            const inputFields = document.querySelectorAll('form input[type="text"], form input[type="email"]');
            inputFields.forEach(input => {
                input.value = ""; // Clear text fields
            });
        }

        // Disable Place Order button after clicking
        placeOrderBtn.disabled = true;
        placeOrderBtn.style.backgroundColor = "#ccc"; // Change color to gray
        placeOrderBtn.textContent = "Order Placed"; // Update button text
    });
});

function navigateTo(page) {
    if (page === "home") {
        window.location.href = "/Dashboard/dashboard.html";
    } else if (page === "cart") {
        window.location.href = "/Cart/Cart.html";
    }
}

