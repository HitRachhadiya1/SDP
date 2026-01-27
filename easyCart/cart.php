<?php
require_once "includes/header.php";
require_once "data/products.php";

// Initialize cart if not exists (session is already started by header.php)
if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = [];
}

// Handle cart actions
if (isset($_POST['action'])) {
  $productId = $_POST['product_id'] ?? '';

  switch ($_POST['action']) {
    case 'update_quantity':
      if (isset($_SESSION['cart'][$productId])) {
        $currentQuantity = $_SESSION['cart'][$productId]['quantity'];
        $change = isset($_POST['change']) ? intval($_POST['change']) : 0;
        if ($change !== 0) {
          $quantity = max(1, min(10, $currentQuantity + $change));
        } else {
          $quantity = max(1, intval($_POST['quantity'] ?? 1));
        }
        $_SESSION['cart'][$productId]['quantity'] = $quantity;
      }
      break;

    case 'remove':
      if (isset($_SESSION['cart'][$productId])) {
        unset($_SESSION['cart'][$productId]);
      }
      break;

    case 'clear':
      $_SESSION['cart'] = [];
      break;
  }

  // Redirect to avoid form resubmission
  // header("Location: cart.php");
  // exit;
}

// Calculate cart totals
$subtotal = 0;
$total_quantity = 0;
$shipping_rate = 20.00; // Shipping cost per item
$taxRate = 0.1015; // 10.15% tax rate

foreach ($_SESSION['cart'] as $productId => $cartItem) {
  $total_quantity += $cartItem['quantity'];
  if (isset($products[$productId])) {
    $subtotal += $products[$productId]['price'] * $cartItem['quantity'];
  }
}

$shipping = $shipping_rate * $total_quantity;

$tax = $subtotal * $taxRate;
$total = $subtotal + $shipping + $tax;
?>

<main>
  <div class="container">
    <h1 class="page-title">Shopping Cart</h1>

    <?php if (empty($_SESSION['cart'])): ?>
      <div style="text-align: center; padding: 3rem;">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <a href="productListing.php" class="btn btn-primary" style="margin-top: 1rem;">Continue Shopping</a>
      </div>
    <?php else: ?>

      <div class="cart-layout">
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
                <tr>
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
                    <div class="quantity-group">
                      <form method="post" action="cart.php" style="display: contents;">
                        <input type="hidden" name="action" value="update_quantity">
                        <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                        <button type="submit" name="change" value="-1" class="quantity-btn">-</button>
                        <input
                          type="number"
                          name="quantity"
                          value="<?php echo $cartItem['quantity']; ?>"
                          min="1"
                          max="10"
                          class="quantity-input"
                          />
                        <button type="submit" name="change" value="1" class="quantity-btn">+</button>
                        <!-- <button type="submit" class="btn btn-secondary" style="margin-left: 0.5rem;">Update</button> -->
                      </form>
                    </div>
                  </td>
                  <td>
                    <p class="price">₹<?php echo number_format($itemTotal, 2); ?></p>
                  </td>
                  <td>
                    <form method="post" action="cart.php" style="display: inline;">
                      <input type="hidden" name="action" value="remove">
                      <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                      <button type="submit" class="btn btn-danger"
                        onclick="return confirm('Remove this item from cart?')">
                        Remove
                      </button>
                    </form>
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
            <dd>₹<?php echo number_format($subtotal, 2); ?></dd>

            <dt>Shipping:</dt>
            <dd>₹<?php echo number_format($shipping, 2); ?></dd>

            <dt>Tax:</dt>
            <dd>₹<?php echo number_format($tax, 2); ?></dd>

            <dt>Total:</dt>
            <dd>₹<?php echo number_format($total, 2); ?></dd>
          </dl>

          <div class="cart-actions">
            <a href="productListing.php" class="btn btn-secondary">Continue Shopping</a>
            <a href="checkout.php" class="btn btn-primary">Proceed to Checkout</a>
          </div>

          <div style="margin-top: 1rem;">
            <form method="post" action="cart.php" style="display: inline;">
              <input type="hidden" name="action" value="clear">
              <button type="submit" class="btn btn-danger" onclick="return confirm('Clear entire cart?')">
                Clear Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    <?php endif; ?>
  </div>
</main>

<?php require_once "includes/footer.php"; ?>