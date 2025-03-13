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
document.addEventListener("DOMContentLoaded", function () {
    const addToCartButton = document.querySelector(".add-to-cart");

    if (addToCartButton) {
        addToCartButton.addEventListener("click", function () {
            console.log("✅ Add to Cart button clicked!");

            // Get the main product details
            let productNameElement = document.getElementById("productName");
            let productPriceElement = document.querySelector(".costAndrating h4"); // Price from UI
            let mainProductElement = document.querySelector(".purchase-info"); // Button parent

            // Get the correct price from the clicked similar item
            let selectedButton = document.querySelector(".similar-item-selected"); // Add class when clicked
            let productName = productNameElement ? productNameElement.textContent.trim() : "Arcadia Lounge Chair";
            let productPrice = selectedButton
                ? parseFloat(selectedButton.getAttribute("data-price"))
                : productPriceElement
                ? parseFloat(productPriceElement.textContent.replace("$", "").trim())
                : 10.00; // Default price

            let mainImageElement = document.getElementById("mainProductImage");
            let mainImageSrc = mainImageElement ? mainImageElement.src : "images/default_arcadia_lounge_chair.png"; // Default image

            // Default quantity to 1
            let productQuantity = 1;

            // Retrieve current cart data or initialize an empty cart
            let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

            // Check if the product is already in the cart
            let existingProduct = cart.find(item => item.name === productName);

            if (existingProduct) {
                existingProduct.quantity += productQuantity;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: productQuantity, image: mainImageSrc });
            }

            // Store updated cart in localStorage
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
            console.log("🛒 Cart updated:", cart);

            alert(`${productName} added to cart for $${productPrice}!`);
        });
    } else {
        console.error("❌ Add to Cart button not found in the DOM.");
    }
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

    function openModal(imageSrc) {
        const modal = document.getElementById("imageModal");
        const modalImage = document.getElementById("modalImage");
    
        modalImage.src = imageSrc; // Set image source
        modal.style.display = "flex"; 
        document.body.classList.add("modal-open"); // Disable scrolling on body
    
        // Allow transition effect
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
    }
    
    function closeModal() {
        const modal = document.getElementById("imageModal");
    
        modal.classList.remove("show"); // Remove zoom effect
    
        // Delay hiding modal to allow animation
        setTimeout(() => {
            modal.style.display = "none";
            document.body.classList.remove("modal-open"); // Enable scrolling again
        }, 300);
    }

    function updateProduct(buttonElement) {
    // Get the main product elements
    let mainImageElement = document.getElementById("mainProductImage");
    let mainNameElement = document.getElementById("productName");
    let mainRatingElement = document.getElementById("productRating");
    let mainDescriptionElement = document.getElementById("productDescription");

    // Get the current images in the angle section
    let angleImages = document.querySelectorAll(".imagesAngle img");

    // Get the clicked similar item details
    let clickedImageElement = buttonElement.querySelector("img");
    let newImageSrc = clickedImageElement.src;
    let newName = buttonElement.getAttribute("data-name");
    let newRating = buttonElement.getAttribute("data-rating");
    let newDescription = buttonElement.getAttribute("data-description");
    let newAngles = [
        buttonElement.getAttribute("data-angle1"),
        buttonElement.getAttribute("data-angle2"),
        buttonElement.getAttribute("data-angle3")
    ];

    // Store current main product details
    let oldImageSrc = mainImageElement.src;
    let oldName = mainNameElement.textContent;
    let oldRating = mainRatingElement.textContent;
    let oldDescription = mainDescriptionElement.textContent;
    let oldAngles = [...angleImages].map(img => img.src);

    // Remove any previous special styles
    mainImageElement.classList.remove("first-item-active", "second-item-active", "third-item-active", "fourth-item-active");

    // Check if the clicked item is a special one
    if (newImageSrc.includes("1st_similaritem.png")) {
        mainImageElement.classList.add("first-item-active");
    } else if (newImageSrc.includes("2nd_similaritem-removebg.png")) {
        mainImageElement.classList.add("second-item-active");
    } else if (newImageSrc.includes("3rd_similaritem-removebg.png")) {
        mainImageElement.classList.add("third-item-active");
    } else if (newImageSrc.includes("4th_similaritem-removebg.png")) {
        mainImageElement.classList.add("fourth-item-active");
    }
    // Swap main product with clicked similar item
    mainImageElement.src = newImageSrc;
    mainNameElement.textContent = newName;
    mainRatingElement.textContent = newRating;
    mainDescriptionElement.textContent = newDescription;

    // Update the angle images
    angleImages.forEach((img, index) => {
        img.src = newAngles[index];
    });

    // Swap the similar item image back to the original main product image
    clickedImageElement.src = oldImageSrc;

    // Update button attributes so it can swap back
    buttonElement.setAttribute("data-name", oldName);
    buttonElement.setAttribute("data-rating", oldRating);
    buttonElement.setAttribute("data-description", oldDescription);
    buttonElement.setAttribute("data-angle1", oldAngles[0]);
    buttonElement.setAttribute("data-angle2", oldAngles[1]);
    buttonElement.setAttribute("data-angle3", oldAngles[2]);
}

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
        window.location.href = '/login'; 
    });
});
    
document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cartIcon");

    cartIcon.addEventListener("click", function () {
        window.location.href = "/Cart/Cart.html"; // Change the path if needed
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar input");
    const searchIcon = document.querySelector(".bx-search-alt-2");

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `/SearchResults.html?query=${encodeURIComponent(query)}`;
        }
    }

    // Trigger search when clicking the icon
    searchIcon.addEventListener("click", performSearch);

    // Trigger search when pressing "Enter"
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            performSearch();
        }
    });
});

    
