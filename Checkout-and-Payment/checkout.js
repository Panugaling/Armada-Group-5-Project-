document.addEventListener("DOMContentLoaded", () => {
    const userProfile = document.querySelector('.user-profile');
    const logoutDropdown = document.getElementById('logout-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    if (userProfile && logoutDropdown && logoutBtn) {
        userProfile.addEventListener('click', function (e) {
            e.stopPropagation();
            logoutDropdown.style.display = logoutDropdown.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function (e) {
            if (!userProfile.contains(e.target)) {
                logoutDropdown.style.display = 'none';
            }
        });

        logoutBtn.addEventListener('click', function () {
            alert('Logging out...');
            window.location.href = 'login.html'; 
        });
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const billingOrder = document.querySelector(".billingOrder ul");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const placeOrderBtn = document.querySelector(".placeorder");
    const checkoutForm = document.getElementById("checkout-form");

    billingOrder.innerHTML = ""; 
    let subtotal = 0;

    function validateForm() {
        const firstName = checkoutForm.firstname.value.trim();
        const lastName = checkoutForm.lastname.value.trim();
        const address = checkoutForm.address.value.trim();
        const city = checkoutForm.city.value.trim();
        const phone = checkoutForm.phone.value.trim();
        const email = checkoutForm.email.value.trim();
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

        if (firstName && lastName && address && city && phone && email && paymentMethod) {
            placeOrderBtn.disabled = false;
            placeOrderBtn.style.opacity = "1";
        } else {
            placeOrderBtn.disabled = true;
            placeOrderBtn.style.opacity = "0.5";
        }
    }

    if (cartItems.length === 0) {
        billingOrder.innerHTML = `
            <li><p>Item:</p><p class="item-name"> </p></li>
            <li><p>Subtotal:</p><p id="subtotal">$0.00</p></li>
            <li class="shipping"><p>Shipping:</p><p></p></li>
            <li><p>Total:</p><p id="total">$0.00</p></li>
        `;
        placeOrderBtn.disabled = true;
        placeOrderBtn.style.opacity = "0.5";
    } else {
        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `<p class="item-name">${item.name}</p><p class="item-price">$${item.price.toFixed(2)}</p>`;
            billingOrder.appendChild(li);
            subtotal += item.price;
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`;
        placeOrderBtn.disabled = true; 
        placeOrderBtn.style.opacity = "0.5";
    }

    const savedInfo = JSON.parse(localStorage.getItem("billingInfo"));
    if (savedInfo) {
        checkoutForm.firstname.value = savedInfo.firstName;
        checkoutForm.lastname.value = savedInfo.lastName;
        checkoutForm.address.value = savedInfo.address;
        checkoutForm.city.value = savedInfo.city;
        checkoutForm.phone.value = savedInfo.phone;
        checkoutForm.email.value = savedInfo.email;
        document.getElementById("save-info").checked = true;
    }

    checkoutForm.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", validateForm);
    });

    placeOrderBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const firstName = checkoutForm.firstname.value.trim();
        const lastName = checkoutForm.lastname.value.trim();
        const address = checkoutForm.address.value.trim();
        const city = checkoutForm.city.value.trim();
        const phone = checkoutForm.phone.value.trim();
        const email = checkoutForm.email.value.trim();
        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;

        if (!firstName || !lastName || !address || !city || !phone || !email || !paymentMethod) {
            alert("Please fill in all required fields and select a payment method.");
            return;
        }

        let orderNumber = localStorage.getItem("orderNumber");
        if (!orderNumber) {
            orderNumber = "HS-" + Math.floor(100000 + Math.random() * 900000);
            localStorage.setItem("orderNumber", orderNumber);
        }

        if (document.getElementById("save-info").checked) {
            const billingInfo = { firstName, lastName, address, city, phone, email };
            localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
        }

        const orderDetails = {
            orderNumber, 
            customerInfo: { firstName, lastName, address, city, phone, email },
            items: cartItems,
            subtotal,
            shipping: "Free",
            total: subtotal,
            paymentMethod
        };

        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
        console.log("Order placed:", orderDetails);
        alert("Your order has been placed successfully!");

        localStorage.removeItem("cart");
        window.location.href = "order-confirmation.html";
    });
    
    validateForm();
});
