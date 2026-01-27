// Checkout Page JavaScript
// Contains functionality specific to the checkout page

document.addEventListener("DOMContentLoaded", function () {
  console.log("Checkout page JavaScript loaded");

  // Initialize shipping cost updates
  initializeShippingUpdates();

  // Initialize form validation
  initializeCheckoutValidation();
});

// Update shipping cost and total when shipping method changes
function calculateShippingCost(method, subtotal) {
  switch (method) {
    case "express":
      return Math.min(80, subtotal * 0.1);
    case "white_glove":
      return Math.min(150, subtotal * 0.05);
    case "freight":
      return Math.max(200, subtotal * 0.03);
    case "standard":
    default:
      return 40;
  }
}

function formatCurrency(value) {
  return `₹${value.toFixed(2)}`;
}

function initializeShippingUpdates() {
  const shippingInputs = document.querySelectorAll("input[name='shipping']");
  const subtotalEl = document.getElementById("summary-subtotal");
  const taxEl = document.getElementById("summary-tax");
  const shippingEl = document.getElementById("summary-shipping");
  const totalEl = document.getElementById("summary-total");

  if (
    !shippingInputs.length ||
    !subtotalEl ||
    !taxEl ||
    !shippingEl ||
    !totalEl
  ) {
    return;
  }

  const subtotal = parseFloat(subtotalEl.dataset.subtotal || "0");
  const taxRate = parseFloat(taxEl.dataset.taxRate || "0");

  const updateSummary = () => {
    const selected = document.querySelector("input[name='shipping']:checked");
    const method = selected ? selected.value : "standard";
    const shippingCost = calculateShippingCost(method, subtotal);
    const tax = (subtotal + shippingCost) * taxRate;
    const total = subtotal + shippingCost + tax;

    shippingEl.textContent = formatCurrency(shippingCost);
    taxEl.textContent = formatCurrency(tax);
    totalEl.textContent = formatCurrency(total);
  };

  shippingInputs.forEach((input) => {
    input.addEventListener("change", updateSummary);
  });

  updateSummary();
}

// Checkout form validation functions
function validatePhone(phone) {
  // Basic phone validation: 10-15 digits, may include spaces, dashes, parentheses
  const phoneRegex = /^[\+]?[1-9][\d\s\-\(\)]{8,14}[\d]$/;
  return phoneRegex.test(phone);
}

function validateCardNumber(cardNumber) {
  // Remove spaces and check if it's 13-19 digits (basic card number validation)
  const cleaned = cardNumber.replace(/\s+/g, "");
  const cardRegex = /^\d{13,19}$/;
  return cardRegex.test(cleaned);
}

function validateExpiry(expiry) {
  // Check MM/YY format
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiry)) return false;

  // Check if the date is not in the past
  const [month, year] = expiry.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
  const currentMonth = currentDate.getMonth() + 1;

  const expYear = parseInt(year);
  const expMonth = parseInt(month);

  if (
    expYear < currentYear ||
    (expYear === currentYear && expMonth < currentMonth)
  ) {
    return false;
  }

  return true;
}

function validateCVV(cvv) {
  // CVV should be 3 or 4 digits
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
}

function validateCheckoutForm() {
  let isValid = true;

  // Clear all previous errors
  document
    .querySelectorAll(".checkout-form .error-message")
    .forEach((error) => error.remove());
  document
    .querySelectorAll(".checkout-form .error")
    .forEach((field) => field.classList.remove("error"));

  // Validate shipping information
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const zipcode = document.getElementById("zipcode");
  const country = document.getElementById("country");

  // First name
  if (!firstname.value.trim()) {
    showCheckoutError(firstname, "First name is required");
    isValid = false;
  } else if (firstname.value.trim().length < 2) {
    showCheckoutError(firstname, "First name must be at least 2 characters");
    isValid = false;
  }

  // Last name
  if (!lastname.value.trim()) {
    showCheckoutError(lastname, "Last name is required");
    isValid = false;
  } else if (lastname.value.trim().length < 2) {
    showCheckoutError(lastname, "Last name must be at least 2 characters");
    isValid = false;
  }

  // Email
  if (!email.value.trim()) {
    showCheckoutError(email, "Email is required");
    isValid = false;
  } else if (!validateEmail(email.value.trim())) {
    showCheckoutError(email, "Please enter a valid email address");
    isValid = false;
  }

  // Phone
  if (!phone.value.trim()) {
    showCheckoutError(phone, "Phone number is required");
    isValid = false;
  } else if (!validatePhone(phone.value.trim())) {
    showCheckoutError(phone, "Please enter a valid phone number");
    isValid = false;
  }

  // Address
  if (!address.value.trim()) {
    showCheckoutError(address, "Address is required");
    isValid = false;
  }

  // City
  if (!city.value.trim()) {
    showCheckoutError(city, "City is required");
    isValid = false;
  }

  // ZIP Code
  if (!zipcode.value.trim()) {
    showCheckoutError(zipcode, "ZIP code is required");
    isValid = false;
  }

  // Country
  if (!country.value) {
    showCheckoutError(country, "Please select a country");
    isValid = false;
  }

  // Validate payment information
  const cardname = document.getElementById("cardname");
  const cardnumber = document.getElementById("cardnumber");
  const expiry = document.getElementById("expiry");
  const cvv = document.getElementById("cvv");
  const terms = document.getElementById("terms");

  // Cardholder name
  if (!cardname.value.trim()) {
    showCheckoutError(cardname, "Cardholder name is required");
    isValid = false;
  }

  // Card number
  if (!cardnumber.value.trim()) {
    showCheckoutError(cardnumber, "Card number is required");
    isValid = false;
  } else if (!validateCardNumber(cardnumber.value.trim())) {
    showCheckoutError(cardnumber, "Please enter a valid card number");
    isValid = false;
  }

  // Expiry date
  if (!expiry.value.trim()) {
    showCheckoutError(expiry, "Expiry date is required");
    isValid = false;
  } else if (!validateExpiry(expiry.value.trim())) {
    showCheckoutError(expiry, "Please enter a valid expiry date (MM/YY)");
    isValid = false;
  }

  // CVV
  if (!cvv.value.trim()) {
    showCheckoutError(cvv, "CVV is required");
    isValid = false;
  } else if (!validateCVV(cvv.value.trim())) {
    showCheckoutError(cvv, "Please enter a valid CVV (3-4 digits)");
    isValid = false;
  }

  // Terms acceptance
  if (!terms.checked) {
    showCheckoutError(terms, "You must agree to the Terms and Conditions");
    isValid = false;
  }

  return isValid;
}

function showCheckoutError(input, message) {
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

function clearCheckoutError(input) {
  const formGroup = input.closest(".form-group");
  const errorElement = formGroup.querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
  }

  input.classList.remove("error");
}

function initializeCheckoutValidation() {
  const checkoutForm = document.querySelector(".checkout-form");

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      if (!validateCheckoutForm()) {
        e.preventDefault();
        // Scroll to first error
        const firstError = document.querySelector(".checkout-form .error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return false;
      }
    });

    // Real-time validation for key fields
    const fieldsToValidate = [
      {
        id: "firstname",
        validator: (val) => val.trim().length >= 2,
        message: "First name must be at least 2 characters",
      },
      {
        id: "lastname",
        validator: (val) => val.trim().length >= 2,
        message: "Last name must be at least 2 characters",
      },
      {
        id: "email",
        validator: (val) => validateEmail(val.trim()),
        message: "Please enter a valid email address",
      },
      {
        id: "phone",
        validator: (val) => validatePhone(val.trim()),
        message: "Please enter a valid phone number",
      },
      {
        id: "cardnumber",
        validator: (val) => validateCardNumber(val.trim()),
        message: "Please enter a valid card number",
      },
      {
        id: "expiry",
        validator: (val) => validateExpiry(val.trim()),
        message: "Please enter a valid expiry date (MM/YY)",
      },
      {
        id: "cvv",
        validator: (val) => validateCVV(val.trim()),
        message: "Please enter a valid CVV (3-4 digits)",
      },
    ];

    fieldsToValidate.forEach(({ id, validator, message }) => {
      const field = document.getElementById(id);
      if (field) {
        field.addEventListener("blur", function () {
          clearCheckoutError(this);
          if (this.value.trim() && !validator(this.value)) {
            showCheckoutError(this, message);
          } else if (!this.value.trim()) {
            const fieldName =
              this.placeholder || this.labels[0]?.textContent || id;
            showCheckoutError(this, `${fieldName} is required`);
          }
        });

        field.addEventListener("input", function () {
          if (this.classList.contains("error")) {
            clearCheckoutError(this);
            if (this.value.trim() && validator(this.value)) {
              // Valid now, remove error
            }
          }
        });
      }
    });

    // Special handling for terms checkbox
    const termsCheckbox = document.getElementById("terms");
    if (termsCheckbox) {
      termsCheckbox.addEventListener("change", function () {
        clearCheckoutError(this);
      });
    }

    // Format card number input (add spaces every 4 digits)
    const cardNumberInput = document.getElementById("cardnumber");
    if (cardNumberInput) {
      cardNumberInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        let formattedValue = "";

        for (let i = 0; i < value.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedValue += " ";
          }
          formattedValue += value[i];
        }

        e.target.value = formattedValue;
      });
    }

    // Format expiry date input (MM/YY)
    const expiryInput = document.getElementById("expiry");
    if (expiryInput) {
      expiryInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length >= 2) {
          value = value.substring(0, 2) + "/" + value.substring(2, 4);
        }

        e.target.value = value;
      });
    }
  }
}
