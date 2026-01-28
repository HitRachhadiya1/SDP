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

// Handle cart actions BEFORE including header
$message = '';
if (isset($_POST['add_to_cart']) || isset($_POST['update_cart'])) {
  $productId = $_POST['product_id'] ?? '';
  $quantity = max(1, intval($_POST['quantity'] ?? 1));

  if (isset($products[$productId])) {
    if (isset($_SESSION['cart'][$productId])) {
      if (isset($_POST['update_cart'])) {
        // Update existing quantity
        $_SESSION['cart'][$productId]['quantity'] = $quantity;
        $message = 'Quantity updated for "' . $products[$productId]['name'] . '"';
      } else {
        // Add to existing quantity
        $_SESSION['cart'][$productId]['quantity'] += $quantity;
        $message = '"' . $products[$productId]['name'] . '" added to cart!';
      }
    } else {
      // Add new item to cart
      $_SESSION['cart'][$productId] = [
        'quantity' => $quantity,
        'added_at' => time()
      ];
      $message = '"' . $products[$productId]['name'] . '" added to cart!';
    }
  }
}

require_once "includes/header.php";
?>

<!-- Product Listing Page -->
<main>
  <div class="container">
    <h1 class="page-title">Our Products</h1>
    <p class="product-count" style="margin-bottom: 1rem; color: var(--gray-600);">Showing <?php echo count($products); ?> products</p>

    <button class="btn btn-secondary" onclick="document.querySelector('.product-listing-layout').classList.toggle('filters-active'); document.querySelector('.filter-sidebar').classList.toggle('active');" style="margin-bottom: 2rem;">
      <i style="margin-right: 0.5rem;">⚙️</i> Filter Products
    </button>

    <div class="product-listing-layout">
      <!-- Filter Sidebar -->
      <aside class="filter-sidebar">
        <div class="filter-section">
          <h3>Categories</h3>
          <?php foreach ($categories as $categoryId => $category): ?>
            <div class="filter-option">
              <input type="checkbox" id="<?php echo $categoryId; ?>" name="category" value="<?php echo $categoryId; ?>" />
              <label for="<?php echo $categoryId; ?>"><?php echo $category['name']; ?></label>
            </div>
          <?php endforeach; ?>
        </div>

        <div class="filter-section">
          <h3>Price Range</h3>
          <div class="price-range">
            <input type="number" placeholder="Min" min="0" />
            <input type="number" placeholder="Max" min="0" />
          </div>
        </div>

        <div class="filter-section">
          <h3>Sort By</h3>
          <div class="filter-option">
            <input type="radio" id="sort-price-low" name="sort" value="price-low" />
            <label for="sort-price-low">Price: Low to High</label>
          </div>
          <div class="filter-option">
            <input type="radio" id="sort-price-high" name="sort" value="price-high" />
            <label for="sort-price-high">Price: High to Low</label>
          </div>
          <div class="filter-option">
            <input type="radio" id="sort-name" name="sort" value="name" />
            <label for="sort-name">Name</label>
          </div>
        </div>

        <button class="btn btn-primary filter-btn">Apply Filters</button>
      </aside>

      <!-- Products Grid -->
      <div class="products-section">
        <div class="products-grid">
          <?php foreach ($products as $productId => $product): ?>
            <div class="product-card">
              <a href="productDetails.php?product=<?php echo $productId; ?>" class="product-link-wrapper">
                <img
                  src="<?php echo $product['image']; ?>"
                  alt="<?php echo $product['name']; ?>" />
                <div class="product-card-content">
                  <h3><?php echo $product['name']; ?></h3>
                  <p class="price">₹<?php echo number_format($product['price'], 2); ?></p>
                </div>
              </a>
              <div class="card-actions">
                <?php
                $inCart = isset($_SESSION['cart'][$productId]);
                $cartQty = $inCart ? $_SESSION['cart'][$productId]['quantity'] : 1;
                ?>
                <form method="post" action="productListing.php" class="product-cart-form" style="width: 100%;">
                  <input type="hidden" name="product_id" value="<?php echo $productId; ?>">
                  <div class="quantity-group">
                    <button type="button" class="quantity-btn" onclick="changeQuantity(this, -1)">-</button>
                    <input type="number" name="quantity" value="<?php echo $cartQty; ?>" min="1" max="10" class="quantity-input" id="qty-<?php echo $productId; ?>" />
                    <button type="button" class="quantity-btn" onclick="changeQuantity(this, 1)">+</button>
                  </div>
                  <?php if ($inCart): ?>
                    <button type="submit" name="update_cart" class="add-to-cart btn-main-action btn-update-cart">Update Quantity</button>
                    <a href="cart.php" class="view-cart link-view-cart">View Cart</a>
                  <?php else: ?>
                    <button type="submit" name="add_to_cart" class="add-to-cart btn-main-action">Add to Cart</button>
                  <?php endif; ?>
                </form>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</main>

<script src="js/productListing.js"></script>

<?php require_once "includes/footer.php"; ?>