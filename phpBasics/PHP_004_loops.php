<?php

/**
 * ========================================
 * Task ID: PHP-004 (ENHANCED VERSION)
 * Topic: Loops - Iteration Techniques
 * ========================================
 * Covers: for, while, do-while, foreach
 * With practical examples and comparisons
 */

echo "<h1 style='color: #667eea;'>PHP-004: Loops - Enhanced Guide 🔄</h1>";
echo "<hr>";

// ============================================
// SECTION 1: FOR LOOP
// ============================================
echo "<h2>Section 1: FOR Loop - When You Know the Count</h2>";

echo "<h3>Basic FOR Loop:</h3>";
echo "<pre>";
for ($i = 1; $i <= 5; $i++) {
    echo "Number: $i\n";
}
echo "</pre>";

echo "<h3>Multiplication Table (Required Task):</h3>";
echo "<pre>";
echo "Multiplication Table for 5:\n";
echo "-------------------------\n";
for ($i = 1; $i <= 10; $i++) {
    $result = 5 * $i;
    echo "5 × $i = $result\n";
}
echo "</pre>";

echo "<h3>Counting Backwards:</h3>";
echo "<pre>";
for ($i = 5; $i >= 1; $i--) {
    echo "Countdown: $i\n";
}
echo "Blast off! 🚀\n";
echo "</pre>";

echo "<h3>Skip Numbers (Step by 2):</h3>";
echo "<pre>";
echo "Even numbers from 0 to 10:\n";
for ($i = 0; $i <= 10; $i += 2) {
    echo "$i ";
}
echo "\n";
echo "</pre>";

echo "<div style='background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3;'>";
echo "<strong>💡 FOR Loop Structure:</strong><br>";
echo "for (initialization; condition; increment) { }<br>";
echo "• initialization: Runs once at start<br>";
echo "• condition: Checked before each iteration<br>";
echo "• increment: Runs after each iteration";
echo "</div><br>";

// ============================================
// SECTION 2: WHILE LOOP
// ============================================
echo "<h2>Section 2: WHILE Loop - When Condition is Unknown</h2>";

echo "<h3>Basic WHILE Loop:</h3>";
echo "<pre>";
$count = 1;
while ($count <= 5) {
    echo "Count: $count\n";
    $count++;
}
echo "</pre>";

echo "<h3>Sum Until Limit:</h3>";
echo "<pre>";
$sum = 0;
$number = 1;

while ($sum < 20) {
    $sum += $number;
    echo "Added $number, Sum: $sum\n";
    $number++;
}
echo "Final sum: $sum\n";
echo "</pre>";

echo "<h3>Password Attempts:</h3>";
echo "<pre>";
$attempts = 0;
$maxAttempts = 3;
$correctPassword = "secret";
$userPassword = "wrong";

while ($attempts < $maxAttempts && $userPassword != $correctPassword) {
    $attempts++;
    echo "Attempt $attempts: Incorrect password\n";
    // Simulate different attempts
    if ($attempts == 2) $userPassword = "secret";
}

if ($userPassword == $correctPassword) {
    echo "Access granted! ✅\n";
} else {
    echo "Maximum attempts reached! ❌\n";
}
echo "</pre><br>";

// ============================================
// SECTION 3: DO-WHILE LOOP
// ============================================
echo "<h2>Section 3: DO-WHILE Loop - Execute At Least Once</h2>";

echo "<h3>Basic DO-WHILE:</h3>";
echo "<pre>";
$i = 1;
do {
    echo "Number: $i\n";
    $i++;
} while ($i <= 5);
echo "</pre>";

echo "<h3>Difference: WHILE vs DO-WHILE:</h3>";
echo "<pre>";
// WHILE - may not execute at all
$x = 10;
echo "WHILE loop (condition false from start):\n";
while ($x < 5) {
    echo "This won't print\n";
}
echo "Nothing printed!\n\n";

// DO-WHILE - executes at least once
$y = 10;
echo "DO-WHILE loop (condition false from start):\n";
do {
    echo "This prints once! Value: $y\n";
} while ($y < 5);
echo "</pre>";

echo "<div style='background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;'>";
echo "<strong>⚠️ Key Difference:</strong><br>";
echo "• WHILE: Checks condition BEFORE executing<br>";
echo "• DO-WHILE: Checks condition AFTER executing (runs at least once)";
echo "</div><br>";

// ============================================
// SECTION 4: FOREACH LOOP
// ============================================
echo "<h2>Section 4: FOREACH Loop - For Arrays</h2>";

echo "<h3>Indexed Array (Required Task):</h3>";
echo "<pre>";
$fruits = ["Apple", "Banana", "Mango", "Orange"];

echo "Method 1: Values only\n";
foreach ($fruits as $fruit) {
    echo "- $fruit\n";
}

echo "\nMethod 2: With index\n";
foreach ($fruits as $index => $fruit) {
    echo ($index + 1) . ". $fruit\n";
}
echo "</pre>";

echo "<h3>Associative Array (Required Task):</h3>";
echo "<pre>";
$student = [
    "name" => "Rahul",
    "age" => 23,
    "skills" => ["PHP", "HTML", "CSS"],
    "city" => "Ahmedabad",
    "grade" => "A"
];

echo "Student Information (Key: Value format):\n";
echo "---------------------------------------\n";
foreach ($student as $key => $value) {
    if (is_array($value)) {
        echo "$key: " . implode(", ", $value) . "\n";
    } else {
        echo "$key: $value\n";
    }
}
echo "</pre>";

echo "<h3>Associative Array - Prices Example:</h3>";
echo "<pre>";
$prices = [
    "Apple" => 120,
    "Banana" => 60,
    "Mango" => 150,
    "Orange" => 80
];

foreach ($prices as $fruit => $price) {
    echo "The price of $fruit is Rs. $price\n";
}
echo "</pre><br>";

// ============================================
// SECTION 5: LOOP CONTROL - BREAK & CONTINUE
// ============================================
echo "<h2>Section 5: Loop Control - BREAK & CONTINUE</h2>";

echo "<h3>BREAK - Exit Loop Early:</h3>";
echo "<pre>";
echo "Find first number divisible by 7:\n";
for ($i = 1; $i <= 50; $i++) {
    if ($i % 7 == 0) {
        echo "Found: $i\n";
        break; // Exit loop
    }
}
echo "</pre>";

echo "<h3>CONTINUE - Skip Current Iteration:</h3>";
echo "<pre>";
echo "Print odd numbers only (skip even):\n";
for ($i = 1; $i <= 10; $i++) {
    if ($i % 2 == 0) {
        continue; // Skip even numbers
    }
    echo "$i ";
}
echo "\n";
echo "</pre>";

echo "<h3>Practical Example - Process Valid Items:</h3>";
echo "<pre>";
$items = ["apple", "", "banana", null, "mango", ""];

echo "Valid items only:\n";
foreach ($items as $item) {
    if (empty($item)) {
        continue; // Skip empty items
    }
    echo "- $item\n";
}
echo "</pre><br>";

// ============================================
// SECTION 6: NESTED LOOPS
// ============================================
echo "<h2>Section 6: Nested Loops</h2>";

echo "<h3>Pattern Printing:</h3>";
echo "<pre>";
echo "Right Triangle:\n";
for ($i = 1; $i <= 5; $i++) {
    for ($j = 1; $j <= $i; $j++) {
        echo "* ";
    }
    echo "\n";
}
echo "</pre>";

echo "<h3>Multiplication Table (1-5):</h3>";
echo "<pre>";
for ($i = 1; $i <= 5; $i++) {
    for ($j = 1; $j <= 5; $j++) {
        $result = $i * $j;
        echo str_pad($result, 3, " ", STR_PAD_LEFT) . " ";
    }
    echo "\n";
}
echo "</pre>";

echo "<h3>Nested Arrays:</h3>";
echo "<pre>";
$teams = [
    "Frontend" => ["React", "Vue", "Angular"],
    "Backend" => ["PHP", "Node.js", "Python"],
    "Mobile" => ["Flutter", "React Native"]
];

foreach ($teams as $category => $technologies) {
    echo "$category:\n";
    foreach ($technologies as $tech) {
        echo "  - $tech\n";
    }
}
echo "</pre><br>";

// ============================================
// SECTION 7: REAL-WORLD EXAMPLES
// ============================================
echo "<h2>Section 7: Real-World Examples</h2>";

echo "<h3>Example 1: Shopping Cart Total:</h3>";
echo "<pre>";
$cart = [
    ["item" => "Laptop", "price" => 45000, "qty" => 1],
    ["item" => "Mouse", "price" => 500, "qty" => 2],
    ["item" => "Keyboard", "price" => 2000, "qty" => 1]
];

$total = 0;
echo "Shopping Cart:\n";
echo "--------------------------------------\n";

foreach ($cart as $product) {
    $subtotal = $product["price"] * $product["qty"];
    $total += $subtotal;
    echo "{$product['item']}: Rs.{$product['price']} × {$product['qty']} = Rs.$subtotal\n";
}

echo "--------------------------------------\n";
echo "Total: Rs. $total\n";
echo "</pre>";

echo "<h3>Example 2: Find Maximum Value:</h3>";
echo "<pre>";
$numbers = [45, 23, 89, 12, 67, 34, 91, 56];

$max = $numbers[0];
foreach ($numbers as $num) {
    if ($num > $max) {
        $max = $num;
    }
}

echo "Numbers: " . implode(", ", $numbers) . "\n";
echo "Maximum: $max\n";
echo "</pre>";

echo "<h3>Example 3: Grade Statistics:</h3>";
echo "<pre>";
$grades = [
    "Math" => 85,
    "Science" => 92,
    "English" => 78,
    "History" => 88,
    "Computer" => 95
];

$total = 0;
$count = 0;

foreach ($grades as $subject => $marks) {
    $total += $marks;
    $count++;
    echo "$subject: $marks\n";
}

$average = $total / $count;
echo "-------------------\n";
echo "Total: $total\n";
echo "Average: " . round($average, 2) . "\n";
echo "</pre><br>";

// ============================================
// SECTION 8: WHEN TO USE WHICH LOOP
// ============================================
echo "<h2>Section 8: Which Loop to Use?</h2>";

echo "<table border='1' cellpadding='15' cellspacing='0' style='border-collapse: collapse; width: 100%;'>";
echo "<tr style='background: #667eea; color: white;'>";
echo "<th>Loop Type</th><th>When to Use</th><th>Example</th></tr>";

echo "<tr><td><strong>FOR</strong></td>";
echo "<td>Know exact number of iterations</td>";
echo "<td>Print 1 to 10, Multiplication table</td></tr>";

echo "<tr><td><strong>WHILE</strong></td>";
echo "<td>Condition-based, unknown iterations</td>";
echo "<td>Login attempts, Sum until limit</td></tr>";

echo "<tr><td><strong>DO-WHILE</strong></td>";
echo "<td>Must execute at least once</td>";
echo "<td>Menu display, User input validation</td></tr>";

echo "<tr><td><strong>FOREACH</strong></td>";
echo "<td>Iterating through arrays</td>";
echo "<td>Display list, Process cart items</td></tr>";

echo "</table><br>";

echo "<div style='background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50;'>";
echo "<strong>✅ Quick Decision Guide:</strong><br>";
echo "• Counting 1-100? → FOR<br>";
echo "• Processing array? → FOREACH<br>";
echo "• Don't know how many times? → WHILE<br>";
echo "• Need to run at least once? → DO-WHILE";
echo "</div><br>";
