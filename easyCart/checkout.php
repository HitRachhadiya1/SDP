<?php require_once "includes/header.php" ?>

    <main>
      <div class="container">
        <h1 class="page-title">Checkout</h1>

        <div class="checkout-layout">
          <form class="checkout-form">
            <div class="checkout-section">
              <h2>Shipping Options</h2>

              <div class="shipping-options">
                <div class="shipping-option">
                  <input
                    type="radio"
                    id="standard"
                    name="shipping"
                    value="standard"
                    checked
                  />
                  <label for="standard" class="shipping-option-info">
                    <strong>Standard Shipping</strong>
                    <span>5-7 business days</span>
                    <span class="shipping-option-price">₹5.00</span>
                  </label>
                </div>

                <div class="shipping-option">
                  <input
                    type="radio"
                    id="express"
                    name="shipping"
                    value="express"
                  />
                  <label for="express" class="shipping-option-info">
                    <strong>Express Shipping</strong>
                    <span>2-3 business days</span>
                    <span class="shipping-option-price">₹15.00</span>
                  </label>
                </div>

                <div class="shipping-option">
                  <input
                    type="radio"
                    id="overnight"
                    name="shipping"
                    value="overnight"
                  />
                  <label for="overnight" class="shipping-option-info">
                    <strong>Overnight Shipping</strong>
                    <span>1 business day</span>
                    <span class="shipping-option-price">₹25.00</span>
                  </label>
                </div>
              </div>
            </div>

            <div class="checkout-section">
              <h2>Shipping Information</h2>

              <div class="form-row">
                <div class="form-group">
                  <label for="firstname">First Name</label>
                  <input type="text" id="firstname" name="firstname" required />
                </div>
                <div class="form-group">
                  <label for="lastname">Last Name</label>
                  <input type="text" id="lastname" name="lastname" required />
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div class="form-group">
                <label for="address">Street Address</label>
                <input type="text" id="address" name="address" required />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="city">City</label>
                  <input type="text" id="city" name="city" required />
                </div>
                <div class="form-group">
                  <label for="zipcode">ZIP Code</label>
                  <input type="text" id="zipcode" name="zipcode" required />
                </div>
              </div>

              <div class="form-group">
                <label for="country">Country</label>
                <select id="country" name="country" required>
                  <option value="">Select Country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="au">Australia</option>
                  <option value="in">India</option>
                </select>
              </div>
            </div>

            <div class="checkout-section">
              <h2>Payment Information</h2>

              <div class="form-group">
                <label for="cardname">Cardholder Name</label>
                <input type="text" id="cardname" name="cardname" required />
              </div>

              <div class="form-group">
                <label for="cardnumber">Card Number</label>
                <input
                  type="text"
                  id="cardnumber"
                  name="cardnumber"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="expiry">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="checkout-section">
              <div class="form-group">
                <input type="checkbox" id="terms" name="terms" required />
                <label for="terms">I agree to the Terms and Conditions</label>
              </div>

              <button
                type="submit"
                class="btn btn-primary"
                style="width: 100%; margin-top: 1rem"
              >
                Place Order
              </button>
            </div>
          </form>

          <!-- Order Summary Sidebar -->
          <div class="order-summary">
            <h2>Order Summary</h2>

            <div class="order-item">
              <img
                src="products/fashionmen/blackshoes_150.png"
                alt="Black Leather Shoes"
              />
              <div class="order-item-info">
                <h4>Black Leather Shoes</h4>
                <p>Quantity: 1</p>
              </div>
              <p class="order-item-price">₹129.99</p>
            </div>

            <div class="order-item">
              <img
                src="products/fashionmen/menbackpack_150.png"
                alt="Men's Backpack"
              />
              <div class="order-item-info">
                <h4>Men's Backpack</h4>
                <p>Quantity: 1</p>
              </div>
              <p class="order-item-price">₹89.99</p>
            </div>

            <div class="order-item">
              <img
                src="products/appliances/television_150.png"
                alt="4K Smart TV"
              />
              <div class="order-item-info">
                <h4>4K Smart TV</h4>
                <p>Quantity: 1</p>
              </div>
              <p class="order-item-price">₹799.99</p>
            </div>

            <hr
              style="
                margin: 1.5rem 0;
                border: none;
                border-top: 1px solid var(--gray-200);
              "
            />

            <dl>
              <dt>Subtotal:</dt>
              <dd>₹1,019.97</dd>

              <dt>Shipping:</dt>
              <dd>₹15.00</dd>

              <dt>Tax:</dt>
              <dd>₹103.50</dd>

              <dt style="font-weight: 700; color: var(--gray-900)">Total:</dt>
              <dd style="font-weight: 700; color: var(--primary-color)">
                ₹1,138.47
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </main>

<?php require_once "includes/footer.php"; ?>
