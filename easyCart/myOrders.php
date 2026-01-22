<?php require_once "includes/header.php" ?>

    <main>
      <div class="container">
        <h1 class="page-title">My Orders</h1>

        <div
          style="
            background: var(--white);
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow);
            overflow: hidden;
          "
        >
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12345</td>
                <td>2023-10-01</td>
                <td>Black Leather Shoes</td>
                <td>₹129.99</td>
                <td><span class="status status-delivered">Delivered</span></td>
              </tr>
              <tr>
                <td>#12346</td>
                <td>2023-10-05</td>
                <td>Men's Backpack</td>
                <td>₹89.99</td>
                <td><span class="status status-shipped">Shipped</span></td>
              </tr>
              <tr>
                <td>#12347</td>
                <td>2023-10-10</td>
                <td>4K Smart TV</td>
                <td>₹799.99</td>
                <td>
                  <span class="status status-processing">Processing</span>
                </td>
              </tr>
              <tr>
                <td>#12348</td>
                <td>2023-10-15</td>
                <td>Men's Hoodie, Men's Jeans</td>
                <td>₹139.98</td>
                <td><span class="status status-delivered">Delivered</span></td>
              </tr>
              <tr>
                <td>#12349</td>
                <td>2023-10-20</td>
                <td>Bluetooth Speaker</td>
                <td>₹129.99</td>
                <td><span class="status status-delivered">Delivered</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

<?php require_once "includes/footer.php"; ?>
