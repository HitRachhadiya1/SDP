<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once "data/products.php";

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Shipping calculation function
function calculateShippingCost($method, $subtotal)
{
    switch ($method) {
        case 'express':
            return min(80, $subtotal * 0.10);
        case 'white_glove':
            return min(150, $subtotal * 0.05);
        case 'freight':
            return max(200, $subtotal * 0.03);
        case 'standard':
        default:
            return 40;
    }
}

header('Content-Type: application/json');

$action = $_POST['action'] ?? '';
$productId = $_POST['product_id'] ?? '';

$response = [
    'success' => true,
    'message' => '',
    'cart_count' => 0,
    'item_total' => null,
    'item_quantity' => null,
    'totals' => [
        'subtotal' => 0,
        'shipping' => 0,
        'tax' => 0,
        'total' => 0
    ]
];

switch ($action) {
    case 'add':
        $quantity = max(1, intval($_POST['quantity'] ?? 1));
        if (!isset($products[$productId])) {
            $response['success'] = false;
            $response['message'] = 'Invalid product.';
            echo json_encode($response);
            exit;
        }
        if (isset($_SESSION['cart'][$productId])) {
            $_SESSION['cart'][$productId]['quantity'] += $quantity;
        } else {
            $_SESSION['cart'][$productId] = [
                'quantity' => $quantity,
                'added_at' => time()
            ];
        }
        $response['message'] = 'Added to cart.';
        break;
    case 'update':
        if (isset($_SESSION['cart'][$productId])) {
            $quantity = max(1, intval($_POST['quantity'] ?? 1));
            $response['message'] = 'Quantity updated.';
            $_SESSION['cart'][$productId]['quantity'] = $quantity;
        }
        break;
    case 'change':
        if (isset($_SESSION['cart'][$productId])) {
            $change = intval($_POST['change'] ?? 0);
            $currentQuantity = $_SESSION['cart'][$productId]['quantity'];
            $quantity = max(1, min(10, $currentQuantity + $change));
            $_SESSION['cart'][$productId]['quantity'] = $quantity;
            $response['message'] = 'Quantity updated.';
        }
        break;
    case 'remove':
        if (isset($_SESSION['cart'][$productId])) {
            unset($_SESSION['cart'][$productId]);
            $response['message'] = 'Item removed.';
        }
        break;
    case 'clear':
        $_SESSION['cart'] = [];
        $response['message'] = 'Cart cleared.';
        break;
    case 'summary':
        $response['message'] = 'Summary fetched.';
        break;
    case 'calculate_shipping':
        $shippingMethod = $_POST['shipping_method'] ?? 'standard';
        $subtotal = (float)$_POST['subtotal'];
        $taxRate = 0.18; // 18% tax rate

        // Calculate shipping cost
        $shippingCost = calculateShippingCost($shippingMethod, $subtotal);

        // Calculate tax and total
        $tax = ($subtotal + $shippingCost) * $taxRate;
        $total = $subtotal + $shippingCost + $tax;

        echo json_encode([
            'success' => true,
            'shipping_cost' => $shippingCost,
            'tax' => $tax,
            'total' => $total
        ]);
        exit;
        break;
    default:
        $response['success'] = false;
        $response['message'] = 'Invalid action.';
        echo json_encode($response);
        exit;
}

$subtotal = 0;
$totalQuantity = 0;
$taxRate = 0.18;

$shipping = 0;

foreach ($_SESSION['cart'] as $id => $item) {
    $totalQuantity += $item['quantity'];
    if (isset($products[$id])) {
        $itemSubtotal = $products[$id]['price'] * $item['quantity'];
        $subtotal += $itemSubtotal;

        $shipping += $itemSubtotal * ($item['quantity'] / 100);
    }
}

$tax = ($subtotal + $shipping) * $taxRate;
$total = $subtotal + $shipping + $tax;

$response['totals'] = [
    'subtotal' => $subtotal,
    'shipping' => $shipping,
    'tax' => $tax,
    'total' => $total
];

$cartCount = 0;
foreach ($_SESSION['cart'] as $item) {
    $cartCount += intval($item['quantity'] ?? 0);
}
$response['cart_count'] = $cartCount;

if (isset($_SESSION['cart'][$productId]) && isset($products[$productId])) {
    $response['item_quantity'] = $_SESSION['cart'][$productId]['quantity'];
    $response['item_total'] = $products[$productId]['price'] * $_SESSION['cart'][$productId]['quantity'];
}

echo json_encode($response);
