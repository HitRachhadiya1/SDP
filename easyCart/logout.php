<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Include auth API to handle logout
require_once "auth_api.php";

// The auth_api.php will handle the logout logic
// We just need to make sure we call the logout action
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'logout') {
    // This will be handled by auth_api.php
    exit;
}

// If not a POST request, redirect to home
header("Location: index.php");
exit;
