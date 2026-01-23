// Shopping Cart Page JavaScript
// Contains functionality specific to the shopping cart page

document.addEventListener("DOMContentLoaded", function () {
  console.log("Shopping cart page JavaScript loaded");

  // Initialize quantity controls
  initializeCartQuantityControls();
});

// Handle quantity update for cart page
function updateQuantity(button, change) {
  const input = button.parentElement.querySelector(".quantity-input");
  const currentValue = parseInt(input.value);
  const newValue = Math.max(1, Math.min(10, currentValue + change));
  input.value = newValue;
  input.form.submit();
}

// Initialize cart-specific functionality
function initializeCartQuantityControls() {
  // The updateQuantity function is called from HTML onclick handlers
  // No additional initialization needed
}
