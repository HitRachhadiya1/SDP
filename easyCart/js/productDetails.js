// Product Details Page JavaScript
// Contains functionality specific to the product details page

document.addEventListener("DOMContentLoaded", function () {
  console.log("Product details page JavaScript loaded");

  // Initialize quantity syncing
  initializeQuantitySync();

  // Initialize add-to-cart AJAX
  initializeCartForm();

  // Initialize image gallery
  initializeImageGallery();
});

function changeQty(amount) {
  const input = document.getElementById("quantity");
  let value = parseInt(input.value) || 1;
  value += amount;
  if (value < 1) value = 1;
  if (value > 10) value = 10;
  input.value = value;
}

// Sync quantity inputs between visible input and hidden form field
function initializeQuantitySync() {
  const quantityInput = document.getElementById("quantity");
  const cartQuantityInput = document.getElementById("cart_quantity");

  if (quantityInput && cartQuantityInput) {
    // Sync on input change
    quantityInput.addEventListener("input", function () {
      cartQuantityInput.value = this.value;
    });

    // Sync when +/- buttons are clicked
    const quantityButtons = document.querySelectorAll(".quantity-btn");
    quantityButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        setTimeout(() => {
          cartQuantityInput.value = quantityInput.value;
        }, 10);
      });
    });
  }
}

// Image gallery functionality
function initializeImageGallery() {
  // Gallery functionality is handled by the switchProductImage function
  // called from onclick handlers in the HTML
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

function initializeCartForm() {
  const form = document.getElementById("add-to-cart-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const quantity = formData.get("quantity");
    const productId = new URLSearchParams(window.location.search).get(
      "product",
    );
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
        const updateButton = form.querySelector("[name='add_to_cart']");
        if (updateButton) {
          updateButton.textContent = "Update Quantity";
          updateButton.setAttribute("name", "update_cart");
        }
      }
    });
  });
}

// Switch the main product image when a thumbnail is clicked
function switchProductImage(thumbnail) {
  const mainImage = document.getElementById("main-product-image");
  const fullImageSrc = thumbnail.getAttribute("data-full-image");

  if (mainImage && fullImageSrc) {
    // Update main image source
    mainImage.src = fullImageSrc;

    // Update active thumbnail
    document.querySelectorAll(".thumbnail-image").forEach((thumb) => {
      thumb.classList.remove("active");
    });
    thumbnail.classList.add("active");
  }
}
