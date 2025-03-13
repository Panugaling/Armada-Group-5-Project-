document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function groupCartItems(cart) {
        let groupedCart = {};

        cart.forEach(item => {
            if (groupedCart[item.name]) {
                groupedCart[item.name].quantity += item.quantity || 1;
            } else {
                groupedCart[item.name] = {...item, quantity: item.quantity || 1 };
            }
        });

        return Object.values(groupedCart);
    }

    function renderCartItems() {
        cart = groupCartItems(cart);
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                </td>
                <td>${item.price}</td>
                <td>
                    <button class="qty-btn" onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
                </td>
                <td>$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" onclick="removeItem(${index})">X</button></td>
            `;
            cartItemsContainer.appendChild(row);

            totalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
        });

        totalPriceElement.textContent = cart.length ? `$${totalPrice.toFixed(2)}` : "$0.00";
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    window.increaseQuantity = function(index) {
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    };

    window.decreaseQuantity = function(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    };
    window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    };
    renderCartItems();
});