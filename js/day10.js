/**
 * Day 10 - DOM Concepts & Security Masterclass
 * Topics covered:
 * - Selectors: Live vs Static collections
 * - Content access methods (innerText vs textContent vs innerHTML)
 * - XSS prevention and security
 * - DOM styling and attribute manipulation
 * - Event listeners and the event object
 */

"use strict";

// ==========================================
// LOGIC 1: LIVE vs STATIC COLLECTIONS
// ==========================================
const listContainer = document.querySelector("#list-container");
const selectorOutput = document.querySelector("#selector-output");

// STATIC: Takes a snapshot NOW. Will not see future additions.
const staticList = document.querySelectorAll(".list-item");

// LIVE: References the live DOM. Will see future additions.
const liveList = document.getElementsByClassName("list-item");

document.querySelector("#btn-add-item").addEventListener("click", () => {
  const newItem = document.createElement("li");
  newItem.className = "list-item";
  newItem.textContent = "New Item";
  listContainer.appendChild(newItem);

  // Visual feedback using console styling
  console.log("new %c Item Added to DOM ", "background: green; color: white");
});

document.querySelector("#btn-check-length").addEventListener("click", () => {
  const msg = `
Step 1: querySelectorAll count: ${staticList.length} (Static - stays same)
Step 2: getElementsByClassName count: ${liveList.length} (Live - updates!)
            `;
  selectorOutput.textContent = msg.trim();

  console.table({
    Method: ["querySelectorAll", "getElementsByClassName"],
    Type: ["NodeList (Static)", "HTMLCollection (Live)"],
    Count: [staticList.length, liveList.length],
  });
});

// ==========================================
// LOGIC 2: TEXT ACCESS METHODS
// ==========================================
const textDemoBox = document.querySelector("#text-demo-box");
const textOutput = document.querySelector("#text-output");

document.querySelector("#btn-compare-text").addEventListener("click", () => {
  // innerText: Ignores the hidden span
  const valInnerText = textDemoBox.innerText;

  // textContent: Includes hidden text, no bold tags
  const valTextContent = textDemoBox.textContent;

  // innerHTML: Includes everything including tags
  const valInnerHTML = textDemoBox.innerHTML;

  textOutput.textContent = `
1. innerText (Visible only): 
   "${valInnerText}"

2. textContent (Raw Source):    
   "${valTextContent}"

3. innerHTML (HTML Code): 
   "${valInnerHTML}"
            `;
});

// ==========================================
// LOGIC 3: XSS PREVENTION
// ==========================================
const xssInput = document.querySelector("#xss-input");
const xssResult = document.querySelector("#xss-result");

document.querySelector("#btn-safe").addEventListener("click", () => {
  // SAFE: textContent treats the input as a dumb string.
  // HTML tags are NOT executed.
  xssResult.textContent = xssInput.value;
  xssResult.style.color = "green";
  console.info("Rendered safely using textContent.");
});

document.querySelector("#btn-unsafe").addEventListener("click", () => {
  // DANGER: innerHTML parses the string.
  // If it contains <img onerror...>, script runs immediately.
  try {
    xssResult.innerHTML = xssInput.value;
    xssResult.style.color = "red";
    console.warn("Rendered dangerously using innerHTML.");
  } catch (e) {
    console.error("Error during unsafe render:", e);
  }
});

// Styling

const profileBox = document.querySelector("#profile-box");
const btn = document.querySelector("#btn-convert");

btn.addEventListener("click", () => {
  // ==========================================
  // 1. MANIPULATING STYLES (style.property)
  // ==========================================

  profileBox.style.textAlign = "center";

  // Change shape to circle
  profileBox.style.borderRadius = "50%";

  // Change background color
  profileBox.style.backgroundColor = "#ff5722"; // Orange

  // Change text color
  profileBox.style.color = "white";

  // Add a border
  profileBox.style.border = "5px solid white";

  // Add a shadow (box-shadow becomes boxShadow)
  profileBox.style.boxShadow = "0 10px 15px rgba(0,0,0,0.3)";

  // ==========================================
  // 2. MANIPULATING CONTENT & ATTRIBUTES
  // ==========================================

  // Change the text inside
  profileBox.textContent = "JS"; // Initials

  // Add a tooltip using setAttribute (hover over the circle to see it)
  profileBox.setAttribute("title", "User: John Smith");

  // Log the changes to console
  console.log("New Style:", profileBox.style.borderRadius);
  console.log("New Attribute (title):", profileBox.getAttribute("title"));
});

// ==========================================
// LOGIC 4: EVENT LISTENERS
// ==========================================

// --- Demo A: The Event Object ---
const eventBtn = document.querySelector("#btn-event-details");
const eventSpan = document.querySelector("#event-span");

eventBtn.addEventListener("click", (e) => {
  // 'e' is the Event Object containing all details
  console.log("Event Object:", e);
  console.log("Target Element:", e.target);

  eventSpan.textContent = e.target.id; // Displays "btn-event-details"
  eventSpan.style.color = "blue";
});
// --- Demo B: Form Submit & Prevent Default ---
const demoForm = document.querySelector("#demo-form");
const formMsg = document.querySelector("#form-msg");
const formInput = document.querySelector("#form-input");

demoForm.addEventListener("submit", (e) => {
  // 🛑 STOP the page from refreshing
  e.preventDefault();

  const value = formInput.value;

  if (value) {
    formMsg.textContent = `✅ Success! You typed: "${value}"`;
    formMsg.style.color = "green";
    console.log("Form Data Submitted:", value);
  } else {
    formMsg.textContent = "❌ Error: Please type something first.";
    formMsg.style.color = "red";
  }
});

// --- Demo C: Mouse Events ---
const hoverBox = document.querySelector("#hover-box");

hoverBox.addEventListener("mouseover", () => {
  hoverBox.style.backgroundColor = "#ffeb3b"; // Yellow
  // hoverBox.style.color = "black";
  hoverBox.textContent = "I see you! 👀";
});

hoverBox.addEventListener("mouseout", () => {
  hoverBox.style.backgroundColor = "#e2e8f0"; // Back to gray
  hoverBox.style.color = "black";
  hoverBox.textContent = "Hover Me";
});

// --- Demo D: Keyboard Events (Global) ---
const keyDisplay = document.querySelector("#key-display");
const keyCodeDisplay = document.querySelector("#key-code-display");

document.addEventListener("keydown", (e) => {
  keyDisplay.textContent = `You pressed: "${e.key}"`;
  keyCodeDisplay.textContent = `Key: ${e.key} | Code: ${e.code}`;

  if (e.key === "Enter") {
    keyDisplay.style.color = "yellow";
    console.log("Enter key detected");
  } else if (e.key === "Escape") {
    keyDisplay.style.color = "red";
    console.log("Escape key detected");
  } else {
    keyDisplay.style.color = "#4ade80";
  }
});
