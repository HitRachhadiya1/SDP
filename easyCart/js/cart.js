// Shopping Cart Page JavaScript
// Contains functionality specific to the shopping cart page

document.addEventListener("DOMContentLoaded", function () {
  console.log("Shopping cart page JavaScript loaded");
  initializeCartAjaxHandlers();
});

function postCart(data) {
  return fetch("cart_api.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(data),
  }).then((res) => res.json());
}

function updateSummary(totals) {
  const subtotalEl = document.getElementById("cart-summary-subtotal");
  const shippingEl = document.getElementById("cart-summary-shipping");
  const taxEl = document.getElementById("cart-summary-tax");
  const totalEl = document.getElementById("cart-summary-total");
  if (!subtotalEl || !shippingEl || !taxEl || !totalEl) return;

  subtotalEl.textContent = formatCurrency(totals.subtotal);
  shippingEl.textContent = formatCurrency(totals.shipping);
  taxEl.textContent = formatCurrency(totals.tax);
  totalEl.textContent = formatCurrency(totals.total);
}

function updateCartBadge(count) {
  const badge = document.querySelector(".cart-badge");
  if (badge) badge.textContent = count;
}

function formatCurrency(value) {
  return `₹${Number(value || 0).toFixed(2)}`;
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

function toggleEmptyState(hasItems) {
  const emptyState = document.getElementById("cart-empty-state");
  const cartLayout = document.getElementById("cart-layout");
  if (emptyState) emptyState.style.display = hasItems ? "none" : "block";
  if (cartLayout) cartLayout.style.display = hasItems ? "flex" : "none";
}

function initializeCartAjaxHandlers() {
  document.querySelectorAll(".quantity-group").forEach((group) => {
    const productId = group.dataset.productId;
    const input = group.querySelector(".quantity-input");
    const buttons = group.querySelectorAll(".quantity-btn");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const change = parseInt(button.dataset.change || "0", 10);
        const currentQuantity = parseInt(input?.value || "1", 10);
        const nextQuantity = Math.max(
          1,
          Math.min(10, currentQuantity + change),
        );
        if (input) input.value = nextQuantity;

        postCart({ action: "change", product_id: productId, change }).then(
          (data) => {
            if (!data.success) return;
            updateRowTotals(group, data);
          },
        );
      });
    });

    if (input) {
      input.addEventListener("change", () => {
        const quantity = parseInt(input.value || "1", 10);
        const safeQuantity = Math.max(1, Math.min(10, quantity));
        input.value = safeQuantity;
        postCart({
          action: "update",
          product_id: productId,
          quantity: safeQuantity,
        }).then((data) => {
          if (!data.success) return;
          updateRowTotals(group, data);
        });
      });
    }
  });

  document.querySelectorAll(".cart-remove-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      postCart({ action: "remove", product_id: productId }).then((data) => {
        if (!data.success) return;
        const row = button.closest("tr");
        if (row) row.remove();
        updateSummary(data.totals);
        updateCartBadge(data.cart_count);
        showToast(data.message || "Item removed.");
        toggleEmptyState(data.cart_count > 0);
      });
    });
  });

  const clearButton = document.querySelector(".cart-clear-btn");
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      postCart({ action: "clear" }).then((data) => {
        if (!data.success) return;
        document
          .querySelectorAll("tbody tr[data-product-id]")
          .forEach((row) => row.remove());
        updateSummary(data.totals);
        updateCartBadge(data.cart_count);
        showToast(data.message || "Cart cleared.");
        toggleEmptyState(false);
      });
    });
  }
}

function updateRowTotals(group, data) {
  const row = group.closest("tr");
  if (row && data.item_quantity !== null) {
    const quantityInput = row.querySelector(".quantity-input");
    if (quantityInput) quantityInput.value = data.item_quantity;
    const itemTotalEl = row.querySelector("[data-item-total]");
    if (itemTotalEl) itemTotalEl.textContent = formatCurrency(data.item_total);
  }
  updateSummary(data.totals);
  updateCartBadge(data.cart_count);
  showToast(data.message || "Cart updated.");
}
