<?php
require_once "includes/header.php";
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
            <img
              src="<?php echo $image600; ?>"
              alt="<?php echo $product['name']; ?>"
              class="main-image"
            />
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
                <button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value="1"
                  min="1"
                  max="10"
                  class="quantity-input"
                />
                <button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button>
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

            <!-- Add to Cart Button -->
            <div class="action-section">
              <button class="btn btn-primary">Add to Cart</button>
              <button class="btn btn-secondary">Add to Wishlist</button>
            </div>
          </section>
        </div>
      </div>
    </main>

<?php require_once "includes/footer.php"; ?>
