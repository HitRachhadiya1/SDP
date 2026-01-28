<?php
// Start session first for cart actions
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

// Initialize cart if not exists
if (!isset($_SESSION['cart'])) {
  $_SESSION['cart'] = [];
}

require_once "data/products.php";

// Get product ID from URL parameter
$productId = isset($_GET['product']) ? $_GET['product'] : '';

// Check if product exists
if (!isset($products[$productId])) {
  // Product not found - redirect to product listing or show error
  header("Location: productListing.php");
  exit;
}

$product = $products[$productId];

// Handle add to cart BEFORE including header
$message = '';
if (isset($_POST['add_to_cart']) || isset($_POST['update_cart'])) {
  $quantity = max(1, intval($_POST['quantity'] ?? 1));
  $isUpdate = isset($_POST['update_cart']);

  if (isset($_SESSION['cart'][$productId])) {
    if ($isUpdate) {
      $_SESSION['cart'][$productId]['quantity'] = $quantity;
    } else {
      $_SESSION['cart'][$productId]['quantity'] += $quantity;
    }
  } else {
    // New product - add to cart with selected quantity
    $_SESSION['cart'][$productId] = [
      'quantity' => $quantity,
      'added_at' => time()
    ];
  }

  $message = $isUpdate ? 'Quantity updated successfully!' : 'Product added to cart successfully!';
}

require_once "includes/header.php";

// Get product image with 600px version (replace _300 with _600)
$image600 = str_replace('_300.png', '_600.png', $product['image']);
?>

<!-- Product Detail Page -->
<main>
  <div class="container">
    <!-- Back Button -->
    <div style="margin-bottom: 2rem;">
      <a href="productListing.php" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem;">
        <span>←</span>
        <span>Back to Products</span>
      </a>
    </div>

    <div class="product-detail">
      <!-- Product Image Section -->
      <section class="product-image-section">
        <div class="main-image-container">
          <img
            src="<?php echo isset($product['images']) ? $product['images'][0] : $image600; ?>"
            alt="<?php echo $product['name']; ?>"
            class="main-image"
            id="main-product-image" />
        </div>

        <?php if (isset($product['images']) && count($product['images']) > 1): ?>
          <div class="thumbnail-gallery">
            <?php foreach ($product['images'] as $index => $image): ?>
              <img
                src="<?php echo str_replace('_600.png', '_150.png', $image); ?>"
                alt="<?php echo $product['name']; ?> view <?php echo $index + 1; ?>"
                class="thumbnail-image <?php echo $index === 0 ? 'active' : ''; ?>"
                data-full-image="<?php echo $image; ?>"
                onclick="switchProductImage(this)" />
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </section>

      <!-- Product Information Section -->
      <section class="product-info-section">
        <h1><?php echo $product['name']; ?></h1>

        <!-- Price -->
        <div class="price-section">
          <p class="price">₹<?php echo number_format($product['price'], 2); ?></p>
        </div>

        <!-- Quantity Selection -->
        <div class="quantity-section" style="margin-bottom: 2rem;">
          <label for="quantity" style="display: block; margin-bottom: 0.5rem; font-weight: 600; color: var(--gray-700);">Quantity:</label>
          <div class="quantity-group" style="width: fit-content;">
            <!-- <button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button> -->
            <button type="button" class="quantity-btn" onclick="changeQty(-1)">-</button>
            <input
              type="number"
              id="quantity"
              name="quantity"
              form="add-to-cart-form"
              value="<?php echo $_SESSION['cart'][$productId]['quantity'] ?? 1; ?>"
              min="1"
              max="10"
              class="quantity-input" />
            <!-- <button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button> -->
            <button type="button" class="quantity-btn" onclick="changeQty(1)">+</button>

          </div>
        </div>

        <!-- Description -->
        <div class="description-section">
          <h2>Description</h2>
          <p><?php echo $product['description']; ?></p>

          <?php if (isset($product['sizes'])): ?>
            <h3>Sizes:</h3>
            <p><?php echo implode(', ', $product['sizes']); ?></p>
          <?php endif; ?>

          <?php if (isset($product['colors'])): ?>
            <h3>Colors:</h3>
            <p><?php echo implode(', ', $product['colors']); ?></p>
          <?php endif; ?>

          <?php if (isset($product['specs'])): ?>
            <h3>Specifications:</h3>
            <ul>
              <?php foreach ($product['specs'] as $spec): ?>
                <li><?php echo $spec; ?></li>
              <?php endforeach; ?>
            </ul>
          <?php endif; ?>

          <?php if (!empty($product['brand']) && isset($brands[$product['brand']])): ?>
            <h3>Brand:</h3>
            <p><?php echo $brands[$product['brand']]['name']; ?></p>
          <?php endif; ?>

          <h3>Category:</h3>
          <p><?php echo $categories[$product['category']]['name']; ?></p>
        </div>

        <!-- Add to Cart Form -->
        <div class="action-section">
          <form id="add-to-cart-form" method="post" action="productDetails.php?product=<?php echo $productId; ?>" style="display: inline;">
            <?php if (isset($_SESSION['cart'][$productId])): ?>
              <button type="submit" name="update_cart" class="btn btn-primary">Update Quantity</button>
            <?php else: ?>
              <button type="submit" name="add_to_cart" class="btn btn-primary">Add to Cart</button>
            <?php endif; ?>
          </form>
          <button class="btn btn-secondary">Add to Wishlist</button>
          <a href="cart.php" class="btn btn-outline" style="margin-left: 0.5rem;">View Cart</a>
        </div>
      </section>
    </div>
  </div>
</main>

<script src="js/productDetails.js"></script>

<?php require_once "includes/footer.php"; ?>