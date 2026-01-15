console.log("=== ARRAYS ===\n");

let arr = [1, 2, 3, 4, 5];
let fruits = ["apple", "banana", "orange"];

// Array Properties
console.log("Length:", arr.length);

// Adding/Removing
arr.push(6); // Add to end
console.log(arr);

arr.pop(); // Remove from end
console.log(arr);

arr.unshift(0); // Add to start
console.log(arr);

arr.shift(); // Remove from start
console.log(arr);

arr.splice(2, 1, 10, 11); // Remove/add at index
console.log(arr);

// Searching
console.log("indexOf:", fruits.indexOf("banana"));
console.log("includes:", fruits.includes("mango"));
console.log(
  "find:",
  arr.find((x) => x > 3)
);
console.log(
  "findIndex:",
  arr.findIndex((x) => x > 3)
);

// Transformation
console.log(
  "map:",
  arr.map((x) => x * 2)
);
console.log(
  "filter:",
  arr.filter((x) => x > 2)
);
console.log(
  "reduce:",
  arr.reduce((sum, x) => sum + x, 0)
);
console.log(
  "sort:",
  [...arr].sort((a, b) => b - a)
);
console.log("reverse:", [...arr].reverse());

// Combining
console.log("concat:", arr.concat([7, 8]));
console.log("join:", fruits.join(", "));
console.log("slice:", arr.slice(1, 4));

// Testing
console.log(
  "every:",
  arr.every((x) => x > 0)
);
console.log(
  "some:",
  arr.some((x) => x > 10)
);

// Iteration
arr.forEach((val, idx) => console.log(`forEach: ${idx}=${val}`));

// Other
console.log("flat:", [1, [2, [3, 4]]].flat(2));
console.log("Array.from:", Array.from("hello"));
console.log("Array.isArray:", Array.isArray(arr));

// ========================================
console.log("\n=== OBJECTS ===\n");

let person = {
  name: "Rahul",
  age: 25,
  city: "Mumbai",
  skills: ["JavaScript", "React"],
};

// Accessing
console.log("Dot notation:", person.name);
console.log("Bracket notation:", person["age"]);

// Adding/Modifying/Deleting
person.email = "rahul@example.com";
person.age = 26;
delete person.city;

// Object Methods
console.log("Object.keys:", Object.keys(person));
console.log("Object.values:", Object.values(person));
console.log("Object.entries:", Object.entries(person));
console.log("Object.assign:", Object.assign(person, { country: "India" }));

// Checking
console.log("hasOwnProperty:", person.hasOwnProperty("name"));

// Object.freeze & Object.seal
let frozen = Object.freeze({ status: "frozen" });
let sealed = Object.seal({ status: "sealed" });

// Destructuring
let { name, age } = person;
console.log("Destructured:", name, age);

// Spread Operator
let updated = { ...person, age: 27, country: "india" };
console.log("Spread:", updated);

// Nested Objects
let company = {
  name: "Tech Corp",
  location: { city: "Bangalore", country: "India" },
  employees: [{ name: "Amit", role: "Dev" }],
};
console.log("Nested access:", company.location.city);

// Object Iteration
Object.keys(person).forEach((k) => console.log(`Key: ${k}`));
Object.values(person).forEach((v) => console.log(`Value: ${v}`));
Object.entries(person).forEach(([k, v]) => console.log(`${k}=${v}`));

console.log("\n=== COMPLETE ===");
