// Product Listing Page JavaScript
// Contains functionality specific to the product listing page

document.addEventListener("DOMContentLoaded", function () {
  console.log("Product listing page JavaScript loaded");

  // Initialize quantity controls
  initializeQuantityControls();
});

// Handle quantity change for product listing page
function changeQuantity(button, change) {
  const input = button.parentElement.querySelector(".quantity-input");
  const currentValue = parseInt(input.value);
  const newValue = Math.max(1, Math.min(10, currentValue + change));
  input.value = newValue;
}

// Initialize quantity controls for all product cards
function initializeQuantityControls() {
  // This is handled by the changeQuantity function called from HTML onclick
  // No additional initialization needed as the onclick handlers are inline
}
