<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// If user is already logged in, redirect to home
if (isset($_SESSION['logged_in_user'])) {
    header("Location: index.php");
    exit;
}

require_once "includes/header.php"
?>

<main id="login">
    <div class="auth-container">
        <div class="auth-card">
            <h1>Welcome Back</h1>
            <p class="subtitle">Sign in to your EasyCart account</p>

            <form id="login-form" novalidate>
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required />
                    <span class="error-message" id="email-error"></span>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required />
                    <span class="error-message" id="password-error"></span>
                </div>

                <button type="submit" class="btn btn-primary">Sign In</button>
            </form>

            <div class="auth-footer">
                <p>Don't have an account? <a href="signup.php">Sign up</a></p>
            </div>
        </div>
    </div>
</main>

<script src="js/auth.js"></script>

<script>
    // Additional debugging for login form
    console.log('Login page loaded, checking form...');
    document.addEventListener('DOMContentLoaded', function() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            console.log('Login form found in login.php');
            // Add inline event listener as backup
            loginForm.addEventListener('submit', function(e) {
                console.log('Form submitted - inline handler');
                e.preventDefault();
            });
        } else {
            console.log('Login form NOT found in login.php');
        }
    });
</script>

<?php require_once "includes/footer.php"; ?>