<?php require_once "includes/header.php" ?>

<main id="login">
  <div class="auth-container">
    <div class="auth-card">
      <h1>Welcome Back</h1>
      <p class="subtitle">Sign in to your EasyCart account</p>

      <form action="index.php" id="login-form">
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" class="btn btn-primary"> Sign In</button>
      </form>

      <div class="auth-footer">
        <p>Don't have an account? <a href="signup.php">Sign up</a></p>
      </div>
    </div>
  </div>
</main>

<?php require_once "includes/footer.php"; ?>