<?php
// Start session for cart count (only if not already started)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Calculate cart count
$cartCount = 0;
if (isset($_SESSION['cart']) && is_array($_SESSION['cart'])) {
    foreach ($_SESSION['cart'] as $item) {
        $cartCount += intval($item['quantity'] ?? 0);
    }
}

// Check if user is logged in
$isLoggedIn = isset($_SESSION['logged_in_user']);
$userName = $isLoggedIn ? $_SESSION['logged_in_user']['fullname'] : '';
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
                <a href="index.php">
                    <h1>EasyCart</h1>
                </a>
            </div>
            <button class="mobile-menu-btn">☰</button>
            <ul class="nav-menu">
                <li><a href="index.php">Home</a></li>
                <li><a href="productListing.php">Products</a></li>
                <li><a href="cart.php">Cart</a></li>
                <li><a href="myOrders.php">Orders</a></li>
                <?php if ($isLoggedIn): ?>
                    <li class="welcome-user">Welcome, <?php echo htmlspecialchars($userName); ?>!</li>
                <?php endif; ?>
            </ul>
            <div class="nav-icons">
                <a href="cart.php" class="cart-icon">
                    🛒
                    <span class="cart-badge"><?php echo $cartCount; ?></span>
                </a>
                <div class="options-icon" id="options-icon">
                    <?php if ($isLoggedIn): ?>
                        👤
                    <?php else: ?>
                        ⚙️
                    <?php endif; ?>
                    <div class="options-popup" id="options-popup">
                        <?php if ($isLoggedIn): ?>
                            <div class="options-popup-item" onclick="window.location.href = 'myOrders.php'">
                                📦 <span>My Orders</span>
                            </div>
                            <div class="options-popup-item" onclick="logoutUser()">
                                🔒 <span>Logout</span>
                            </div>
                        <?php else: ?>
                            <div class="options-popup-item" onclick="window.location.href = 'login.php'">
                                👤 <span>Login</span>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    <div id="toast-container" class="toast-container" aria-live="polite" aria-atomic="true"></div>

    <script src="js/auth.js"></script>