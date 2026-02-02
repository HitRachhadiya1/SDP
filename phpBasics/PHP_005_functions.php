<?php

/**
 * ========================================
 * Task ID: PHP-005 (ENHANCED VERSION)
 * Topic: Functions - Deep Understanding
 * ========================================
 * Covers: Custom functions, strict types, parameters,
 * return types, scope, default values
 */

declare(strict_types=1);

echo "<h1 style='color: #667eea;'>PHP-005: Functions - Enhanced Guide 🚀</h1>";
echo "<hr>";

// ============================================
// SECTION 1: BASIC FUNCTION SYNTAX
// ============================================
echo "<h2>Section 1: Basic Function Syntax</h2>";

echo "<h3>Simple Function:</h3>";
echo "<pre>";

function sayHello()
{
    return "Hello, World!";
}

echo sayHello() . "\n";
echo "</pre>";

echo "<h3>Function with Parameters:</h3>";
echo "<pre>";

function greetUser($name)
{
    return "Hello, $name!";
}

echo greetUser("Rahul") . "\n";
echo greetUser("Priya") . "\n";
echo "</pre>";

echo "<h3>Function with Multiple Parameters:</h3>";
echo "<pre>";

function add($a, $b)
{
    return $a + $b;
}

echo "5 + 3 = " . add(5, 3) . "\n";
echo "10 + 20 = " . add(10, 20) . "\n";
echo "</pre>";

echo "<div style='background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3;'>";
echo "<strong>💡 Function Structure:</strong><br>";
echo "function functionName(\$parameters) {<br>";
echo "&nbsp;&nbsp;&nbsp;&nbsp;// code here<br>";
echo "&nbsp;&nbsp;&nbsp;&nbsp;return \$value;<br>";
echo "}";
echo "</div><br>";

// ============================================
// SECTION 2: STRICT TYPES (REQUIRED TASK)
// ============================================
echo "<h2>Section 2: Strict Types - Type Safety</h2>";

echo "<h3>Required Task: calculateTotal with Strict Types:</h3>";
echo "<pre>";

function calculateTotal(float $price, int $qty): float
{
    return $price * $qty;
}

$price = 99.99;
$quantity = 3;
$total = calculateTotal($price, $quantity);

echo "Price: Rs.$price\n";
echo "Quantity: $quantity\n";
echo "Total: Rs.$total\n";
echo "</pre>";

echo "<h3>Why Strict Types Matter:</h3>";
echo "<pre>";

// Without strict types (commented to avoid error)
// function looseAdd($a, $b) {
//     return $a + $b;
// }
// echo looseAdd("5", "3");  // Works: "5" + "3" = 8 (auto-converts)

// With strict types (declared at top)
function strictAdd(int $a, int $b): int
{
    return $a + $b;
}

echo "strictAdd(5, 3) = " . strictAdd(5, 3) . "\n";
// strictAdd("5", "3");  // Would cause TypeError!
echo "Strict types prevent: strictAdd(\"5\", \"3\") - TypeError!\n";
echo "</pre>";

echo "<div style='background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;'>";
echo "<strong>⚠️ Strict Types Benefits:</strong><br>";
echo "• Prevents type-related bugs<br>";
echo "• Makes code more predictable<br>";
echo "• Catches errors early<br>";
echo "• Requires: declare(strict_types=1); at top of file";
echo "</div><br>";

// ============================================
// SECTION 3: RETURN TYPES
// ============================================
echo "<h2>Section 3: Return Types</h2>";

echo "<h3>Different Return Types:</h3>";
echo "<pre>";

// Returns string
function getFullName(string $first, string $last): string
{
    return $first . " " . $last;
}

// Returns integer
function multiply(int $a, int $b): int
{
    return $a * $b;
}

// Returns float
function calculatePercentage(float $marks, float $total): float
{
    return ($marks / $total) * 100;
}

// Returns boolean
function isAdult(int $age): bool
{
    return $age >= 18;
}

// Returns array
function getColors(): array
{
    return ["Red", "Green", "Blue"];
}

echo "Name: " . getFullName("Rahul", "Sharma") . "\n";
echo "Multiply: " . multiply(5, 4) . "\n";
echo "Percentage: " . calculatePercentage(85, 100) . "%\n";
echo "Is Adult (25): " . (isAdult(25) ? "Yes" : "No") . "\n";
echo "Colors: " . implode(", ", getColors()) . "\n";
echo "</pre>";

echo "<h3>Void Return Type (No Return):</h3>";
echo "<pre>";

function displayMessage(string $msg): void
{
    echo "Message: $msg\n";
    // No return statement needed
}

displayMessage("This function returns nothing");
echo "</pre><br>";

// ============================================
// SECTION 4: VARIABLE SCOPE (REQUIRED TASK)
// ============================================
echo "<h2>Section 4: Variable Scope - Global vs Local</h2>";

echo "<h3>Required Task: Scope Demonstration:</h3>";
echo "<pre>";

$globalVar = "I am GLOBAL";

function demonstrateScope()
{
    $localVar = "I am LOCAL";

    echo "Inside function:\n";
    echo "  Local: $localVar\n";

    // Cannot access $globalVar without 'global' keyword
    // echo $globalVar;  // Would cause error!
}

demonstrateScope();

echo "\nOutside function:\n";
echo "  Global: $globalVar\n";
// echo $localVar;  // Would cause error!
echo "  Cannot access \$localVar here - it's local to function\n";
echo "</pre>";

echo "<h3>Using Global Keyword:</h3>";
echo "<pre>";

$count = 0;

function incrementCounter()
{
    global $count;  // Access global variable
    $count++;
    echo "Counter inside function: $count\n";
}

echo "Initial counter: $count\n";
incrementCounter();
incrementCounter();
incrementCounter();
echo "Final counter: $count\n";
echo "</pre>";

echo "<h3>Static Variables:</h3>";
echo "<pre>";

function pageViews()
{
    static $views = 0;  // Persists between calls
    $views++;
    echo "Page viewed: $views time(s)\n";
}

pageViews();
pageViews();
pageViews();
echo "</pre>";

echo "<div style='background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50;'>";
echo "<strong>✅ Scope Rules:</strong><br>";
echo "• <strong>Local:</strong> Variables inside functions - only accessible inside<br>";
echo "• <strong>Global:</strong> Variables outside functions - use 'global' keyword to access<br>";
echo "• <strong>Static:</strong> Local variable that keeps value between calls<br>";
echo "• <strong>Best Practice:</strong> Avoid globals, use parameters and return values";
echo "</div><br>";

// ============================================
// SECTION 5: DEFAULT PARAMETERS
// ============================================
echo "<h2>Section 5: Default Parameter Values</h2>";

echo "<h3>Functions with Defaults:</h3>";
echo "<pre>";

function greetPerson(string $name, string $greeting = "Hello")
{
    return "$greeting, $name!";
}

echo greetPerson("Rahul") . "\n";
echo greetPerson("Priya", "Welcome") . "\n";
echo greetPerson("Amit", "Good Morning") . "\n";
echo "</pre>";

echo "<h3>Multiple Defaults:</h3>";
echo "<pre>";

function createUser(string $name, string $role = "user", bool $active = true): array
{
    return [
        "name" => $name,
        "role" => $role,
        "active" => $active
    ];
}

$user1 = createUser("Rahul");
$user2 = createUser("Priya", "admin");
$user3 = createUser("Amit", "editor", false);

print_r($user1);
print_r($user2);
print_r($user3);
echo "</pre>";

echo "<div style='background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3;'>";
echo "<strong>💡 Default Parameters:</strong><br>";
echo "• Put defaults after required parameters<br>";
echo "• User can override default values<br>";
echo "• Makes functions more flexible";
echo "</div><br>";

// ============================================
// SECTION 6: PASS BY VALUE vs REFERENCE
// ============================================
echo "<h2>Section 6: Pass by Value vs Reference</h2>";

echo "<h3>Pass by Value (Default):</h3>";
echo "<pre>";

function addTen($number)
{
    $number += 10;
    echo "Inside function: $number\n";
}

$value = 5;
echo "Before: $value\n";
addTen($value);
echo "After: $value (unchanged)\n";
echo "</pre>";

echo "<h3>Pass by Reference (&):</h3>";
echo "<pre>";

function addTenReference(&$number)
{
    $number += 10;
    echo "Inside function: $number\n";
}

$value = 5;
echo "Before: $value\n";
addTenReference($value);
echo "After: $value (changed!)\n";
echo "</pre>";

echo "<div style='background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;'>";
echo "<strong>⚠️ Key Difference:</strong><br>";
echo "• <strong>By Value:</strong> Function gets a copy (original unchanged)<br>";
echo "• <strong>By Reference (&):</strong> Function modifies original variable";
echo "</div><br>";

// ============================================
// SECTION 7: REAL-WORLD EXAMPLES
// ============================================
echo "<h2>Section 7: Real-World Function Examples</h2>";

echo "<h3>Example 1: Discount Calculator:</h3>";
echo "<pre>";

function calculateDiscount(float $amount, float $discountPercent = 0): float
{
    return $amount - ($amount * $discountPercent / 100);
}

echo "Original: Rs.1000, 10% discount: Rs." . calculateDiscount(1000, 10) . "\n";
echo "Original: Rs.1000, 20% discount: Rs." . calculateDiscount(1000, 20) . "\n";
echo "Original: Rs.1000, no discount: Rs." . calculateDiscount(1000) . "\n";
echo "</pre>";

echo "<h3>Example 2: Grade Calculator:</h3>";
echo "<pre>";

function calculateGrade(int $marks): string
{
    if ($marks >= 90) return "A+";
    if ($marks >= 80) return "A";
    if ($marks >= 70) return "B";
    if ($marks >= 60) return "C";
    return "F";
}

$students = [
    "Rahul" => 85,
    "Priya" => 92,
    "Amit" => 78
];

foreach ($students as $name => $marks) {
    $grade = calculateGrade($marks);
    echo "$name: $marks marks = Grade $grade\n";
}
echo "</pre>";

echo "<h3>Example 3: Temperature Converter:</h3>";
echo "<pre>";

function celsiusToFahrenheit(float $celsius): float
{
    return ($celsius * 9 / 5) + 32;
}

function fahrenheitToCelsius(float $fahrenheit): float
{
    return ($fahrenheit - 32) * 5 / 9;
}

echo "25°C = " . celsiusToFahrenheit(25) . "°F\n";
echo "77°F = " . fahrenheitToCelsius(77) . "°C\n";
echo "</pre>";

echo "<h3>Example 4: Validation Function:</h3>";
echo "<pre>";

function isValidEmail(string $email): bool
{
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function isValidAge(int $age): bool
{
    return $age >= 0 && $age <= 120;
}

$testEmail = "user@example.com";
$testAge = 25;

echo "Email '$testEmail' valid: " . (isValidEmail($testEmail) ? "Yes" : "No") . "\n";
echo "Age $testAge valid: " . (isValidAge($testAge) ? "Yes" : "No") . "\n";
echo "</pre><br>";

// ============================================
// SECTION 8: FUNCTION BEST PRACTICES
// ============================================
echo "<h2>Section 8: Function Best Practices</h2>";

echo "<div style='background: #e8f5e9; padding: 15px; margin: 10px 0; border-left: 4px solid #4caf50;'>";
echo "<strong>✅ DO:</strong><br>";
echo "1. Use descriptive names (calculateTotal, not calc)<br>";
echo "2. Keep functions small (do one thing well)<br>";
echo "3. Use type hints and return types<br>";
echo "4. Use default parameters for optional values<br>";
echo "5. Return values instead of printing<br>";
echo "6. Comment complex logic";
echo "</div>";

echo "<div style='background: #ffebee; padding: 15px; margin: 10px 0; border-left: 4px solid #f44336;'>";
echo "<strong>❌ DON'T:</strong><br>";
echo "1. Use short, unclear names (x, y, tmp)<br>";
echo "2. Create huge functions (100+ lines)<br>";
echo "3. Rely on global variables<br>";
echo "4. Mix logic types in one function<br>";
echo "5. Have functions with side effects<br>";
echo "6. Forget to handle edge cases";
echo "</div><br>";
