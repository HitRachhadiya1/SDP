<?php
// Start session for cart count (only if not already started)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$cartCount = 0;
if (isset($_SESSION['cart']) && is_array($_SESSION['cart'])) {
    foreach ($_SESSION['cart'] as $item) {
        $cartCount += intval($item['quantity'] ?? 0);
    }
}
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EasyCart - Your Online Shopping Destination</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <!-- Header -->
    <header>
      <nav>
        <div class="logo">
          <a href="index.php"><h1>EasyCart</h1></a>
        </div>
        <button class="mobile-menu-btn">☰</button>
        <ul class="nav-menu">
          <li><a href="index.php">Home</a></li>
          <li><a href="productListing.php">Products</a></li>
          <li><a href="cart.php">Cart</a></li>
          <li><a href="myOrders.php">Orders</a></li>
          <li><a href="login.php">Login</a></li>
        </ul>
        <div class="nav-icons">
          <a href="cart.php" class="cart-icon">
            🛒
            <span class="cart-badge"><?php echo $cartCount; ?></span>
          </a>
          <div class="options-icon" id="options-icon">
            ⚙️
            <div class="options-popup" id="options-popup">
              <div
                class="options-popup-item"
                onclick="window.location.href = 'login.php'"
              >
                👤 <span>Profile</span>
              </div>
              <div
                class="options-popup-item"
                onclick="window.location.href = 'myOrders.php'"
              >
                📦 <span>My Orders</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
