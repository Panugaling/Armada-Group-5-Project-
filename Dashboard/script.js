document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    const itemList = document.querySelectorAll('.item-list li');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');

            itemList.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    const cartIcon = document.querySelector('.bxs-cart-alt');
    const addToCartButtons = document.querySelectorAll('.cart-btn');

    function handleAddToCart(e) {
        e.preventDefault();

        let currentQuantity = parseInt(cartIcon.getAttribute('data-quantity'));

        currentQuantity += 1;

        cartIcon.setAttribute('data-quantity', currentQuantity);
    }

    addToCartButtons.forEach(button => {
        button.removeEventListener('click', handleAddToCart);
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const productItems = document.querySelectorAll('.item-list li');
    const noResultsMessage = document.createElement('div');
    noResultsMessage.textContent = 'No results found';
    noResultsMessage.style.display = 'none';
    noResultsMessage.classList.add('no-results');
    document.querySelector('.item-list').appendChild(noResultsMessage);


    searchInput.addEventListener('input', function() {
        const searchQuery = this.value.trim().toLowerCase();
        let hasResults = false;


        productItems.forEach(item => {
            const productName = item.querySelector('h4').textContent.toLowerCase();

            if (productName.includes(searchQuery)) {
                item.style.display = 'block';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });

        if (hasResults) {
            noResultsMessage.style.display = 'none';
        } else {
            noResultsMessage.style.display = 'block';
        }
    });
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

document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".cart-btn");
    const cartIcon = document.querySelector(".bxs-cart-alt");

    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const item = event.target.closest("li"); // Get the nearest product item
            const productId = item.getAttribute("data-id");
            const productName = item.querySelector("h4").textContent;
            const productImage = item.querySelector("img").src;
            const productPrice = item.querySelector(".price").textContent;

            const product = {
                id: productId,
                name: productName,
                image: productImage,
                price: productPrice,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if item is already in the cart
            const existingProduct = cart.find(p => p.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1; // Increase quantity
            } else {
                cart.push(product); // Add new item
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            // Call function to animate the image
            animateImageToCart(item.querySelector("img"), cartIcon);
        });
    });

    function animateImageToCart(imageElement, cartIcon) {
        const imageClone = imageElement.cloneNode(true);
        const cartRect = cartIcon.getBoundingClientRect();
        const imgRect = imageElement.getBoundingClientRect();

        imageClone.style.position = "fixed";
        imageClone.style.zIndex = "1000";
        imageClone.style.width = "50px"; // Make it smaller while flying
        imageClone.style.opacity = "0.8";
        imageClone.style.top = `${imgRect.top}px`;
        imageClone.style.left = `${imgRect.left}px`;
        imageClone.style.transition = "all 0.8s ease-in-out";

        document.body.appendChild(imageClone);

        setTimeout(() => {
            imageClone.style.top = `${cartRect.top}px`;
            imageClone.style.left = `${cartRect.left}px`;
            imageClone.style.transform = "scale(0)"; // Shrink effect
            imageClone.style.opacity = "0";
        }, 100);

        setTimeout(() => {
            document.body.removeChild(imageClone);
        }, 900);
    }
});