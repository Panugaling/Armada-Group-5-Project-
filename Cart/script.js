document.addEventListener("DOMContentLoaded", () => {
    const cartTableBody = document.querySelector("tbody");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartTableBody.innerHTML = "";

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="item-info">
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                </td>
                <td>${item.price}</td>
                <td>
                    <button class="qty-btn decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn increase" data-index="${index}">+</button>
                </td>
                <td>$${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}</td>
                <td><button class="remove-btn" data-index="${index}">X</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        updateTotal();
    }

    function updateTotal() {
        const totalPriceElement = document.querySelector(".cart-total strong");
        const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace("$", "")) * item.quantity), 0);
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    cartTableBody.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        if (event.target.classList.contains("increase")) {
            cart[index].quantity += 1;
        } else if (event.target.classList.contains("decrease") && cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else if (event.target.classList.contains("remove-btn")) {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    });

    renderCart();
});