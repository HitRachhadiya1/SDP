/**
 * Day 8 - Functions & Loops
 * Topics covered:
 * - Function declarations, expressions, and anonymous functions
 * - First-class functions
 * - Callback functions
 * - Loops (for, while, do-while, for-of, for-in)
 * - Arrow functions and closures
 * - Async/await patterns
 */

// First-Class Functions
var firstClassFunc = function (callback) {
  console.log("Passing function as parameter:");
  callback();
};

firstClassFunc(function () {
  console.log("Callback function executed");
});

// ==========================================
// CALLBACK FUNCTION EXAMPLE
// ==========================================

function printStr(str, callback) {
  setTimeout(() => {
    console.log(str);
    callback();
  }, Math.random() * 1000);
}

function printAll() {
  printStr("A", () => {
    printStr("B", () => {
      printStr("C", () => {
        console.log("All tasks completed");
      });
    });
  });
}

printAll();

// ==========================================
// LOOPS
// ==========================================

// For loop
for (let i = 1; i <= 5; i++) {
  console.log("Count: " + i);
}

// While loop
let fuel = 5;
while (fuel > 0) {
  console.log("Driving... Fuel left: " + fuel);
  fuel--;
}
console.log("Stopped.");

// Do-While loop
let number = 10;
do {
  console.log("This prints at least once!");
  number++;
} while (number < 5);

// For-of loop
const colors = ["Red", "Green", "Blue"];

for (const color of colors) {
  console.log(color);
}

// for in
const user = { name: "Alice", age: 25, city: "Paris" };

for (const key in user) {
  console.log(key + ": " + user[key]);
}

// arrow function

const person = {
  name: "Hit",
  sayHello: function () {
    // Standard function: 'this' gets lost in setTimeout, becomes Window/Global
    setTimeout(function () {
      console.log("Hello " + this.name); // Output: "Hello undefined"
    }, 1000);

    // Arrow function: Inherits 'this' from 'person'
    setTimeout(() => {
      console.log("Hello " + this.name); // Output: "Hello Hit" ✅
    }, 1000);
  },
};
person.sayHello();

// clouser

// 6 6 6 6 6 6
function x() {
  for (var i = 1; i <= 5; i++) {
    console.log(i);
    setTimeout(() => {
      console.log(i);
    }, 1000);
  }
  console.log("exit");
}

// 1 2 3 4 5
// function x() {
//   for (let i = 1; i <= 5; i++) {
//     console.log(i);
//     setTimeout(() => {
//       console.log(i);
//     }, 1000);
//   }
//   console.log("exit");
// }

function x() {
  for (var i = 1; i <= 5; i++) {
    console.log(i);
    setTimeout(
      (i) => {
        console.log(i);
      },
      1000,
      i,
    );
  }
  console.log("exit");
}

// function x() {
//   for (var i = 1; i <= 5; i++) {
//     (function (j) {
//       setTimeout(() => {
//         console.log(j);
//       }, 1000);
//     })(i);
//   }
// }

function fetchData(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(num);
      resolve();
    }, 1000);
  });
}

async function run() {
  const arr = [1, 2, 3, 4, 5];

  for (const num of arr) {
    await fetchData(num);
  }

  console.log("Done");
}

run();

const a = function () {};
