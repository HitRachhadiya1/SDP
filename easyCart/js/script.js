// EasyCart JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
  console.log("EasyCart website loaded successfully");

  // Options popup functionality
  initializeOptionsPopup();

  // Mobile menu functionality
  initializeMobileMenu();

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
        navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)
    ) {
        navMenu.classList.remove('active');
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
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
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

// Example of future functionality that could be added:
// - Shopping cart management
// - Form validation
// - Dynamic content loading
// - Search functionality
// - User authentication
// - Product filtering and sorting
