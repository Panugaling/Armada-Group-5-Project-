document.addEventListener('DOMContentLoaded', function () {

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    const orderNumberElement = document.querySelector(".order-number");
    const orderSummaryContainer = document.getElementById("order-summary");
    const printButton = document.querySelector(".cart-btn");

    if (orderDetails) {
        
        let orderNumber = localStorage.getItem("orderNumber");
        if (!orderNumber) {
            orderNumber = "HS-" + Math.floor(100000 + Math.random() * 900000);
            localStorage.setItem("orderNumber", orderNumber);
        }
        orderNumberElement.textContent = orderNumber;

        document.getElementById("billing-name").textContent = `${orderDetails.customerInfo.firstName} ${orderDetails.customerInfo.lastName}`;
        document.getElementById("billing-address").textContent = `${orderDetails.customerInfo.address}, ${orderDetails.customerInfo.city}`;
        document.getElementById("billing-phone").textContent = orderDetails.customerInfo.phone;
        document.getElementById("billing-email").textContent = orderDetails.customerInfo.email;
        document.getElementById("payment-method").textContent = orderDetails.paymentMethod;
        document.getElementById("total-price").textContent = `₱${orderDetails.total}`;

        const itemsContainer = document.getElementById("order-items");
        orderDetails.items.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₱${item.price.toFixed(2)}</td>
            `;
            itemsContainer.appendChild(row);
        });

        localStorage.removeItem("orderDetails");
    } else {
        orderSummaryContainer.innerHTML = "<p>No order details found.</p>";
    }

    if (printButton) {
        printButton.addEventListener('click', function () {
            window.print();
        });
    }

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
});
