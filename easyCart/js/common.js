// EasyCart Common JavaScript functionality
// Contains reusable code used across multiple pages

document.addEventListener("DOMContentLoaded", function () {
  console.log("EasyCart common functionality loaded");

  // Options popup functionality
  initializeOptionsPopup();

  // Mobile menu functionality
  initializeMobileMenu();

  // Form validation
  initializeFormValidation();

  // Close popup when clicking outside
  document.addEventListener("click", function (e) {
    const optionsPopup = document.getElementById("options-popup");
    const optionsIcon = document.getElementById("options-icon");
    const navMenu = document.querySelector(".nav-menu");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

    if (
      optionsPopup &&
      optionsIcon &&
      !optionsIcon.contains(e.target) &&
      !optionsPopup.contains(e.target)
    ) {
      optionsPopup.classList.remove("active");
    }

    // Close mobile menu when clicking outside
    if (
      navMenu &&
      mobileMenuBtn &&
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      navMenu.classList.remove("active");
    }
  });
});

function initializeMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }
}

function initializeOptionsPopup() {
  const optionsIcon = document.getElementById("options-icon");
  const optionsPopup = document.getElementById("options-popup");

  if (optionsIcon && optionsPopup) {
    optionsIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      optionsPopup.classList.toggle("active");
    });
  }
}

// Form validation functionality
function validateEmail(email) {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function showError(input, message) {
  const formGroup = input.closest(".form-group");
  let errorElement = formGroup.querySelector(".error-message");

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "error-message";
    formGroup.appendChild(errorElement);
  }

  errorElement.textContent = message;
  input.classList.add("error");
}

function clearError(input) {
  const formGroup = input.closest(".form-group");
  const errorElement = formGroup.querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
  }

  input.classList.remove("error");
}

function validateLoginForm() {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  let isValid = true;

  // Clear previous errors
  clearError(emailInput);
  clearError(passwordInput);

  // Validate email
  if (!emailInput.value.trim()) {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  if (!passwordInput.value.trim()) {
    showError(passwordInput, "Password is required");
    isValid = false;
  }

  return isValid;
}

function validateSignupForm() {
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  let isValid = true;

  // Clear previous errors
  clearError(fullnameInput);
  clearError(emailInput);
  clearError(passwordInput);
  clearError(confirmPasswordInput);

  // Validate full name
  if (!fullnameInput.value.trim()) {
    showError(fullnameInput, "Full name is required");
    isValid = false;
  } else if (fullnameInput.value.trim().length < 2) {
    showError(fullnameInput, "Full name must be at least 2 characters");
    isValid = false;
  }

  // Validate email
  if (!emailInput.value.trim()) {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  if (!passwordInput.value.trim()) {
    showError(passwordInput, "Password is required");
    isValid = false;
  } else if (!validatePassword(passwordInput.value.trim())) {
    showError(
      passwordInput,
      "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
    );
    isValid = false;
  }

  // Validate confirm password
  if (!confirmPasswordInput.value.trim()) {
    showError(confirmPasswordInput, "Please confirm your password");
    isValid = false;
  } else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
    showError(confirmPasswordInput, "Passwords do not match");
    isValid = false;
  }

  return isValid;
}

function initializeFormValidation() {
  // Login form validation
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Always prevent default first
      if (!validateLoginForm()) {
        return false; // Validation failed, don't submit
      }
      // Validation passed, submit the form
      this.submit();
    });

    // Real-time validation
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (emailInput) {
      emailInput.addEventListener("blur", function () {
        clearError(this);
        if (!this.value.trim()) {
          showError(this, "Email is required");
        } else if (!validateEmail(this.value.trim())) {
          showError(this, "Please enter a valid email address");
        }
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener("blur", function () {
        clearError(this);
        if (!this.value.trim()) {
          showError(this, "Password is required");
        }
      });
    }
  }

  // Signup form validation
  const signupForm = document.querySelector("#signup form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      if (!validateSignupForm()) {
        e.preventDefault();
      }
    });

    // Real-time validation
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    if (fullnameInput) {
      fullnameInput.addEventListener("blur", function () {
        clearError(this);
        if (!this.value.trim()) {
          showError(this, "Full name is required");
        } else if (this.value.trim().length < 2) {
          showError(this, "Full name must be at least 2 characters");
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener("blur", function () {
        clearError(this);
        if (!this.value.trim()) {
          showError(this, "Email is required");
        } else if (!validateEmail(this.value.trim())) {
          showError(this, "Please enter a valid email address");
        }
      });
    }

    if (passwordInput) {
      passwordInput.addEventListener("blur", function () {
        clearError(this);
        if (!this.value.trim()) {
          showError(this, "Password is required");
        } else if (!validatePassword(this.value.trim())) {
          showError(
            this,
            "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
          );
        }
      });
    }

    if (confirmPasswordInput) {
      confirmPasswordInput.addEventListener("blur", function () {
        clearError(this);
        if (!this.value.trim()) {
          showError(this, "Please confirm your password");
        } else if (this.value.trim() !== passwordInput.value.trim()) {
          showError(this, "Passwords do not match");
        }
      });
    }
  }
}
