<?php
// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Debug: Log incoming requests
error_log("Auth API called with action: " . ($_POST['action'] ?? 'none'));
error_log("POST data: " . print_r($_POST, true));

header('Content-Type: application/json');

// Initialize users array in session if not exists
if (!isset($_SESSION['registered_users'])) {
    $_SESSION['registered_users'] = [];
}

// Initialize user carts array if not exists
if (!isset($_SESSION['user_carts'])) {
    $_SESSION['user_carts'] = [];
}

$action = $_POST['action'] ?? '';
$response = [
    'success' => false,
    'message' => '',
    'user' => null
];

switch ($action) {
    case 'register':
        $fullname = trim($_POST['fullname'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $confirmPassword = $_POST['confirm_password'] ?? '';

        // Validation
        if (empty($fullname) || empty($email) || empty($password)) {
            $response['message'] = 'All fields are required.';
            break;
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] = 'Please enter a valid email address.';
            break;
        }

        if (strlen($password) < 6) {
            $response['message'] = 'Password must be at least 6 characters.';
            break;
        }

        if ($password !== $confirmPassword) {
            $response['message'] = 'Passwords do not match.';
            break;
        }

        // Check if user already exists
        foreach ($_SESSION['registered_users'] as $user) {
            if ($user['email'] === $email) {
                $response['message'] = 'An account with this email already exists.';
                echo json_encode($response);
                exit;
            }
        }

        // Create new user
        $userId = uniqid('user_');
        $newUser = [
            'id' => $userId,
            'fullname' => $fullname,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT),
            'created_at' => date('Y-m-d H:i:s')
        ];

        // Store user in session
        $_SESSION['registered_users'][$userId] = $newUser;

        // Initialize empty cart for this user
        $_SESSION['user_carts'][$userId] = [];

        $response['success'] = true;
        $response['message'] = 'Registration successful! Please login.';
        break;

    case 'login':
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';

        if (empty($email) || empty($password)) {
            $response['message'] = 'Email and password are required.';
            break;
        }

        // Find user by email
        $foundUser = null;
        foreach ($_SESSION['registered_users'] as $user) {
            if ($user['email'] === $email) {
                $foundUser = $user;
                break;
            }
        }

        if (!$foundUser) {
            $response['message'] = 'No account found with this email.';
            break;
        }

        // Verify password
        if (!password_verify($password, $foundUser['password'])) {
            $response['message'] = 'Incorrect password.';
            break;
        }

        // Set logged in user in session
        $_SESSION['logged_in_user'] = [
            'id' => $foundUser['id'],
            'fullname' => $foundUser['fullname'],
            'email' => $foundUser['email']
        ];

        // Load user's cart as the active cart
        if (isset($_SESSION['user_carts'][$foundUser['id']])) {
            $_SESSION['cart'] = $_SESSION['user_carts'][$foundUser['id']];
        } else {
            $_SESSION['cart'] = [];
        }

        $response['success'] = true;
        $response['message'] = 'Login successful!';
        $response['user'] = $_SESSION['logged_in_user'];
        break;

    case 'logout':
        // Save current cart to user's cart before logout
        if (isset($_SESSION['logged_in_user'])) {
            $userId = $_SESSION['logged_in_user']['id'];
            $_SESSION['user_carts'][$userId] = $_SESSION['cart'] ?? [];
        }

        // Clear logged in user and cart
        unset($_SESSION['logged_in_user']);
        $_SESSION['cart'] = [];

        $response['success'] = true;
        $response['message'] = 'Logged out successfully.';
        break;

    case 'check':
        // Check if user is logged in
        if (isset($_SESSION['logged_in_user'])) {
            $response['success'] = true;
            $response['user'] = $_SESSION['logged_in_user'];
            $response['message'] = 'User is logged in.';
        } else {
            $response['message'] = 'User is not logged in.';
        }
        break;

    case 'get_cart':
        // Get current cart items
        if (isset($_SESSION['logged_in_user'])) {
            $response['success'] = true;
            $response['cart'] = $_SESSION['cart'] ?? [];
            $response['message'] = 'Cart retrieved successfully.';
        } else {
            $response['message'] = 'User not logged in.';
        }
        break;

    case 'save_cart':
        // Save cart for current user
        if (isset($_SESSION['logged_in_user'])) {
            $cartData = json_decode($_POST['cart'] ?? '[]', true);
            if (is_array($cartData)) {
                $_SESSION['cart'] = $cartData;
                $userId = $_SESSION['logged_in_user']['id'];
                $_SESSION['user_carts'][$userId] = $cartData;
                $response['success'] = true;
                $response['message'] = 'Cart saved successfully.';
            } else {
                $response['message'] = 'Invalid cart data.';
            }
        } else {
            $response['message'] = 'User not logged in.';
        }
        break;

    default:
        $response['message'] = 'Invalid action.';
}

echo json_encode($response);
