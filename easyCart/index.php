<?php require_once "includes/header.php" ?>

    <!-- Landing Page -->
    <main id="landing-page">
      <!-- Hero Section -->
      <section class="hero" aria-label="Hero Banner">
        <div class="hero-content">
          <h2>Welcome to EasyCart</h2>
          <p>Discover amazing products at unbeatable prices</p>
          <a href="#featured-products" class="cta-button">Shop Now</a>
        </div>
      </section>

      <!-- Featured Products Section -->
      <section id="featured-products" class="featured-products container">
        <h2>Featured Products</h2>
        <div class="products-grid">
          <a href="productDetails.php?product=blackshoes" class="product-link">
            <div class="product-card">
              <img
                src="data/images/fashionmen/blackshoes_300.png"
                alt="Black Leather Shoes"
              />
              <div class="product-card-content">
                <h3>Black Leather Shoes</h3>
                <p class="price">₹129.99</p>
              </div>
            </div>
          </a>
          <a href="productDetails.php?product=menbackpack" class="product-link">
            <div class="product-card">
              <img
                src="data/images/fashionmen/menbackpack_300.png"
                alt="Men's Backpack"
              />
              <div class="product-card-content">
                <h3>Men's Backpack</h3>
                <p class="price">₹89.99</p>
              </div>
            </div>
          </a>
          <a href="productDetails.php?product=television" class="product-link">
            <div class="product-card">
              <img
                src="data/images/appliances/television_300.png"
                alt="4K Smart TV"
              />
              <div class="product-card-content">
                <h3>4K Smart TV</h3>
                <p class="price">₹799.99</p>
              </div>
            </div>
          </a>
          <a href="productDetails.php?product=stroller" class="product-link">
            <div class="product-card">
              <img src="data/images/babies/stroller_300.png" alt="Baby Stroller" />
              <div class="product-card-content">
                <h3>Baby Stroller</h3>
                <p class="price">₹249.99</p>
              </div>
            </div>
          </a>
        </div>
      </section>

      <!-- Popular Categories Section -->
      <section class="popular-categories container">
        <h2>Popular Categories</h2>
        <div class="categories-grid">
          <a
            href="productListing.php?category=appliances"
            class="category-card"
          >
            <h3>Appliances</h3>
          </a>
          <a href="productListing.php?category=fashionmen" class="category-card">
            <h3>Men's Fashion</h3>
          </a>
          <a href="productListing.php?category=accessories" class="category-card">
            <h3>Accessories</h3>
          </a>
          <a href="productListing.php?category=babies" class="category-card">
            <h3>Baby Products</h3>
          </a>
        </div>
      </section>

      <!-- Popular Brands Section -->
      <section class="popular-brands container">
        <h2>Popular Brands</h2>
        <div class="brands-grid">
          <a href="productListing.php?brand=apple" class="brand-card">
            <span>Apple</span>
          </a>
          <a href="productListing.php?brand=samsung" class="brand-card">
            <span>Samsung</span>
          </a>
          <a href="productListing.php?brand=sony" class="brand-card">
            <span>Sony</span>
          </a>
          <a href="productListing.php?brand=nike" class="brand-card">
            <span>Nike</span>
          </a>
          <a href="productListing.php?brand=adidas" class="brand-card">
            <span>Adidas</span>
          </a>
          <a href="productListing.php?brand=lg" class="brand-card">
            <span>LG</span>
          </a>
          <a href="productListing.php?brand=puma" class="brand-card">
            <span>Puma</span>
          </a>
          <a href="productListing.php?brand=gucci" class="brand-card">
            <span>Gucci</span>
          </a>
        </div>
      </section>
    </main>

<?php require_once "includes/footer.php"; ?>
