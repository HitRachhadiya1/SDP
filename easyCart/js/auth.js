// Authentication JavaScript functionality

// Login form handler
document.addEventListener("DOMContentLoaded", function () {
  console.log("Auth JS loaded");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) {
    console.log("Login form found, adding event listener");
    loginForm.addEventListener("submit", handleLogin);
  } else {
    console.log("Login form not found");
  }

  if (signupForm) {
    console.log("Signup form found, adding event listener");
    signupForm.addEventListener("submit", handleSignup);
  } else {
    console.log("Signup form not found");
  }
});

async function handleLogin(e) {
  console.log("Login form submitted, preventing default");
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  console.log("Email:", email, "Password length:", password.length);

  // Clear previous errors
  if (emailError) emailError.textContent = "";
  if (passwordError) passwordError.textContent = "";

  // Basic validation
  if (!email) {
    if (emailError) emailError.textContent = "Email is required";
    console.log("Email validation failed");
    return;
  }

  if (!password) {
    if (passwordError) passwordError.textContent = "Password is required";
    console.log("Password validation failed");
    return;
  }

  console.log("Validation passed, making API request");

  try {
    const response = await fetch("auth_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "login",
        email: email,
        password: password,
      }),
    });

    console.log("API response received, status:", response.status);

    const result = await response.json();
    console.log("API result:", result);

    if (result.success) {
      showToast("Login successful!", "success");
      // Redirect to home page
      setTimeout(() => {
        window.location.href = "index.php";
      }, 1000);
    } else {
      showToast(result.message, "error");
    }
  } catch (error) {
    showToast("An error occurred. Please try again.", "error");
    console.error("Login error:", error);
  }
}

async function handleSignup(e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const fullnameError = document.getElementById("fullname-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById(
    "confirm-password-error",
  );

  // Clear previous errors (with null checks)
  if (fullnameError) fullnameError.textContent = "";
  if (emailError) emailError.textContent = "";
  if (passwordError) passwordError.textContent = "";
  if (confirmPasswordError) confirmPasswordError.textContent = "";

  // Basic validation
  let hasError = false;

  if (!fullname) {
    fullnameError.textContent = "Full name is required";
    hasError = true;
  }

  if (!email) {
    emailError.textContent = "Email is required";
    hasError = true;
  }

  if (!password) {
    passwordError.textContent = "Password is required";
    hasError = true;
  }

  if (!confirmPassword) {
    confirmPasswordError.textContent = "Please confirm your password";
    hasError = true;
  }

  if (password && confirmPassword && password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match";
    hasError = true;
  }

  if (password && password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long";
    hasError = true;
  }

  if (hasError) {
    return;
  }

  try {
    const response = await fetch("auth_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "register",
        fullname: fullname,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }),
    });

    const result = await response.json();

    if (result.success) {
      showToast("Registration successful! Please login.", "success");
      // Redirect to login page
      setTimeout(() => {
        window.location.href = "login.php";
      }, 2000);
    } else {
      showToast(result.message, "error");
    }
  } catch (error) {
    showToast("An error occurred. Please try again.", "error");
    console.error("Signup error:", error);
  }
}

// Logout function
async function logoutUser() {
  try {
    const response = await fetch("auth_api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        action: "logout",
      }),
    });

    const result = await response.json();

    if (result.success) {
      showToast("Logged out successfully", "success");
      // Redirect to home page
      setTimeout(() => {
        window.location.href = "index.php";
      }, 1000);
    } else {
      showToast("Error during logout", "error");
    }
  } catch (error) {
    showToast("An error occurred during logout", "error");
    console.error("Logout error:", error);
  }
}

// Toast notification function
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
