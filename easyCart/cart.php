<?php
require_once "includes/header.php";
require_once "data/products.php";

// Initialize cart if not exists (session is already started by header.php)
if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = [];
}

// if (isset($_POST['action'])) {
//   $productId = $_POST['product_id'] ?? '';
 
//   switch ($_POST['action']) {
//     case 'update_quantity':
//       if (isset($_SESSION['cart'][$productId])) {
//         $currentQuantity = $_SESSION['cart'][$productId]['quantity'];
//         $change = isset($_POST['change']) ? intval($_POST['change']) : 0;
//         if ($change !== 0) {
//           $quantity = max(1, min(10, $currentQuantity + $change));
//         } else {
//           $quantity = max(1, intval($_POST['quantity'] ?? 1));
//         }
//         $_SESSION['cart'][$productId]['quantity'] = $quantity;
//       }
//       break;
 
//     case 'remove':
//       if (isset($_SESSION['cart'][$productId])) {
//         unset($_SESSION['cart'][$productId]);
//       }
//       break;
 
//     case 'clear':
//       $_SESSION['cart'] = [];
//       break;
//   }
 
//   // Redirect to avoid form resubmission
//   // header("Location: cart.php");
//   // exit;
// }

// Calculate cart totals
$subtotal = 0;
$total_quantity = 0;
$shipping_rate = 20.00; // Shipping cost per item
$taxRate = 0.18; // 18% tax rate

foreach ($_SESSION['cart'] as $productId => $cartItem) {
  $total_quantity += $cartItem['quantity'];
  if (isset($products[$productId])) {
    $subtotal += $products[$productId]['price'] * $cartItem['quantity'];
  }
}

$shipping = $shipping_rate * $total_quantity;

$tax = ($subtotal + $shipping) * $taxRate;
$total = $subtotal + $shipping + $tax;
?>

<main>
  <div class="container">
    <h1 class="page-title">Shopping Cart</h1>

    <div id="cart-empty-state" style="text-align: center; padding: 3rem; <?php echo empty($_SESSION['cart']) ? '' : 'display: none;'; ?>">
      <h2>Your cart is empty</h2>
      <p>Add some products to get started!</p>
      <a href="productListing.php" class="btn btn-primary" style="margin-top: 1rem;">Continue Shopping</a>
    </div>

    <?php if (!empty($_SESSION['cart'])): ?>
      <div class="cart-layout" id="cart-layout">
        <!-- Cart Items -->
        <div class="cart-items">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($_SESSION['cart'] as $productId => $cartItem):
                // if (!isset($products[$productId])) continue;
                $product = $products[$productId];
                $itemTotal = $product['price'] * $cartItem['quantity'];
                $image150 = str_replace('_300.png', '_150.png', $product['image']);
              ?>
                <tr data-product-id="<?php echo $productId; ?>" data-product-price="<?php echo $product['price']; ?>">
                  <td>
                    <div class="cart-product">
                      <img
                        src="<?php echo $image150; ?>"
                        alt="<?php echo $product['name']; ?>" />
                      <div class="cart-product-info">
                        <h3><?php echo $product['name']; ?></h3>
                        <p><?php echo $product['description']; ?></p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="price">₹<?php echo number_format($product['price'], 2); ?></p>
                  </td>
                  <td>
                    <div class="quantity-group" data-product-id="<?php echo $productId; ?>">
                      <button type="button" class="quantity-btn" data-change="-1">-</button>
                      <input
                        type="number"
                        name="quantity"
                        value="<?php echo $cartItem['quantity']; ?>"
                        min="1"
                        max="10"
                        class="quantity-input"
                        />
                      <button type="button" class="quantity-btn" data-change="1">+</button>
                    </div>
                  </td>
                  <td>
                    <p class="price" data-item-total>₹<?php echo number_format($itemTotal, 2); ?></p>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger cart-remove-btn" data-product-id="<?php echo $productId; ?>">
                      Remove
                    </button>
                  </td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <h2>Cart Summary</h2>

          <dl>
            <dt>Subtotal:</dt>
            <dd id="cart-summary-subtotal">₹<?php echo number_format($subtotal, 2); ?></dd>

            <dt>Shipping:</dt>
            <dd id="cart-summary-shipping">₹<?php echo number_format($shipping, 2); ?></dd>

            <dt>Tax:</dt>
            <dd id="cart-summary-tax">₹<?php echo number_format($tax, 2); ?></dd>

            <dt>Total:</dt>
            <dd id="cart-summary-total">₹<?php echo number_format($total, 2); ?></dd>
          </dl>

          <div class="cart-actions">
            <a href="productListing.php" class="btn btn-secondary">Continue Shopping</a>
            <a href="checkout.php" class="btn btn-primary">Proceed to Checkout</a>
          </div>

          <div style="margin-top: 1rem;">
            <button type="button" class="btn btn-danger cart-clear-btn">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    <?php endif; ?>
  </div>
</main>

<script src="js/cart.js"></script>

<?php require_once "includes/footer.php"; ?>