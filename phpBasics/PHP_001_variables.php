<?php

/**
 * Task ID: PHP-001
 * Topic: Variables - Defining variables for different data types
 * Objective: Define variables for different data types and output them
 */

// Define a string variable $greeting and an integer variable $year
$greeting = "Hello";
$year = 2026;

// Use concatenation to print 'Hello, the year is 2024'
echo $greeting . ", the year is " . $year . "<br>";

// Define a boolean variable $isActive and print it
$isActive = true;
echo "Is Active: " . ($isActive ? "Yes" : "No") . "<br><br>";

// Additional practice with all data types
echo "<h3>Complete Data Types Example:</h3>";

$productName = "Laptop";        // String
$price = 450.50;                // Float
$quantity = 5;                  // Integer
$inStock = true;                // Boolean
$categories = ["Electronics", "Computers", "Gadgets"]; // Array
$discount = null;               // Null

// Output each variable with its type
echo "Product Name: " . $productName . " (Type: " . gettype($productName) . ")<br>";
echo "Price: $" . $price . " (Type: " . gettype($price) . ")<br>";
echo "Quantity: " . $quantity . " (Type: " . gettype($quantity) . ")<br>";
echo "In Stock: " . ($inStock ? "Yes" : "No") . " (Type: " . gettype($inStock) . ")<br>";
echo "Categories: " . implode(", ", $categories) . " (Type: " . gettype($categories) . ")<br>";
echo "Discount: " . ($discount ?? "Not set") . " (Type: " . gettype($discount) . ")<br><br>";

// Concatenation example
echo "The product " . $productName . " costs $" . $price . " and we have " . $quantity . " in stock.<br>";

// Alternative string interpolation
echo "Alternative: The product $productName costs $$price and we have $quantity in stock.<br>";
