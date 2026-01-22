<?php
require_once "includes/header.php";
require_once "data/products.php";

// Check if cart is empty
if (empty($_SESSION['cart'])) {
  header("Location: cart.php");
  exit;
}

// Calculate cart totals
$subtotal = 0;
$taxRate = 0.1015; // 10.15% tax rate

foreach ($_SESSION['cart'] as $productId => $cartItem) {
  if (isset($products[$productId])) {
    $subtotal += $products[$productId]['price'] * $cartItem['quantity'];
  }
}

// Default shipping cost (standard shipping)
$shippingCost = 15.00;
$shippingMethod = 'standard';

// Handle form submission
$message = '';
$orderPlaced = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Validate required fields
  $required_fields = ['firstname', 'lastname', 'email', 'phone', 'address', 'city', 'zipcode', 'country', 'cardname', 'cardnumber', 'expiry', 'cvv'];
  $missing_fields = [];

  foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
      $missing_fields[] = $field;
    }
  }

  if (!isset($_POST['terms'])) {
    $missing_fields[] = 'terms';
  }

  if (empty($missing_fields)) {
    // Get shipping method
    $shippingMethod = $_POST['shipping'] ?? 'standard';
    switch ($shippingMethod) {
      case 'express':
        $shippingCost = 25.00;
        break;
      case 'overnight':
        $shippingCost = 40.00;
        break;
      default:
        $shippingCost = 15.00;
    }

    // Calculate final totals
    $tax = $subtotal * $taxRate;
    $total = $subtotal + $shippingCost + $tax;

    // Here you would typically save the order to a database
    // For now, we'll just clear the cart and show success message

    // Store order details in session for confirmation
    $_SESSION['last_order'] = [
      'items' => $_SESSION['cart'],
      'subtotal' => $subtotal,
      'shipping' => $shippingCost,
      'tax' => $tax,
      'total' => $total,
      'shipping_info' => [
        'firstname' => $_POST['firstname'],
        'lastname' => $_POST['lastname'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone'],
        'address' => $_POST['address'],
        'city' => $_POST['city'],
        'zipcode' => $_POST['zipcode'],
        'country' => $_POST['country']
      ],
      'order_date' => time()
    ];

    // Clear the cart
    $_SESSION['cart'] = [];

    $orderPlaced = true;
    $message = 'Order placed successfully!';

    // Redirect to avoid form resubmission
    header("Location: checkout.php?success=1");
    exit;
  } else {
    $message = 'Please fill in all required fields: ' . implode(', ', $missing_fields);
  }
}

// Calculate final totals for display
$tax = $subtotal * $taxRate;
$total = $subtotal + $shippingCost + $tax;
?>

<main>
  <div class="container">
    <h1 class="page-title">Checkout</h1>

    <?php if ($orderPlaced || isset($_GET['success'])): ?>
      <!-- Order Success Message -->
      <div style="text-align: center; padding: 3rem; background: var(--success-bg, #d4edda); border-radius: var(--border-radius-lg); border: 1px solid var(--success-border, #c3e6cb); margin-bottom: 2rem;">
        <h2 style="color: var(--success-color, #155724); margin-bottom: 1rem;">🎉 Order Placed Successfully!</h2>
        <p style="color: var(--success-color, #155724); margin-bottom: 2rem;">Thank you for your order. You will receive a confirmation email shortly.</p>
        <a href="productListing.php" class="btn btn-primary">Continue Shopping</a>
      </div>
    <?php else: ?>

      <?php if ($message): ?>
        <div style="background: var(--danger-bg, #f8d7da); color: var(--danger-color, #721c24); padding: 1rem; border-radius: var(--border-radius); margin-bottom: 2rem; border: 1px solid var(--danger-border, #f5c6cb);">
          <?php echo $message; ?>
        </div>
      <?php endif; ?>

      <div class="checkout-layout">
        <form method="post" action="checkout.php" class="checkout-form">
          <div class="checkout-section">
            <h2>Shipping Options</h2>

            <div class="shipping-options">
              <div class="shipping-option">
                <input
                  type="radio"
                  id="standard"
                  name="shipping"
                  value="standard"
                  checked />
                <label for="standard" class="shipping-option-info">
                  <strong>Standard Shipping</strong>
                  <span>5-7 business days</span>
                  <span class="shipping-option-price">₹15.00</span>
                </label>
              </div>

              <div class="shipping-option">
                <input
                  type="radio"
                  id="express"
                  name="shipping"
                  value="express" />
                <label for="express" class="shipping-option-info">
                  <strong>Express Shipping</strong>
                  <span>2-3 business days</span>
                  <span class="shipping-option-price">₹25.00</span>
                </label>
              </div>

              <div class="shipping-option">
                <input
                  type="radio"
                  id="overnight"
                  name="shipping"
                  value="overnight" />
                <label for="overnight" class="shipping-option-info">
                  <strong>Overnight Shipping</strong>
                  <span>1 business day</span>
                  <span class="shipping-option-price">₹40.00</span>
                </label>
              </div>
            </div>
          </div>

          <div class="checkout-section">
            <h2>Shipping Information</h2>

            <div class="form-row">
              <div class="form-group">
                <label for="firstname">First Name</label>
                <input type="text" id="firstname" name="firstname" required />
              </div>
              <div class="form-group">
                <label for="lastname">Last Name</label>
                <input type="text" id="lastname" name="lastname" required />
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" required />
            </div>

            <div class="form-group">
              <label for="address">Street Address</label>
              <input type="text" id="address" name="address" required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" name="city" required />
              </div>
              <div class="form-group">
                <label for="zipcode">ZIP Code</label>
                <input type="text" id="zipcode" name="zipcode" required />
              </div>
            </div>

            <div class="form-group">
              <label for="country">Country</label>
              <select id="country" name="country" required>
                <option value="">Select Country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
                <option value="in">India</option>
              </select>
            </div>
          </div>

          <div class="checkout-section">
            <h2>Payment Information</h2>

            <div class="form-group">
              <label for="cardname">Cardholder Name</label>
              <input type="text" id="cardname" name="cardname" required />
            </div>

            <div class="form-group">
              <label for="cardnumber">Card Number</label>
              <input
                type="text"
                id="cardnumber"
                name="cardnumber"
                placeholder="1234 5678 9012 3456"
                required />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="expiry">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  required />
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  required />
              </div>
            </div>
          </div>

          <div class="checkout-section">
            <div class="form-group">
              <input type="checkbox" id="terms" name="terms" required />
              <label for="terms">I agree to the Terms and Conditions</label>
            </div>

            <button
              type="submit"
              class="btn btn-primary"
              style="width: 100%; margin-top: 1rem">
              Place Order
            </button>
          </div>
        </form>

        <!-- Order Summary Sidebar -->
        <div class="order-summary">
          <h2>Order Summary</h2>

          <?php foreach ($_SESSION['cart'] as $productId => $cartItem):
            if (!isset($products[$productId])) continue;
            $product = $products[$productId];
            $itemTotal = $product['price'] * $cartItem['quantity'];
            $image150 = str_replace('_300.png', '_150.png', $product['image']);
          ?>
            <div class="order-item">
              <img
                src="<?php echo $image150; ?>"
                alt="<?php echo $product['name']; ?>" />
              <div class="order-item-info">
                <h4><?php echo $product['name']; ?></h4>
                <p>Quantity: <?php echo $cartItem['quantity']; ?></p>
              </div>
              <p class="order-item-price">₹<?php echo number_format($itemTotal, 2); ?></p>
            </div>
          <?php endforeach; ?>

          <hr
            style="
                margin: 1.5rem 0;
                border: none;
                border-top: 1px solid var(--gray-200);
              " />

          <dl>
            <dt>Subtotal:</dt>
            <dd>₹<?php echo number_format($subtotal, 2); ?></dd>

            <dt>Shipping:</dt>
            <dd>₹<?php echo number_format($shippingCost, 2); ?></dd>

            <dt>Tax:</dt>
            <dd>₹<?php echo number_format($tax, 2); ?></dd>

            <dt style="font-weight: 700; color: var(--gray-900)">Total:</dt>
            <dd style="font-weight: 700; color: var(--primary-color)">
              ₹<?php echo number_format($total, 2); ?>
            </dd>
          </dl>
        </div>
      </div>
    <?php endif; ?>
  </div>
</main>

<script>
  // Update shipping cost and total when shipping method changes
  function updateShippingTotal() {
    const shippingCosts = {
      'standard': 15.00,
      'express': 25.00,
      'overnight': 40.00
    };

    const selectedShipping = document.querySelector('input[name="shipping"]:checked').value;
    const newShippingCost = shippingCosts[selectedShipping];

    // Find the order summary elements
    const orderSummary = document.querySelector('.order-summary dl');
    if (!orderSummary) return;

    const dts = orderSummary.querySelectorAll('dt');
    const dds = orderSummary.querySelectorAll('dd');

    // Update shipping cost (usually the second dd element)
    if (dds[1]) {
      dds[1].textContent = '₹' + newShippingCost.toFixed(2);
    }

    // Get subtotal and tax values
    const subtotalText = dds[0].textContent;
    const taxText = dds[2].textContent;

    const subtotal = parseFloat(subtotalText.replace('₹', '').replace(',', ''));
    const tax = parseFloat(taxText.replace('₹', '').replace(',', ''));

    // Calculate new total
    const newTotal = subtotal + newShippingCost + tax;

    // Update total (usually the fourth dd element)
    if (dds[3]) {
      dds[3].textContent = '₹' + newTotal.toFixed(2);
    }
  }

  // Add event listeners to shipping radio buttons
  document.querySelectorAll('input[name="shipping"]').forEach(radio => {
    radio.addEventListener('change', updateShippingTotal);
  });

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', updateShippingTotal);
</script>

<?php require_once "includes/footer.php"; ?>