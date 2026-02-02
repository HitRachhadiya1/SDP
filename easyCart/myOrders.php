<?php
require_once "includes/header.php";
require_once "data/products.php";

// Check if user is logged in
if (!isset($_SESSION['logged_in_user'])) {
  // If not logged in, redirect to login page
  header("Location: login.php");
  exit;
}

$userId = $_SESSION['logged_in_user']['id'];

// Get user's order history from session
$userOrders = [];
if (isset($_SESSION['user_orders']) && isset($_SESSION['user_orders'][$userId])) {
  $userOrders = $_SESSION['user_orders'][$userId];
}

// Get order details from session if available (from recent checkout)
// Only add if this order is not already in the user's order history
$userLastOrderKey = 'last_order_' . $userId;
if (isset($_SESSION[$userLastOrderKey])) {
  $lastOrder = $_SESSION[$userLastOrderKey];

  // Validate that the last order has the required data
  if (isset($lastOrder['id']) && isset($lastOrder['order_date']) && isset($lastOrder['items'])) {
    $orderItems = [];

    foreach ($lastOrder['items'] as $productId => $cartItem) {
      if (isset($products[$productId])) {
        $orderItems[] = [
          'product_id' => $productId,
          'quantity' => $cartItem['quantity'],
          'name' => $products[$productId]['name']
        ];
      } else {
        // Fallback for missing product data
        $orderItems[] = [
          'product_id' => $productId,
          'quantity' => $cartItem['quantity'],
          'name' => 'Unknown Product'
        ];
      }
    }

    if (!empty($orderItems)) {
      // Check if this order already exists in user's history
      $orderId = $lastOrder['id'];
      $orderExists = false;

      foreach ($userOrders as $existingOrder) {
        if ($existingOrder['id'] === $orderId) {
          $orderExists = true;
          break;
        }
      }

      // Only add if order doesn't already exist
      if (!$orderExists) {
        $newOrder = [
          'id' => $orderId,
          'date' => date('Y-m-d', $lastOrder['order_date']),
          'items' => $orderItems,
          'total' => $lastOrder['total'] ?? 0,
          'status' => $lastOrder['status'] ?? 'processing',
          'status_text' => $lastOrder['status_text'] ?? 'Processing'
        ];

        array_unshift($userOrders, $newOrder);
      }
    }
  }
}

// Sort orders by date (newest first)
usort($userOrders, function ($a, $b) {
  $dateA = strtotime($a['date'] ?? date('Y-m-d'));
  $dateB = strtotime($b['date'] ?? date('Y-m-d'));
  return $dateB - $dateA;
});
?>

<main>
  <div class="container">
    <h1 class="page-title">My Orders</h1>

    <?php if (empty($userOrders)): ?>
      <div style="text-align: center; padding: 3rem;">
        <h2>No orders yet</h2>
        <p>You haven't placed any orders yet. Start shopping now!</p>
        <a href="productListing.php" class="btn btn-primary" style="margin-top: 1rem;">Browse Products</a>
      </div>
    <?php else: ?>

      <div
        style="
            background: var(--white);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow);
            overflow: hidden;
          ">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <!-- <th>Actions</th> -->
            </tr>
          </thead>
          <tbody>
            <?php foreach ($userOrders as $order): ?>
              <tr>
                <td><?php echo htmlspecialchars($order['id'] ?? 'Unknown'); ?></td>
                <td><?php echo date('M d, Y', strtotime($order['date'] ?? date('Y-m-d'))); ?></td>
                <td>
                  <?php
                  $itemNames = [];
                  if (isset($order['items']) && is_array($order['items'])) {
                    $itemNames = array_map(function ($item) {
                      return $item['quantity'] > 1 ? htmlspecialchars($item['name'] ?? 'Unknown Product') . ' (x' . $item['quantity'] . ')' : htmlspecialchars($item['name'] ?? 'Unknown Product');
                    }, $order['items']);
                  }
                  echo implode(', ', $itemNames);
                  ?>
                </td>
                <td>₹<?php echo number_format($order['total'] ?? 0, 2); ?></td>
                <td>
                  <span class="status status-<?php echo htmlspecialchars($order['status'] ?? 'processing'); ?>">
                    <?php echo htmlspecialchars($order['status_text'] ?? 'Processing'); ?>
                  </span>
                </td>
                <!-- <td>
                  <?php if ($order['status'] === 'processing'): ?>
                    <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;">Track Order</button>
                  <?php elseif ($order['status'] === 'shipped'): ?>
                    <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;">Track Shipment</button>
                  <?php elseif ($order['status'] === 'delivered'): ?>
                    <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.25rem 0.5rem;">View Details</button>
                  <?php else: ?>
                    <span style="color: var(--gray-500); font-size: 0.8rem;">-</span>
                  <?php endif; ?>
                </td> -->
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>

      <div style="margin-top: 2rem; text-align: center;">
        <p style="color: var(--gray-600); font-size: 0.9rem;">
          Showing <?php echo count($userOrders); ?> order<?php echo count($userOrders) !== 1 ? 's' : ''; ?>
        </p>
      </div>

    <?php endif; ?>
  </div>
</main>

<?php require_once "includes/footer.php"; ?>