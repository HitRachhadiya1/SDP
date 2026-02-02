<?php

/**
 * ========================================
 * Task ID: PHP-003 (ENHANCED VERSION)
 * Topic: Control Structures - Deep Understanding
 * ========================================
 * This enhanced version includes:
 * - if, else, elseif in depth
 * - switch statement variations
 * - Ternary operator
 * - Null coalescing operator
 * - Match expression (PHP 8+)
 * - Nested conditions
 * - Comparison operators
 * - Logical operators
 * - Real-world examples
 */

echo "<h1 style='color: #667eea;'>PHP-003: Control Structures - Deep Dive 🚀</h1>";
echo "<hr>";

// ============================================
// SECTION 1: IF STATEMENT BASICS
// ============================================
echo "<h2>Section 1: IF Statement Basics</h2>";

echo "<h3>Simple IF Statement:</h3>";
echo "<pre>";
$age = 18;

if ($age >= 18) {
    echo "You are an adult!\n";
}
echo "Age: $age\n";
echo "</pre>";

echo "<h3>IF-ELSE Statement:</h3>";
echo "<pre>";
$temperature = 35;

if ($temperature > 30) {
    echo "It's HOT! 🔥 ($temperature °C)\n";
} else {
    echo "It's COOL! ❄️ ($temperature °C)\n";
}
echo "</pre>";

echo "<h3>IF-ELSEIF-ELSE Chain:</h3>";
echo "<pre>";
$marks = 85;

if ($marks >= 90) {
    echo "Grade: A+ (Excellent!) - Marks: $marks\n";
} elseif ($marks >= 80) {
    echo "Grade: A (Very Good!) - Marks: $marks\n";
} elseif ($marks >= 70) {
    echo "Grade: B (Good!) - Marks: $marks\n";
} elseif ($marks >= 60) {
    echo "Grade: C (Satisfactory) - Marks: $marks\n";
} elseif ($marks >= 40) {
    echo "Grade: D (Pass) - Marks: $marks\n";
} else {
    echo "Grade: F (Fail) - Marks: $marks\n";
}
echo "</pre>";

echo "<div style='background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3;'>";
echo "<strong>💡 How it Works:</strong><br>";
echo "1. PHP checks first condition (marks >= 90)<br>";
echo "2. If FALSE, checks next condition (marks >= 80)<br>";
echo "3. If TRUE, executes that block and STOPS<br>";
echo "4. If all FALSE, executes else block";
echo "</div><br>";

// ============================================
// SECTION 2: COMPARISON OPERATORS
// ============================================
echo "<h2>Section 2: Comparison Operators</h2>";

$a = 10;
$b = 20;
$c = "10";

echo "<table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; width: 100%;'>";
echo "<tr style='background: #667eea; color: white;'>";
echo "<th>Operator</th><th>Name</th><th>Example</th><th>Result</th></tr>";

echo "<tr><td>==</td><td>Equal</td><td>\$a == \$c</td><td>" . ($a == $c ? "TRUE" : "FALSE") . "</td></tr>";
echo "<tr><td>===</td><td>Identical</td><td>\$a === \$c</td><td>" . ($a === $c ? "TRUE" : "FALSE") . "</td></tr>";
echo "<tr><td>!=</td><td>Not equal</td><td>\$a != \$b</td><td>" . ($a != $b ? "TRUE" : "FALSE") . "</td></tr>";
echo "<tr><td>!==</td><td>Not identical</td><td>\$a !== \$c</td><td>" . ($a !== $c ? "TRUE" : "FALSE") . "</td></tr>";
echo "<tr><td>&gt;</td><td>Greater than</td><td>\$b &gt; \$a</td><td>" . ($b > $a ? "TRUE" : "FALSE") . "</td></tr>";
echo "<tr><td>&lt;</td><td>Less than</td><td>\$a &lt; \$b</td><td>" . ($a < $b ? "TRUE" : "FALSE") . "</td></tr>";
echo "<tr><td>&gt;=</td><td>Greater or equal</td><td>\$a &gt;= 10</td><td>" . ($a >= 10 ? "TRUE" : "FALSE") . "</td></tr>";
echo "<tr><td>&lt;=</td><td>Less or equal</td><td>\$a &lt;= 10</td><td>" . ($a <= 10 ? "TRUE" : "FALSE") . "</td></tr>";

echo "</table><br>";

echo "<div style='background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;'>";
echo "<strong>⚠️ == vs === Important Difference!</strong><br>";
echo "• == (Equal): Compares values only (10 == \"10\" is TRUE)<br>";
echo "• === (Identical): Compares values AND types (10 === \"10\" is FALSE)<br>";
echo "• BEST PRACTICE: Use === for strict comparison!";
echo "</div><br>";

// ============================================
// SECTION 3: LOGICAL OPERATORS
// ============================================
echo "<h2>Section 3: Logical Operators (AND, OR, NOT)</h2>";

echo "<h3>AND Operator (&&):</h3>";
echo "<pre>";
$age = 25;
$hasLicense = true;

if ($age >= 18 && $hasLicense) {
    echo "You can drive! ✅\n";
    echo "Age: $age, License: " . ($hasLicense ? "Yes" : "No") . "\n";
} else {
    echo "You cannot drive! ❌\n";
}
echo "</pre>";

echo "<h3>OR Operator (||):</h3>";
echo "<pre>";
$isWeekend = true;
$isHoliday = false;

if ($isWeekend || $isHoliday) {
    echo "You can relax! 🎉\n";
    echo "Weekend: " . ($isWeekend ? "Yes" : "No") . ", Holiday: " . ($isHoliday ? "Yes" : "No") . "\n";
} else {
    echo "Time to work! 💼\n";
}
echo "</pre>";

echo "<h3>NOT Operator (!):</h3>";
echo "<pre>";
$isRaining = false;

if (!$isRaining) {
    echo "Go outside! It's not raining! ☀️\n";
} else {
    echo "Stay inside! It's raining! 🌧️\n";
}
echo "</pre>";

echo "<h3>Combining Multiple Conditions:</h3>";
echo "<pre>";
$temperature = 28;
$humidity = 70;
$hasUmbrella = true;

if ($temperature > 25 && $humidity > 60 && !$hasUmbrella) {
    echo "It's hot and humid, and you don't have an umbrella! 😰\n";
} elseif ($temperature > 25 && $hasUmbrella) {
    echo "It's hot but you have an umbrella! 😊\n";
} else {
    echo "Weather is fine! 😎\n";
}
echo "Temp: $temperature°C, Humidity: $humidity%, Umbrella: " . ($hasUmbrella ? "Yes" : "No") . "\n";
echo "</pre>";

echo "<table border='1' cellpadding='10' cellspacing='0' style='border-collapse: collapse; width: 100%;'>";
echo "<tr style='background: #667eea; color: white;'>";
echo "<th>Operator</th><th>Name</th><th>Example</th><th>True When</th></tr>";
echo "<tr><td>&&</td><td>AND</td><td>\$a && \$b</td><td>BOTH are true</td></tr>";
echo "<tr><td>||</td><td>OR</td><td>\$a || \$b</td><td>AT LEAST ONE is true</td></tr>";
echo "<tr><td>!</td><td>NOT</td><td>!\$a</td><td>Value is false</td></tr>";
echo "</table><br><br>";

// ============================================
// SECTION 4: SWITCH STATEMENT
// ============================================
echo "<h2>Section 4: Switch Statement</h2>";

echo "<h3>Basic Switch:</h3>";
echo "<pre>";
$day = "Wednesday";

switch ($day) {
    case "Monday":
        echo "Start of the work week! 💼\n";
        break;
    case "Wednesday":
        echo "Midweek! Hump day! 🐪\n";
        break;
    case "Friday":
        echo "TGIF! Weekend is near! 🎉\n";
        break;
    case "Saturday":
    case "Sunday":
        echo "Weekend! Time to relax! 🌴\n";
        break;
    default:
        echo "Just another day! 📅\n";
}
echo "Today is: $day\n";
echo "</pre>";

echo "<h3>Switch with Multiple Cases (Fall-through):</h3>";
echo "<pre>";
$month = "July";

switch ($month) {
    case "December":
    case "January":
    case "February":
        echo "Season: Winter ❄️\n";
        break;
    case "March":
    case "April":
    case "May":
        echo "Season: Spring 🌸\n";
        break;
    case "June":
    case "July":
    case "August":
        echo "Season: Summer ☀️\n";
        break;
    case "September":
    case "October":
    case "November":
        echo "Season: Autumn 🍂\n";
        break;
    default:
        echo "Invalid month!\n";
}
echo "Month: $month\n";
echo "</pre>";

echo "<div style='background: #ffebee; padding: 15px; border-left: 4px solid #f44336;'>";
echo "<strong>⚠️ Don't Forget 'break'!</strong><br>";
echo "Without 'break', execution continues to next case (fall-through)<br>";
echo "This is usually a bug unless intentional!";
echo "</div><br>";

echo "<h3>Switch with Expressions:</h3>";
echo "<pre>";
$marks = 85;
$grade = "";

switch (true) {
    case ($marks >= 90):
        $grade = "A+";
        break;
    case ($marks >= 80):
        $grade = "A";
        break;
    case ($marks >= 70):
        $grade = "B";
        break;
    case ($marks >= 60):
        $grade = "C";
        break;
    default:
        $grade = "F";
}

echo "Marks: $marks, Grade: $grade\n";
echo "</pre><br>";

// ============================================
// SECTION 5: TERNARY OPERATOR
// ============================================
echo "<h2>Section 5: Ternary Operator (Shorthand IF)</h2>";

echo "<h3>Basic Ternary:</h3>";
echo "<pre>";
$age = 20;

// Long way (if-else)
if ($age >= 18) {
    $status = "Adult";
} else {
    $status = "Minor";
}
echo "Long way: $status\n";

// Short way (ternary)
$status = ($age >= 18) ? "Adult" : "Minor";
echo "Ternary way: $status\n";
echo "</pre>";

echo "<h3>Nested Ternary:</h3>";
echo "<pre>";
$marks = 85;

$grade = ($marks >= 90) ? "A+" : (($marks >= 80) ? "A" : (($marks >= 70) ? "B" : "C"));

echo "Marks: $marks, Grade: $grade\n";
echo "</pre>";

echo "<div style='background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;'>";
echo "<strong>⚠️ Warning:</strong> Nested ternaries are hard to read!<br>";
echo "Use them for simple cases only. For complex logic, use if-else.";
echo "</div><br>";

echo "<h3>Practical Ternary Examples:</h3>";
echo "<pre>";
// Check if array key exists
$user = ["name" => "Rahul", "age" => 25];
$city = isset($user["city"]) ? $user["city"] : "Unknown";
echo "City: $city\n";

// Display status
$isActive = true;
echo "Status: " . ($isActive ? "Active ✅" : "Inactive ❌") . "\n";

// Price with discount
$price = 1000;
$hasCoupon = true;
$finalPrice = $hasCoupon ? ($price * 0.9) : $price;
echo "Final Price: Rs. $finalPrice\n";
echo "</pre><br>";

// ============================================
// SECTION 6: NULL COALESCING OPERATOR
// ============================================
echo "<h2>Section 6: Null Coalescing Operator (??) - PHP 7+</h2>";

echo "<h3>Without Null Coalescing:</h3>";
echo "<pre>";
$username = null;

// Old way
$name = isset($username) ? $username : "Guest";
echo "Name: $name\n";
echo "</pre>";

echo "<h3>With Null Coalescing:</h3>";
echo "<pre>";
$username = null;

// New way (PHP 7+)
$name = $username ?? "Guest";
echo "Name: $name\n";
echo "</pre>";

echo "<h3>Chaining Null Coalescing:</h3>";
echo "<pre>";
$firstName = null;
$lastName = null;
$nickname = "RK";

$displayName = $firstName ?? $lastName ?? $nickname ?? "Anonymous";
echo "Display Name: $displayName\n";
echo "</pre>";

echo "<div style='background: #e8f5e9; padding: 15px; border-left: 4px solid #4caf50;'>";
echo "<strong>✅ Benefits:</strong><br>";
echo "• Cleaner code than isset()<br>";
echo "• Can chain multiple values<br>";
echo "• Returns first non-null value";
echo "</div><br>";

// ============================================
// SECTION 7: MATCH EXPRESSION (PHP 8+)
// ============================================
echo "<h2>Section 7: Match Expression (PHP 8+) - Modern Alternative to Switch</h2>";

if (PHP_VERSION_ID >= 80000) {
    echo "<h3>Switch vs Match Comparison:</h3>";
    echo "<pre>";

    $day = "Monday";

    // Old way: Switch
    switch ($day) {
        case "Monday":
            $mood = "😴 Sleepy";
            break;
        case "Friday":
            $mood = "😊 Happy";
            break;
        default:
            $mood = "😐 Neutral";
    }
    echo "Switch result: $mood\n";

    // New way: Match (PHP 8+)
    $mood = match ($day) {
        "Monday" => "😴 Sleepy",
        "Friday" => "😊 Happy",
        default => "😐 Neutral"
    };
    echo "Match result: $mood\n";
    echo "</pre>";

    echo "<div style='background: #e3f2fd; padding: 15px; border-left: 4px solid #2196f3;'>";
    echo "<strong>💡 Match vs Switch Differences:</strong><br>";
    echo "• Match returns a value (can assign directly)<br>";
    echo "• Match uses === (strict comparison)<br>";
    echo "• Match doesn't need 'break'<br>";
    echo "• Match throws error if no match (safer)";
    echo "</div><br>";
} else {
    echo "<div style='background: #ffebee; padding: 15px; border-left: 4px solid #f44336;'>";
    echo "<strong>Note:</strong> Match expression requires PHP 8.0+<br>";
    echo "Your PHP version: " . PHP_VERSION;
    echo "</div><br>";
}

// ============================================
// SECTION 8: NESTED CONDITIONS
// ============================================
echo "<h2>Section 8: Nested Conditions</h2>";

echo "<h3>Nested IF Statements:</h3>";
echo "<pre>";
$age = 25;
$country = "India";
$hasLicense = true;

if ($age >= 18) {
    echo "You are an adult.\n";

    if ($country == "India") {
        echo "You are in India.\n";

        if ($hasLicense) {
            echo "You can drive in India! 🚗\n";
        } else {
            echo "Get a license first!\n";
        }
    } else {
        echo "Check local driving laws.\n";
    }
} else {
    echo "You are too young to drive.\n";
}
echo "</pre>";

echo "<div style='background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;'>";
echo "<strong>⚠️ Better Approach:</strong> Use logical operators instead of deep nesting<br>";
echo "<pre>";
echo htmlspecialchars('
if ($age >= 18 && $country == "India" && $hasLicense) {
    echo "You can drive in India!";
}
');
echo "</pre>";
echo "</div><br>";

// ============================================
// SECTION 9: REAL-WORLD EXAMPLES
// ============================================
echo "<h2>Section 9: Real-World Examples</h2>";

echo "<h3>Example 1: Login Validation</h3>";
echo "<pre>";
$username = "admin";
$password = "secret123";
$isActive = true;

if (empty($username) || empty($password)) {
    echo "❌ Username and password are required!\n";
} elseif ($username === "admin" && $password === "secret123") {
    if ($isActive) {
        echo "✅ Login successful! Welcome, $username!\n";
    } else {
        echo "❌ Account is deactivated!\n";
    }
} else {
    echo "❌ Invalid credentials!\n";
}
echo "</pre>";

echo "<h3>Example 2: Shipping Cost Calculator</h3>";
echo "<pre>";
$orderAmount = 1500;
$isPremiumMember = true;

if ($isPremiumMember) {
    $shippingCost = 0;
    $reason = "Premium member";
} elseif ($orderAmount >= 1000) {
    $shippingCost = 0;
    $reason = "Free shipping over Rs. 1000";
} elseif ($orderAmount >= 500) {
    $shippingCost = 50;
    $reason = "Standard shipping";
} else {
    $shippingCost = 100;
    $reason = "Small order surcharge";
}

echo "Order Amount: Rs. $orderAmount\n";
echo "Shipping Cost: Rs. $shippingCost\n";
echo "Reason: $reason\n";
echo "Total: Rs. " . ($orderAmount + $shippingCost) . "\n";
echo "</pre>";

echo "<h3>Example 3: Grade Calculator with Comments</h3>";
echo "<pre>";
$marks = 78;

if ($marks >= 90) {
    $grade = "A+";
    $comment = "Outstanding performance!";
} elseif ($marks >= 80) {
    $grade = "A";
    $comment = "Excellent work!";
} elseif ($marks >= 70) {
    $grade = "B";
    $comment = "Good job!";
} elseif ($marks >= 60) {
    $grade = "C";
    $comment = "Satisfactory.";
} elseif ($marks >= 40) {
    $grade = "D";
    $comment = "Need improvement.";
} else {
    $grade = "F";
    $comment = "Failed. Please try again.";
}

echo "Marks: $marks\n";
echo "Grade: $grade\n";
echo "Comment: $comment\n";
echo "</pre>";

echo "<h3>Example 4: Discount Calculator</h3>";
echo "<pre>";
$totalPurchase = 5000;
$discount = 0;

switch (true) {
    case ($totalPurchase >= 10000):
        $discount = 20;
        break;
    case ($totalPurchase >= 5000):
        $discount = 10;
        break;
    case ($totalPurchase >= 2000):
        $discount = 5;
        break;
    default:
        $discount = 0;
}

$discountAmount = ($totalPurchase * $discount) / 100;
$finalAmount = $totalPurchase - $discountAmount;

echo "Purchase Amount: Rs. $totalPurchase\n";
echo "Discount: $discount%\n";
echo "Discount Amount: Rs. $discountAmount\n";
echo "Final Amount: Rs. $finalAmount\n";
echo "</pre><br>";
