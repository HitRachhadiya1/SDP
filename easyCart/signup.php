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

<main id="signup">
    <div class="auth-container">
        <div class="auth-card">
            <h1>Create Account</h1>
            <p class="subtitle">Join EasyCart for the best shopping experience</p>

            <form id="signup-form" novalidate>
                <div class="form-group">
                    <label for="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" required />
                    <span class="error-message" id="fullname-error"></span>
                </div>

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

                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        required />
                    <span class="error-message" id="confirm-password-error"></span>
                </div>

                <button type="submit" class="btn btn-primary">
                    Create Account
                </button>
            </form>

            <div class="auth-footer">
                <p>Already have an account? <a href="login.php">Sign in</a></p>
            </div>
        </div>
    </div>
</main>

<script src="js/auth.js"></script>

<?php require_once "includes/footer.php"; ?>