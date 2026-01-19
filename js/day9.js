/**
 * Day 9 - Arrays & Objects Mastery
 * Topics covered:
 * - Array methods (push, pop, shift, unshift, splice, map, filter, reduce)
 * - Array searching and iteration
 * - Object manipulation and methods
 * - Destructuring and spread operator
 * - Nested data structures
 */

// ==========================================
// ARRAYS - METHODS AND OPERATIONS
// ==========================================

let arr = [1, 2, 3, 4, 5];
let fruits = ["apple", "banana", "orange"];

console.log("Array length:", arr.length);

// Adding/Removing elements
arr.push(6);
console.log("After push:", arr);

arr.pop();
console.log("After pop:", arr);

arr.unshift(0);
console.log("After unshift:", arr);

arr.shift();
console.log("After shift:", arr);

arr.splice(2, 1, 10, 11);
console.log("After splice:", arr);

// Array searching
console.log("indexOf banana:", fruits.indexOf("banana"));
console.log("includes mango:", fruits.includes("mango"));
console.log(
  "find value > 3:",
  arr.find((x) => x > 3),
);
console.log(
  "findIndex value > 3:",
  arr.findIndex((x) => x > 3),
);

// Array transformation
console.log(
  "map - double values:",
  arr.map((x) => x * 2),
);
console.log(
  "filter - values > 2:",
  arr.filter((x) => x > 2),
);
console.log(
  "reduce - sum:",
  arr.reduce((sum, x) => sum + x, 0),
);

// Array sorting and reversing
console.log(
  "sort descending:",
  [...arr].sort((a, b) => b - a),
);
console.log("reverse:", [...arr].reverse());

// Combining arrays
console.log("concat:", arr.concat([7, 8]));
console.log("join with comma:", fruits.join(", "));
console.log("slice(1, 4):", arr.slice(1, 4));

// Array testing
console.log(
  "every value > 0:",
  arr.every((x) => x > 0),
);
console.log(
  "some value > 10:",
  arr.some((x) => x > 10),
);

// Array iteration
arr.forEach((val, idx) => console.log(`forEach: ${idx}=${val}`));

// Other operations
console.log("flat nested arrays:", [1, [2, [3, 4]]].flat(2));
console.log("Array.from string:", Array.from("hello"));
console.log("Array.isArray check:", Array.isArray(arr));

// ==========================================
// OBJECTS - MANIPULATION AND OPERATIONS
// ==========================================

let person = {
  name: "Rahul",
  age: 25,
  city: "Mumbai",
  skills: ["JavaScript", "React"],
};

// Accessing object properties
console.log("Dot notation:", person.name);
console.log("Bracket notation:", person["age"]);

// Modifying object
person.email = "rahul@example.com";
person.age = 26;
delete person.city;

// Object methods
console.log("Object.keys:", Object.keys(person));
console.log("Object.values:", Object.values(person));
console.log("Object.entries:", Object.entries(person));
console.log("Object.assign:", Object.assign(person, { country: "India" }));

// Property checking
console.log("hasOwnProperty name:", person.hasOwnProperty("name"));

// Freezing and sealing objects
let frozen = Object.freeze({ status: "frozen" });
let sealed = Object.seal({ status: "sealed" });

// ==========================================
// DESTRUCTURING & SPREAD OPERATOR
// ==========================================

let { name, age } = person;
console.log("Destructured:", name, age);

let updated = { ...person, age: 27, country: "India" };
console.log("Spread operator:", updated);

// ==========================================
// NESTED DATA STRUCTURES
// ==========================================

let company = {
  name: "Tech Corp",
  location: { city: "Bangalore", country: "India" },
  employees: [{ name: "Amit", role: "Dev" }],
};

console.log("Nested access:", company.location.city);

// Object iteration
Object.keys(person).forEach((k) => console.log(`Key: ${k}`));
Object.values(person).forEach((v) => console.log(`Value: ${v}`));
Object.entries(person).forEach(([k, v]) => console.log(`${k}=${v}`));

console.log("\n=== Arrays & Objects Mastery Complete ===");
