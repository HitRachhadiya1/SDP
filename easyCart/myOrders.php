<?php
require_once "includes/header.php";
require_once "data/products.php";

// Sample order history data for single user
$orderHistory = [
  [
    'id' => 'ORD-2024-001',
    'date' => '2024-01-15',
    'items' => [
      ['product_id' => 'blackshoes', 'quantity' => 1, 'name' => 'Black Leather Shoes']
    ],
    'total' => 129.99,
    'status' => 'delivered',
    'status_text' => 'Delivered'
  ],
  [
    'id' => 'ORD-2024-002',
    'date' => '2024-01-10',
    'items' => [
      ['product_id' => 'menbackpack', 'quantity' => 1, 'name' => 'Men\'s Backpack']
    ],
    'total' => 89.99,
    'status' => 'shipped',
    'status_text' => 'Shipped'
  ],
  [
    'id' => 'ORD-2024-003',
    'date' => '2024-01-08',
    'items' => [
      ['product_id' => 'television', 'quantity' => 1, 'name' => '4K Smart TV']
    ],
    'total' => 799.99,
    'status' => 'processing',
    'status_text' => 'Processing'
  ],
  [
    'id' => 'ORD-2024-004',
    'date' => '2024-01-05',
    'items' => [
      ['product_id' => 'hoodie', 'quantity' => 1, 'name' => 'Men\'s Hoodie'],
      ['product_id' => 'menjeans', 'quantity' => 1, 'name' => 'Men\'s Jeans']
    ],
    'total' => 139.98,
    'status' => 'delivered',
    'status_text' => 'Delivered'
  ],
  [
    'id' => 'ORD-2024-005',
    'date' => '2024-01-03',
    'items' => [
      ['product_id' => 'speaker', 'quantity' => 1, 'name' => 'Bluetooth Speaker']
    ],
    'total' => 129.99,
    'status' => 'cancelled',
    'status_text' => 'Cancelled'
  ],
  [
    'id' => 'ORD-2024-006',
    'date' => '2024-01-01',
    'items' => [
      ['product_id' => 'watch', 'quantity' => 1, 'name' => 'Men\'s Watch'],
      ['product_id' => 'sunglasses', 'quantity' => 1, 'name' => 'Sunglasses']
    ],
    'total' => 209.98,
    'status' => 'delivered',
    'status_text' => 'Delivered'
  ]
];

// Get order details from session if available (from recent checkout)
if (isset($_SESSION['last_order'])) {
  $lastOrder = $_SESSION['last_order'];
  $orderItems = [];

  foreach ($lastOrder['items'] as $productId => $cartItem) {
    if (isset($products[$productId])) {
      $orderItems[] = [
        'product_id' => $productId,
        'quantity' => $cartItem['quantity'],
        'name' => $products[$productId]['name']
      ];
    }
  }

  if (!empty($orderItems)) {
    array_unshift($orderHistory, [
      'id' => 'ORD-' . date('Y-m-d', $lastOrder['order_date']),
      'date' => date('Y-m-d', $lastOrder['order_date']),
      'items' => $orderItems,
      'total' => $lastOrder['total'],
      'status' => 'processing',
      'status_text' => 'Processing'
    ]);
  }
}

// Sort orders by date (newest first)
// usort($orderHistory, function ($a, $b) {
//   return strtotime($b['date']) - strtotime($a['date']);
// });
?>

<main>
  <div class="container">
    <h1 class="page-title">My Orders</h1>

    <?php if (empty($orderHistory)): ?>
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
            <?php foreach ($orderHistory as $order): ?>
              <tr>
                <td><?php echo $order['id']; ?></td>
                <td><?php echo date('M d, Y', strtotime($order['date'])); ?></td>
                <td>
                  <?php
                  $itemNames = array_map(function ($item) {
                    return $item['quantity'] > 1 ? $item['name'] . ' (x' . $item['quantity'] . ')' : $item['name'];
                  }, $order['items']);
                  echo implode(', ', $itemNames);
                  ?>
                </td>
                <td>₹<?php echo number_format($order['total'], 2); ?></td>
                <td>
                  <span class="status status-<?php echo $order['status']; ?>">
                    <?php echo $order['status_text']; ?>
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

      <!-- <div style="margin-top: 2rem; text-align: center;">
        <p style="color: var(--gray-600); font-size: 0.9rem;">
          Showing <?php echo count($orderHistory); ?> order<?php echo count($orderHistory) !== 1 ? 's' : ''; ?>
        </p>
      </div> -->

    <?php endif; ?>
  </div>
</main>

<?php require_once "includes/footer.php"; ?>