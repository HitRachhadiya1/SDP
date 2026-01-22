<?php require_once "includes/header.php" ?>

    <main>
      <div class="auth-container">
        <div class="auth-card">
          <h1>Create Account</h1>
          <p class="subtitle">Join EasyCart for the best shopping experience</p>

          <form action="index.html">
            <div class="form-group">
              <label for="fullname">Full Name</label>
              <input type="text" id="fullname" name="fullname" required />
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>

            <div class="form-group">
              <label for="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Create Account
            </button>
          </form>

          <div class="auth-footer">
            <p>Already have an account? <a href="login.html">Sign in</a></p>
          </div>
        </div>
      </div>
    </main>

<?php require_once "includes/footer.php"; ?>
