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
document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".cart-btn");
    const cartIcon = document.querySelector(".bxs-cart-alt");
    const cartCount = document.getElementById("cart-count");

    console.log(cartCount);

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCount.textContent = totalQuantity;
    }

    cartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const item = event.target.closest("li");
            const productId = item.getAttribute("data-id");
            const productName = item.querySelector("h4").textContent;
            const productImage = item.querySelector("img").src;
            const productPrice = item.querySelector(".price").textContent;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProduct = cart.find(p => p.id === productId);
            if (existingProduct) {
                existingProduct.quantity = (existingProduct.quantity || 0) + 1;
                cart.push({
                    id: productId,
                    name: productName,
                    image: productImage,
                    price: productPrice,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            animateImageToCart(item.querySelector("img"), cartIcon);
        });
    });

    function animateImageToCart(imageElement, cartIcon) {
        const imageClone = imageElement.cloneNode(true);
        const cartRect = cartIcon.getBoundingClientRect();
        const imgRect = imageElement.getBoundingClientRect();

        imageClone.style.position = "fixed";
        imageClone.style.zIndex = "1000";
        imageClone.style.width = "50px";
        imageClone.style.opacity = "0.8";
        imageClone.style.top = `${imgRect.top}px`;
        imageClone.style.left = `${imgRect.left}px`;
        imageClone.style.transition = "all 0.8s ease-in-out";

        document.body.appendChild(imageClone);

        setTimeout(() => {
            imageClone.style.top = `${cartRect.top}px`;
            imageClone.style.left = `${cartRect.left}px`;
            imageClone.style.transform = "scale(0)";
            imageClone.style.opacity = "0";
        }, 100);

        setTimeout(() => {
            document.body.removeChild(imageClone);
        }, 900);
    }
    updateCartCount();
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