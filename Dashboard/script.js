document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const productItems = document.querySelectorAll('section ul li'); // Select all product items

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            const category = this.getAttribute('data-category'); // Get the category from the clicked link

            // Loop through all product items
            productItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category'); // Get the category of the product item

                // Show or hide items based on the selected category
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block'; // Show the item
                } else {
                    item.style.display = 'none'; // Hide the item
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cartButtons = document.querySelectorAll('.cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('li');
            const productId = product.getAttribute('data-id');
            const productName = product.querySelector('h4').innerText;
            const productPrice = product.querySelector('.price').innerText;
            const productImage = product.querySelector('img').src;

            const cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector(".search-bar input");
    const productItems = document.querySelectorAll("li[data-category]");

    searchInput.addEventListener("keyup", function() {
        const searchText = searchInput.value.toLowerCase();

        productItems.forEach(item => {
            const productName = item.querySelector("h4").textContent.toLowerCase();

            if (productName.includes(searchText)) {
                item.style.display = "block"; // Show matching items
            } else {
                item.style.display = "none"; // Hide non-matching items
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.querySelector(".icons i"); // Cart icon
    const cartCountDisplay = document.getElementById("cart-count"); // Cart count span
    let cartCount = 0;
    const cart = {}; // Object to store products {id: {name, price, quantity}}

    // Select all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const productItem = this.closest("li");
            const productId = productItem.getAttribute("data-id");
            const productName = productItem.querySelector("h4").textContent;
            const productPrice = productItem.querySelector(".price").textContent;

            // If product already exists in cart, increase quantity
            if (cart[productId]) {
                cart[productId].quantity += 1;
            } else {
                cart[productId] = {
                    name: productName,
                    price: productPrice,
                    quantity: 1
                };
            }

            // Update cart count
            cartCount++;
            updateCartIcon();
        });
    });

    function updateCartIcon() {
        cartCountDisplay.textContent = cartCount;
        cartCountDisplay.style.display = cartCount > 0 ? "inline-block" : "none"; // Show only if > 0
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const userProfile = document.querySelector('.user-profile');
    const logoutDropdown = document.getElementById('logout-dropdown');

    userProfile.addEventListener('click', function(e) {
        e.stopPropagation();
        logoutDropdown.style.display = logoutDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(e) {
        if (!userProfile.contains(e.target)) {
            logoutDropdown.style.display = 'none';
        }
    });

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function() {
        alert('Logging out...');
        window.location.href = '../login-and-signup/login.html';
    });
});