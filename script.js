// Sample login credentials
const validUsername = "admin";
const validPassword = "password123"; // Min 8 characters
let loginAttempts = 0; // Track failed attempts

// Login Validation
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            if (username === validUsername && password === validPassword) {
                alert("Login Successful!");
                window.location.href = "products.html";
            } else {
                loginAttempts++;
                document.getElementById("errorMessage").innerText = 
                    `Invalid credentials! Attempts left: ${3 - loginAttempts}`;

                if (loginAttempts >= 3) {
                    alert("Too many failed attempts! Redirecting to error page.");
                    window.location.href = "error.html";
                }
            }
        });
    }
});

// Cart Functionality
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve existing cart

// Function to add products to cart
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart data
    alert(`${productName} added to cart!`);
}

// Checkout function - Redirects to invoice page
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add products before checkout.");
        return;
    }
    window.location.href = "invoice.html";
}

// Clear cart function
function cancelCart() {
    cart = [];
    localStorage.removeItem("cart");
    alert("Cart cleared!");
}

// Ensure event listeners are added when the document loads
document.addEventListener("DOMContentLoaded", function () {
    const checkoutBtn = document.getElementById("checkoutBtn");
    const clearCartBtn = document.getElementById("clearCartBtn");

    if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);
    if (clearCartBtn) clearCartBtn.addEventListener("click", cancelCart);
});

// Invoice Page - Generate Invoice
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("invoice.html")) {
        let invoiceDetails = document.getElementById("invoiceDetails");
        let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        if (cartItems.length === 0) {
            invoiceDetails.innerHTML = "<p>No items in cart.</p>";
            return;
        }

        let subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
        let tax = subtotal * 0.15; // 15% tax
        let total = subtotal + tax;

        invoiceDetails.innerHTML = `
            <ul>
                ${cartItems.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
            </ul>
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>Tax (15%): $${tax.toFixed(2)}</p>
            <p><strong>Total: $${total.toFixed(2)}</strong></p>
        `;
    }
});
