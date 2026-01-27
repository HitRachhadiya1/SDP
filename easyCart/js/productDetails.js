// Product Details Page JavaScript
// Contains functionality specific to the product details page

document.addEventListener("DOMContentLoaded", function () {
  console.log("Product details page JavaScript loaded");

  // Initialize quantity syncing
  initializeQuantitySync();

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
