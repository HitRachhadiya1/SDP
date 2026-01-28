// Product Listing Page JavaScript
// Contains functionality specific to the product listing page

document.addEventListener("DOMContentLoaded", function () {
  console.log("Product listing page JavaScript loaded");

  // Initialize quantity controls
  initializeQuantityControls();
  initializeCartForms();
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

function postCart(data) {
  return fetch("cart_api.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  }).then((res) => res.json());
}

function updateCartBadge(count) {
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.textContent = count;
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 200);
  }, 2500);
}

function initializeCartForms() {
  document.querySelectorAll(".product-cart-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const productId = formData.get("product_id");
      const quantity = formData.get("quantity");
      const isUpdate = form.querySelector("[name='update_cart']") !== null;

      postCart({
        action: isUpdate ? "update" : "add",
        product_id: productId,
        quantity: quantity,
      }).then((data) => {
        if (!data.success) return;
        updateCartBadge(data.cart_count);
        showToast(data.message || "Cart updated.");
        if (!isUpdate) {
          const updateButton = form.querySelector(".btn-update-cart");
          if (updateButton) return;
          const addButton = form.querySelector(".add-to-cart");
          if (addButton) {
            addButton.textContent = "Update Quantity";
            addButton.classList.add("btn-update-cart");
            addButton.setAttribute("name", "update_cart");
          }
          if (!form.querySelector(".link-view-cart")) {
            const viewLink = document.createElement("a");
            viewLink.href = "cart.php";
            viewLink.className = "view-cart link-view-cart";
            viewLink.textContent = "View Cart";
            form.appendChild(viewLink);
          }
        }
      });
    });
  });
}
