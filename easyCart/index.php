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
          <a href="productDetails.html?product=blackshoes" class="product-link">
            <div class="product-card">
              <img
                src="products/fashionmen/blackshoes_300.png"
                alt="Black Leather Shoes"
              />
              <div class="product-card-content">
                <h3>Black Leather Shoes</h3>
                <p class="price">₹129.99</p>
              </div>
            </div>
          </a>
          <a href="productDetails.html?product=menbackpack" class="product-link">
            <div class="product-card">
              <img
                src="products/fashionmen/menbackpack_300.png"
                alt="Men's Backpack"
              />
              <div class="product-card-content">
                <h3>Men's Backpack</h3>
                <p class="price">₹89.99</p>
              </div>
            </div>
          </a>
          <a href="productDetails.html?product=television" class="product-link">
            <div class="product-card">
              <img
                src="products/appliances/television_300.png"
                alt="4K Smart TV"
              />
              <div class="product-card-content">
                <h3>4K Smart TV</h3>
                <p class="price">₹799.99</p>
              </div>
            </div>
          </a>
          <a href="productDetails.html?product=stroller" class="product-link">
            <div class="product-card">
              <img src="products/babies/stroller_300.png" alt="Baby Stroller" />
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
            href="productListing.html?category=electronics"
            class="category-card"
          >
            <h3>Electronics</h3>
          </a>
          <a href="productListing.html?category=fashion" class="category-card">
            <h3>Fashion</h3>
          </a>
          <a href="productListing.html?category=home" class="category-card">
            <h3>Home & Living</h3>
          </a>
          <a href="productListing.html?category=sports" class="category-card">
            <h3>Sports</h3>
          </a>
        </div>
      </section>

      <!-- Popular Brands Section -->
      <section class="popular-brands container">
        <h2>Popular Brands</h2>
        <div class="brands-grid">
          <a href="productListing.html?brand=apple" class="brand-card">
            <span>Apple</span>
          </a>
          <a href="productListing.html?brand=samsung" class="brand-card">
            <span>Samsung</span>
          </a>
          <a href="productListing.html?brand=sony" class="brand-card">
            <span>Sony</span>
          </a>
          <a href="productListing.html?brand=nike" class="brand-card">
            <span>Nike</span>
          </a>
          <a href="productListing.html?brand=adidas" class="brand-card">
            <span>Adidas</span>
          </a>
          <a href="productListing.html?brand=lg" class="brand-card">
            <span>LG</span>
          </a>
          <a href="productListing.html?brand=puma" class="brand-card">
            <span>Puma</span>
          </a>
          <a href="productListing.html?brand=gucci" class="brand-card">
            <span>Gucci</span>
          </a>
        </div>
      </section>
    </main>

<?php require_once "includes/footer.php"; ?>
