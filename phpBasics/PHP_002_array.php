<?php

/**
 * ========================================
 * Task ID: PHP-002 (ENHANCED VERSION)
 * Topic: Arrays - Deep Understanding
 * ========================================
 * This enhanced version includes:
 * - Indexed arrays vs Associative arrays
 * - Multidimensional arrays
 * - Array manipulation functions
 * - print_r vs var_dump vs var_export
 * - Array iteration methods
 * - Array sorting and filtering
 * - Real-world array examples
 */

echo "<h1 style='color: #667eea;'>PHP-002: Arrays - Deep Dive 🚀</h1>";
echo "<hr>";

// ============================================
// SECTION 1: TYPES OF ARRAYS
// ============================================
echo "<h2>Section 1: Types of Arrays in PHP</h2>";

// 1. INDEXED ARRAY (Numeric keys starting from 0)
echo "<h3>1️⃣ Indexed Array (Numeric Keys)</h3>";
$fruits = ["Apple", "Banana", "Cherry", "Date"];
echo "<pre>";
print_r($fruits);
echo "</pre>";
echo "Access first item: " . $fruits[0] . "<br>";
echo "Access last item: " . $fruits[3] . "<br>";
echo "Total items: " . count($fruits) . "<br><br>";

// 2. ASSOCIATIVE ARRAY (String keys)
echo "<h3>2️⃣ Associative Array (String Keys)</h3>";
$person = [
    "name" => "Rahul Sharma",
    "age" => 23,
    "city" => "Mumbai",
    "country" => "India"
];
echo "<pre>";
print_r($person);
echo "</pre>";
echo "Access name: " . $person["name"] . "<br>";
echo "Access age: " . $person["age"] . "<br><br>";

// 3. MULTIDIMENSIONAL ARRAY (Array inside array)
echo "<h3>3️⃣ Multidimensional Array (Nested Arrays)</h3>";
$students = [
    [
        "name" => "Rahul",
        "age" => 23,
        "marks" => [85, 90, 88]
    ],
    [
        "name" => "Priya",
        "age" => 22,
        "marks" => [92, 88, 95]
    ],
    [
        "name" => "Amit",
        "age" => 24,
        "marks" => [78, 85, 82]
    ]
];
echo "<pre>";
print_r($students);
echo "</pre>";
echo "First student name: " . $students[0]["name"] . "<br>";
echo "Second student's first mark: " . $students[1]["marks"][0] . "<br>";
echo "Third student's average: " . array_sum($students[2]["marks"]) / count($students[2]["marks"]) . "<br><br>";

// ============================================
// SECTION 2: DEBUGGING FUNCTIONS COMPARISON
// ============================================
echo "<h2>Section 2: Debugging Functions - print_r vs var_dump vs var_export</h2>";

$debugArray = [
    "name" => "Test User",
    "age" => 25,
    "active" => true,
    "salary" => 50000.50,
    "skills" => ["PHP", "MySQL"]
];

echo "<h3>🔍 1. print_r() - Human Readable Structure</h3>";
echo "<strong>Use Case:</strong> Quick view of array structure<br>";
echo "<pre>";
print_r($debugArray);
echo "</pre>";
echo "<div style='background: #e8f5e9; padding: 10px; border-left: 4px solid #4caf50;'>";
echo "✅ Shows: Keys and values in readable format<br>";
echo "❌ Doesn't show: Data types, string lengths";
echo "</div><br>";

echo "<h3>🔍 2. var_dump() - Complete Information</h3>";
echo "<strong>Use Case:</strong> Detailed debugging with types and sizes<br>";
echo "<pre>";
var_dump($debugArray);
echo "</pre>";
echo "<div style='background: #e3f2fd; padding: 10px; border-left: 4px solid #2196f3;'>";
echo "✅ Shows: Data types, string lengths, array sizes<br>";
echo "✅ Most detailed output<br>";
echo "✅ Best for debugging type issues";
echo "</div><br>";

echo "<h3>🔍 3. var_export() - Valid PHP Code</h3>";
echo "<strong>Use Case:</strong> Generate PHP code from array<br>";
echo "<pre>";
var_export($debugArray);
echo "</pre>";
echo "<div style='background: #fff3cd; padding: 10px; border-left: 4px solid #ffc107;'>";
echo "✅ Shows: Valid PHP code that can be copied<br>";
echo "✅ Good for generating config files";
echo "</div><br>";

// Comparison table
echo "<h4>📊 Comparison Table:</h4>";
echo "<table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; width: 100%;'>";
echo "<tr style='background: #667eea; color: white;'>";
echo "<th>Function</th><th>Shows Types?</th><th>Shows Sizes?</th><th>Returns Value?</th><th>Best For</th></tr>";
echo "<tr><td>print_r()</td><td>❌ No</td><td>❌ No</td><td>✅ Yes (with true)</td><td>Quick structure view</td></tr>";
echo "<tr><td>var_dump()</td><td>✅ Yes</td><td>✅ Yes</td><td>❌ No</td><td>Detailed debugging</td></tr>";
echo "<tr><td>var_export()</td><td>✅ Yes</td><td>❌ No</td><td>✅ Yes (with true)</td><td>Code generation</td></tr>";
echo "</table><br><br>";

// ============================================
// SECTION 3: ARRAY CREATION METHODS
// ============================================
echo "<h2>Section 3: Different Ways to Create Arrays</h2>";

// Method 1: Short syntax (Modern PHP 5.4+)
echo "<h4>Method 1: Short Syntax [] (Recommended)</h4>";
$colors1 = ["Red", "Green", "Blue"];
echo "<pre>print_r(['Red', 'Green', 'Blue']);</pre>";

// Method 2: array() function (Old style)
echo "<h4>Method 2: array() Function (Old Style)</h4>";
$colors2 = array("Red", "Green", "Blue");
echo "<pre>print_r(array('Red', 'Green', 'Blue'));</pre>";

// Method 3: Adding elements one by one
echo "<h4>Method 3: Adding Elements Individually</h4>";
$colors3 = [];
$colors3[0] = "Red";
$colors3[1] = "Green";
$colors3[2] = "Blue";
echo "<pre>";
print_r($colors3);
echo "</pre>";

// Method 4: Using array_push
echo "<h4>Method 4: Using array_push()</h4>";
$colors4 = [];
array_push($colors4, "Red", "Green", "Blue");
echo "<pre>";
print_r($colors4);
echo "</pre><br>";

// ============================================
// SECTION 4: ACCESSING ARRAY ELEMENTS
// ============================================
echo "<h2>Section 4: Accessing Array Elements</h2>";

$student = [
    "name" => "Priya Patel",
    "age" => 22,
    "skills" => ["PHP", "MySQL", "Laravel", "React"],
    "grades" => [
        "math" => 85,
        "science" => 90,
        "english" => 88
    ],
    "enrolled" => true
];

echo "<h4>Single Values:</h4>";
echo "Name: " . $student["name"] . "<br>";
echo "Age: " . $student["age"] . "<br>";
echo "Enrolled: " . ($student["enrolled"] ? "Yes" : "No") . "<br><br>";

echo "<h4>Array Values:</h4>";
echo "All Skills: " . implode(", ", $student["skills"]) . "<br>";
echo "First Skill: " . $student["skills"][0] . "<br>";
echo "Last Skill: " . $student["skills"][count($student["skills"]) - 1] . "<br><br>";

echo "<h4>Nested Array Values:</h4>";
echo "Math Grade: " . $student["grades"]["math"] . "<br>";
echo "Science Grade: " . $student["grades"]["science"] . "<br>";
echo "Average Grade: " . array_sum($student["grades"]) / count($student["grades"]) . "<br><br>";

// ============================================
// SECTION 5: ARRAY MANIPULATION FUNCTIONS
// ============================================
echo "<h2>Section 5: Essential Array Functions</h2>";

$numbers = [1, 2, 3, 4, 5];

echo "<h4>Original Array:</h4>";
echo "<pre>";
print_r($numbers);
echo "</pre>";

// Count
echo "<strong>count():</strong> " . count($numbers) . " elements<br>";

// Array push (add to end)
array_push($numbers, 6, 7);
echo "<strong>After array_push(6, 7):</strong> " . implode(", ", $numbers) . "<br>";

// Array pop (remove from end)
$lastItem = array_pop($numbers);
echo "<strong>After array_pop():</strong> " . implode(", ", $numbers) . " (removed: $lastItem)<br>";

// Array unshift (add to beginning)
array_unshift($numbers, 0);
echo "<strong>After array_unshift(0):</strong> " . implode(", ", $numbers) . "<br>";

// Array shift (remove from beginning)
$firstItem = array_shift($numbers);
echo "<strong>After array_shift():</strong> " . implode(", ", $numbers) . " (removed: $firstItem)<br>";

// In array (check existence)
echo "<strong>in_array(3):</strong> " . (in_array(3, $numbers) ? "Found" : "Not found") . "<br>";
echo "<strong>in_array(99):</strong> " . (in_array(99, $numbers) ? "Found" : "Not found") . "<br>";

// Array search (get index)
$position = array_search(4, $numbers);
echo "<strong>array_search(4):</strong> Found at index $position<br>";

// Array merge
$moreNumbers = [8, 9, 10];
$merged = array_merge($numbers, $moreNumbers);
echo "<strong>After array_merge([8,9,10]):</strong> " . implode(", ", $merged) . "<br><br>";

// ============================================
// SECTION 6: ARRAY ITERATION METHODS
// ============================================
echo "<h2>Section 6: Different Ways to Loop Through Arrays</h2>";

$languages = [
    "PHP" => "Backend",
    "JavaScript" => "Frontend",
    "Python" => "Data Science",
    "Java" => "Enterprise"
];

echo "<h4>Method 1: foreach with key => value</h4>";
echo "<pre>";
foreach ($languages as $lang => $use) {
    echo "$lang is used for $use\n";
}
echo "</pre>";

echo "<h4>Method 2: foreach with values only</h4>";
$fruits = ["Apple", "Banana", "Cherry"];
echo "<pre>";
foreach ($fruits as $fruit) {
    echo "- $fruit\n";
}
echo "</pre>";

echo "<h4>Method 3: for loop with indexed array</h4>";
echo "<pre>";
for ($i = 0; $i < count($fruits); $i++) {
    echo ($i + 1) . ". $fruits[$i]\n";
}
echo "</pre>";

// ============================================
// SECTION 7: ARRAY SORTING
// ============================================
echo "<h2>Section 7: Sorting Arrays</h2>";

$values = [5, 2, 8, 1, 9, 3];
echo "<h4>Original: " . implode(", ", $values) . "</h4>";

// Sort ascending
$sorted = $values;
sort($sorted);
echo "<strong>sort() - Ascending:</strong> " . implode(", ", $sorted) . "<br>";

// Sort descending
$sortedDesc = $values;
rsort($sortedDesc);
echo "<strong>rsort() - Descending:</strong> " . implode(", ", $sortedDesc) . "<br><br>";

// Associative array sorting
$ages = ["Rahul" => 23, "Priya" => 22, "Amit" => 25, "Neha" => 21];
echo "<h4>Associative Array Sorting:</h4>";
echo "Original: ";
echo "<pre>";
print_r($ages);
echo "</pre>";

// Sort by value (asort)
$sortedByValue = $ages;
asort($sortedByValue);
echo "<strong>asort() - By value, keep keys:</strong>";
echo "<pre>";
print_r($sortedByValue);
echo "</pre>";

// Sort by key (ksort)
$sortedByKey = $ages;
ksort($sortedByKey);
echo "<strong>ksort() - By key:</strong>";
echo "<pre>";
print_r($sortedByKey);
echo "</pre><br>";

// ============================================
// SECTION 8: MULTIDIMENSIONAL ARRAYS DEEP DIVE
// ============================================
echo "<h2>Section 8: Working with Multidimensional Arrays</h2>";

$products = [
    [
        "id" => 1,
        "name" => "Laptop",
        "price" => 45000,
        "specs" => ["RAM" => "16GB", "Storage" => "512GB SSD"]
    ],
    [
        "id" => 2,
        "name" => "Mouse",
        "price" => 500,
        "specs" => ["Type" => "Wireless", "DPI" => "1600"]
    ],
    [
        "id" => 3,
        "name" => "Keyboard",
        "price" => 2000,
        "specs" => ["Type" => "Mechanical", "Switches" => "Blue"]
    ]
];

echo "<h4>All Products:</h4>";
echo "<pre>";
print_r($products);
echo "</pre>";

echo "<h4>Accessing Nested Data:</h4>";
echo "First product name: " . $products[0]["name"] . "<br>";
echo "First product price: Rs. " . $products[0]["price"] . "<br>";
echo "Laptop RAM: " . $products[0]["specs"]["RAM"] . "<br>";
echo "Mouse Type: " . $products[1]["specs"]["Type"] . "<br><br>";

echo "<h4>Looping Through Multidimensional Array:</h4>";
foreach ($products as $product) {
    echo "<div style='background: #f5f5f5; padding: 10px; margin: 10px 0; border-left: 4px solid #667eea;'>";
    echo "<strong>Product:</strong> " . $product["name"] . "<br>";
    echo "<strong>Price:</strong> Rs. " . $product["price"] . "<br>";
    echo "<strong>Specs:</strong><br>";
    foreach ($product["specs"] as $key => $value) {
        echo "  - $key: $value<br>";
    }
    echo "</div>";
}
echo "<br>";

// ============================================
// SECTION 9: ADVANCED ARRAY FUNCTIONS
// ============================================
echo "<h2>Section 9: Advanced Array Functions</h2>";

$data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// array_filter - Filter even numbers
echo "<h4>array_filter() - Get Even Numbers:</h4>";
$evenNumbers = array_filter($data, function ($num) {
    return $num % 2 == 0;
});
echo "Original: " . implode(", ", $data) . "<br>";
echo "Even numbers: " . implode(", ", $evenNumbers) . "<br><br>";

// array_map - Double each number
echo "<h4>array_map() - Double Each Number:</h4>";
$doubled = array_map(function ($num) {
    return $num * 2;
}, $data);
echo "Original: " . implode(", ", $data) . "<br>";
echo "Doubled: " . implode(", ", $doubled) . "<br><br>";

// array_reduce - Sum all numbers
echo "<h4>array_reduce() - Sum All Numbers:</h4>";
$sum = array_reduce($data, function ($carry, $item) {
    return $carry + $item;
}, 0);
echo "Numbers: " . implode(", ", $data) . "<br>";
echo "Sum: $sum<br><br>";

// array_slice - Get portion
echo "<h4>array_slice() - Get Elements 3-6:</h4>";
$portion = array_slice($data, 2, 4);
echo "Portion: " . implode(", ", $portion) . "<br><br>";

// array_chunk - Split into groups
echo "<h4>array_chunk() - Split into Groups of 3:</h4>";
$chunks = array_chunk($data, 3);
echo "<pre>";
print_r($chunks);
echo "</pre><br>";

// ============================================
// SECTION 10: REAL-WORLD EXAMPLES
// ============================================
echo "<h2>Section 10: Real-World Array Examples</h2>";

// Example 1: Shopping Cart
echo "<h4>Example 1: Shopping Cart</h4>";
$cart = [
    ["product" => "Laptop", "price" => 45000, "quantity" => 1],
    ["product" => "Mouse", "price" => 500, "quantity" => 2],
    ["product" => "Keyboard", "price" => 2000, "quantity" => 1]
];

$total = 0;
echo "<table border='1' cellpadding='10' style='border-collapse: collapse;'>";
echo "<tr style='background: #667eea; color: white;'><th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th></tr>";
foreach ($cart as $item) {
    $subtotal = $item["price"] * $item["quantity"];
    $total += $subtotal;
    echo "<tr>";
    echo "<td>{$item['product']}</td>";
    echo "<td>Rs. {$item['price']}</td>";
    echo "<td>{$item['quantity']}</td>";
    echo "<td>Rs. $subtotal</td>";
    echo "</tr>";
}
echo "<tr style='background: #f0f0f0; font-weight: bold;'>";
echo "<td colspan='3'>Total</td><td>Rs. $total</td>";
echo "</tr>";
echo "</table><br><br>";

// Example 2: Student Grades
echo "<h4>Example 2: Student Report Card</h4>";
$studentGrades = [
    "Math" => 85,
    "Science" => 92,
    "English" => 78,
    "History" => 88,
    "Computer" => 95
];

$totalMarks = array_sum($studentGrades);
$average = $totalMarks / count($studentGrades);

echo "Grades:<br>";
foreach ($studentGrades as $subject => $marks) {
    echo "$subject: $marks<br>";
}
echo "<br>";
echo "Total Marks: $totalMarks<br>";
echo "Average: " . round($average, 2) . "<br>";
echo "Grade: ";
if ($average >= 90) echo "A+";
elseif ($average >= 80) echo "A";
elseif ($average >= 70) echo "B";
else echo "C";
echo "<br><br>";
