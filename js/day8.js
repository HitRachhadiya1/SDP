// function Declaration
function hello() {
  console.log("hello from function declaration");
}

// function expression

const funExp = function () {
  console.log("helllo from function expression");
};

// Anonymous function

// function(){
//     console.log("annunymous");
// }

// They don't have their own identity. So an anonymous function without code inside it results in an error.
// Anonymous functions are used when functions are used as values eg. the code sample for function expression above

// named function expression

var a = function abc() {
  console.log("b called");
};
// a(); // "b called"
// abc(); // Throws ReferenceError:abc is not defined.
// abc function is not created in global scope. So it can't be called.

// first class function

// We can pass functions inside a function as arguments and /or return a function. These ability are altogether known as First class function. It is programming concept available in some other languages too.
var a = function (param) {
  console.log(param); // prints " f() {} "
};
a(function () {
  console.log("hello");
});

// callback function

// function printStr(str) {
//   setTimeout(() => {
//     console.log(str);
//   }, Math.random() * 1000);
// }

// printStr("A");
// printStr("B");
// printStr("C");

function printStr(str, callback) {
  setTimeout(() => {
    console.log(str);
    callback();
  }, Math.random() * 1000);
}

function printAll() {
  printStr("A", () => {
    printStr("B", () => {
      printStr("C", () => {});
    });
  });
}

// async function printAll() {
//   await printStr("A");
//   await printStr("B");
//   await printStr("C");
// }

printAll();

// loops

//for
for (let i = 1; i <= 5; i++) {
  console.log("Count: " + i);
}
// Output: Count: 1, Count: 2, ... Count: 5

//while
let fuel = 5;

while (fuel > 0) {
  console.log("Driving... Fuel left: " + fuel);
  fuel--; // Decrease fuel
}
console.log("Stopped.");

//do while
let number = 10;

do {
  console.log("This prints at least once!");
  number++;
} while (number < 5); // Condition is false, but it ran once anyway.

// for of
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
      i
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
