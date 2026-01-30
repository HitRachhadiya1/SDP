<?php

$version = phpversion();
print "PHP Version " . $version . "<br>";

/**
 * ========================================
 * Task ID: PHP-001 (ENHANCED VERSION)
 * Topic: Variables - Deep Understanding
 * ========================================
 * This enhanced version includes:
 * - All PHP data types in detail
 * - Variable naming rules
 * - Type casting and conversion
 * - Variable scope basics
 * - String operations  
 * - Memory and references
 */

echo "<h1 style='color: #667eea;'>PHP-001: Variables - Deep Dive 🚀</h1>";
echo "<hr>";

// ============================================
// SECTION 1: BASIC VARIABLE ASSIGNMENT
// ============================================
echo "<h2>Section 1: Basic Variable Assignment</h2>";

$greeting = "Hello";
$year = 2024;

echo "Greeting: $greeting<br>";
echo "Year: $year<br>";
echo "Concatenation: " . $greeting . ", the year is " . $year . "<br><br>";

echo "<div style='background: #f0f0f0; padding: 15px; border-left: 4px solid #667eea;'>";
echo "<strong>💡 Key Concept:</strong> In PHP, variables start with $ sign and are case-sensitive.<br>";
echo "Example: \$name, \$Name, and \$NAME are three different variables!";
echo "</div><br>";

// ============================================
// SECTION 2: ALL DATA TYPES IN DETAIL
// ============================================
echo "<h2>Section 2: All 8 PHP Data Types</h2>";

// 1. STRING
$stringVar = "This is a string";
echo "<h4>1️⃣ String (Text Data)</h4>";
echo "Value: $stringVar<br>";
echo "Type: " . gettype($stringVar) . "<br>";
echo "Length: " . strlen($stringVar) . " characters<br>";
echo "First character: " . $stringVar[0] . "<br>";
echo "Last character: " . $stringVar[strlen($stringVar) - 1] . "<br><br>";

// 2. INTEGER
$integerVar = 42;
echo "<h4>2️⃣ Integer (Whole Numbers)</h4>";
echo "Value: $integerVar<br>";
echo "Type: " . gettype($integerVar) . "<br>";
echo "Is positive: " . ($integerVar > 0 ? "Yes" : "No") . "<br>";
echo "Double value: " . ($integerVar * 2) . "<br><br>";

// 3. FLOAT (DOUBLE)
$floatVar = 39845989.14159;
echo "<h4>3️⃣ Float/Double (Decimal Numbers)</h4>";
echo "Value: $floatVar<br>";
echo "Type: " . gettype($floatVar) . "<br>";
echo "Rounded: " . round($floatVar, 2) . "<br>";
echo "Formatted: Rs. " . number_format($floatVar, 2) . "<br>";
echo "Formatted: Rs.  Type: " . gettype(number_format($floatVar, 2)) . "<br><br>";


// 4. BOOLEAN
$boolTrue = true;
$boolFalse = false;
echo "<h4>4️⃣ Boolean (True/False)</h4>";
echo "True value: " . ($boolTrue ? "TRUE" : "FALSE") . "<br>";
echo "False value: " . ($boolFalse ? "TRUE" : "FALSE") . "<br>";
echo "Type: " . gettype($boolTrue) . "<br>";
echo "In numbers - True: " . (int)$boolTrue . ", False: " . (int)$boolFalse . "<br><br>";

// 5. ARRAY
$arrayVar = ["Apple", "Banana", "Cherry"];
echo "<h4>5️⃣ Array (Multiple Values)</h4>";
echo "Values: " . implode(", ", $arrayVar) . "<br>";
echo "Type: " . gettype($arrayVar) . "<br>";
echo "Count: " . count($arrayVar) . " items<br>";
echo "First item: " . $arrayVar[0] . "<br>";
echo "Last item: " . $arrayVar[count($arrayVar) - 1] . "<br><br>";

// 6. NULL
$nullVar = null;
echo "<h4>6️⃣ NULL (No Value)</h4>";
echo "Value: " . ($nullVar ?? "NULL (no value)") . "<br>";
echo "Type: " . gettype($nullVar) . "<br>";
echo "Is NULL: " . (is_null($nullVar) ? "Yes" : "No") . "<br><br>";

// 7. OBJECT
class Person
{
    public $name = "Rahul";
    public $age = 25;
}
$objectVar = new Person();
echo "<h4>7️⃣ Object (Class Instance)</h4>";
echo "Type: " . gettype($objectVar) . "<br>";
echo "Class: " . get_class($objectVar) . "<br>";
echo "Name property: " . $objectVar->name . "<br>";
echo "Age property: " . $objectVar->age . "<br><br>";

// 8. RESOURCE
$fileHandle = fopen(__FILE__, "r"); // Opens current file for reading
echo "<h4>8️⃣ Resource (External Resource)</h4>";
echo "Type: " . gettype($fileHandle) . "<br>";
echo "Description: File handle resource<br>";
echo "Is valid: " . (is_resource($fileHandle) ? "Yes" : "No") . "<br>";
fclose($fileHandle);
echo "<br>";

// ============================================
// SECTION 3: VARIABLE NAMING RULES
// ============================================
echo "<h2>Section 3: Variable Naming Rules</h2>";

echo "<div style='background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50;'>";
echo "<strong>✅ VALID Variable Names:</strong><br>";
$name = "Valid";
$_name = "Valid";
$name123 = "Valid";
$firstName = "Valid (camelCase)";
$first_name = "Valid (snake_case)";
echo "• \$name, \$_name, \$name123, \$firstName, \$first_name<br>";
echo "</div><br>";

echo "<div style='background: #ffebee; padding: 15px; border-left: 4px solid #f44336;'>";
echo "<strong>❌ INVALID Variable Names:</strong><br>";
echo "• \$123name (can't start with number)<br>";
echo "• \$first-name (can't use hyphen)<br>";
echo "• \$first name (can't have space)<br>";
echo "• \$class (reserved keyword, but still works - avoid!)<br>";
echo "</div><br>";

// ============================================
// SECTION 4: TYPE CASTING & CONVERSION
// ============================================
echo "<h2>Section 4: Type Casting & Conversion</h2>";

$number = "123";
echo "<h4>Original String: '$number'</h4>";
echo "Type: " . gettype($number) . "<br><br>";

// Casting to integer
$numberInt = (int)$number;
echo "Casted to Integer: $numberInt<br>";
echo "Type: " . gettype($numberInt) . "<br><br>";

// Casting examples
$value = "45.67";
echo "<h4>Casting Examples:</h4>";
echo "Original: '$value' (Type: " . gettype($value) . ")<br>";
echo "To Integer: " . (int)$value . " (Type: " . gettype((int)$value) . ")<br>";
echo "To Float: " . (float)$value . " (Type: " . gettype((float)$value) . ")<br>";
echo "To Boolean: " . ((bool)$value ? "true" : "false") . " (Type: " . gettype((bool)$value) . ")<br>";
echo "To String: '" . (string)$value . "' (Type: " . gettype((string)$value) . ")<br><br>";

// Automatic type conversion
echo "<h4>Automatic Type Conversion:</h4>";
$a = "5";      // String
$b = 10;       // Integer
$result = $a + $b;
echo "\$a = \"5\" (string) + \$b = 10 (integer) = $result<br>";
echo "Result Type: " . gettype($result) . " (PHP auto-converts!)<br><br>";

// ============================================
// SECTION 5: STRING OPERATIONS
// ============================================
echo "<h2>Section 5: String Operations</h2>";

$text = "Hello World";

echo "<h4>String Concatenation:</h4>";
echo "Method 1 (dot operator): " . "Hello" . " " . "World" . "<br>";
echo "Method 2 (interpolation): " . "Year is $year" . "<br><br>";

echo "<h4>String Methods:</h4>";
echo "Original: '$text'<br>";
echo "Uppercase: " . strtoupper($text) . "<br>";
echo "Lowercase: " . strtolower($text) . "<br>";
echo "Length: " . strlen($text) . " characters<br>";
echo "Replace 'World' with 'PHP': " . str_replace("World", "PHP", $text) . "<br>";
echo "Substring (0-5): " . substr($text, 0, 5) . "<br>";
echo "Position of 'World': " . strpos($text, "World") . "<br><br>";

// ============================================
// SECTION 6: VARIABLE VARIABLES
// ============================================
echo "<h2>Section 6: Variable Variables (Advanced)</h2>";

$varName = "greeting";
$$varName = "Hello from variable variable!";

echo "Variable name stored: '$varName'<br>";
echo "Value of \$\$varName: " . $$varName . "<br>";
echo "Which is same as \$greeting: $greeting<br><br>";

echo "<div style='background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;'>";
echo "<strong>⚠️ Warning:</strong> Variable variables can make code hard to read. Use with caution!";
echo "</div><br>";

// ============================================
// SECTION 7: CONSTANTS
// ============================================
echo "<h2>Section 7: Constants (Unchangeable Values)</h2>";

define("site_name", "My PHP Website");
define("MAX_USERS", 100);
define("PI_VALUE", 3.14159);

echo "Site Name: " . site_name . "<br>";
echo "Max Users: " . MAX_USERS . "<br>";
echo "PI Value: " . PI_VALUE . "<br><br>";

echo "<div style='background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3;'>";
echo "<strong>📌 Difference: Variables vs Constants</strong><br>";
echo "• Variables: Use $ sign, can change value, lowercase names<br>";
echo "• Constants: No $ sign, cannot change, UPPERCASE names (convention)<br>";
echo "• Example: \$name vs SITE_NAME";
echo "</div><br>";

// ============================================
// SECTION 8: VARIABLE SCOPE (Preview)
// ============================================
echo "<h2>Section 8: Variable Scope Preview</h2>";

$globalVar = "I am global";

function testScope()
{
    $localVar = "I am local";
    echo "Inside function - Local: $localVar<br>";
    // echo $globalVar; // This would cause error! Can't access global here
}

testScope();
echo "Outside function - Global: $globalVar<br>";
// echo $localVar; // This would cause error! Can't access local here

echo "<br><div style='background: #f3e5f5; padding: 15px; border-left: 4px solid #9c27b0;'>";
echo "<strong>🎯 Scope Rules:</strong><br>";
echo "• Variables inside functions are LOCAL (only available inside)<br>";
echo "• Variables outside functions are GLOBAL (available everywhere except inside functions)<br>";
echo "• Use 'global' keyword to access global variables inside functions (covered in PHP-005)";
echo "</div><br>";

// ============================================
// SECTION 9: NULL COALESCING & TERNARY
// ============================================
echo "<h2>Section 9: Modern PHP Operators</h2>";

$username = null;

// Null Coalescing Operator (??)
echo "<h4>Null Coalescing Operator (??):</h4>";
echo "Username: " . ($username ?? "Guest") . "<br>";
echo "Meaning: If \$username is null, use 'Guest' instead<br><br>";

// Ternary Operator (? :)
$isActive = true;
echo "<h4>Ternary Operator (? :):</h4>";
echo "Status: " . ($isActive ? "Active" : "Inactive") . "<br>";
echo "Meaning: If \$isActive is true, show 'Active', else show 'Inactive'<br><br>";
