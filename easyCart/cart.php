<?php require_once "includes/header.php" ?>

    <main>
      <div class="container">
        <h1 class="page-title">Shopping Cart</h1>

        <div class="cart-layout">
          <!-- Cart Items -->
          <div class="cart-items">
            <table class="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="cart-product">
                      <img
                        src="products/fashionmen/blackshoes_150.png"
                        alt="Black Leather Shoes"
                      />
                      <div class="cart-product-info">
                        <h3>Black Leather Shoes</h3>
                        <p>Genuine Leather - Black</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="price">₹129.99</p>
                  </td>
                  <td>
                    <div class="quantity-group">
                      <button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button>
                      <input
                        type="number"
                        value="1"
                        min="1"
                        max="10"
                        class="quantity-input"
                      />
                      <button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>
                  </td>
                  <td>
                    <p class="price">₹129.99</p>
                  </td>
                  <td>
                    <button class="btn btn-danger">Remove</button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cart-product">
                      <img
                        src="products/fashionmen/menbackpack_150.png"
                        alt="Men's Backpack"
                      />
                      <div class="cart-product-info">
                        <h3>Men's Backpack</h3>
                        <p>Waterproof - Black</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="price">₹89.99</p>
                  </td>
                  <td>
                    <div class="quantity-group">
                      <button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button>
                      <input
                        type="number"
                        value="1"
                        min="1"
                        max="10"
                        class="quantity-input"
                      />
                      <button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>
                  </td>
                  <td>
                    <p class="price">₹89.99</p>
                  </td>
                  <td>
                    <button class="btn btn-danger">Remove</button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="cart-product">
                      <img
                        src="products/appliances/television_150.png"
                        alt="4K Smart TV"
                      />
                      <div class="cart-product-info">
                        <h3>4K Smart TV</h3>
                        <p>55-inch LED - Black</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p class="price">₹799.99</p>
                  </td>
                  <td>
                    <div class="quantity-group">
                      <button class="quantity-btn" onclick="this.nextElementSibling.stepDown()">-</button>
                      <input
                        type="number"
                        value="1"
                        min="1"
                        max="10"
                        class="quantity-input"
                      />
                      <button class="quantity-btn" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>
                  </td>
                  <td>
                    <p class="price">₹799.99</p>
                  </td>
                  <td>
                    <button class="btn btn-danger">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Cart Summary -->
          <div class="cart-summary">
            <h2>Cart Summary</h2>

            <dl>
              <dt>Subtotal:</dt>
              <dd>₹1,019.97</dd>

              <dt>Shipping:</dt>
              <dd>₹15.00</dd>

              <dt>Tax:</dt>
              <dd>₹103.50</dd>

              <dt>Total:</dt>
              <dd>₹1,138.47</dd>
            </dl>

            <div class="cart-actions">
              <button class="btn btn-secondary">Continue Shopping</button>
              <button class="btn btn-primary" onclick="window.location.href = 'checkout.html'">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </main>

<?php require_once "includes/footer.php"; ?>
