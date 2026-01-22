<?php
require_once "includes/header.php";
require_once "data/products.php";
?>

    <!-- Product Listing Page -->
    <main>
      <div class="container">
        <h1 class="page-title">Our Products</h1>

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
                    alt="<?php echo $product['name']; ?>"
                  />
                  <div class="product-card-content">
                    <h3><?php echo $product['name']; ?></h3>
                    <p class="price">₹<?php echo number_format($product['price'], 2); ?></p>
                  </div>
                </a>
                <div class="card-actions">
                  <div class="quantity-group">
                    <button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button>
                    <input type="number" value="1" min="1" max="10" class="quantity-input" />
                    <button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button>
                  </div>
                  <button class="add-to-cart" style="opacity: 1; transform: none; margin: 0; width: 100%;">Add to Cart</button>
                </div>
              </div>
              <?php endforeach; ?>
            </div>
          </div>
        </div>
      </div>
    </main>

<?php require_once "includes/footer.php"; ?>
