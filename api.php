<?php
// ===== Minimal PHP API with Product class =====

// Database connection
$pdo = new PDO("mysql:host=localhost;dbname=autoshield", "root", "");
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Product class
class Product {
    public function getAll() {
        $stmt = $pdo->query("SELECT id, name, cat, price, old, image FROM products ORDER BY createdAt DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getById($id) {
        $stmt = $pdo->prepare("SELECT id, name, cat, price, old, image FROM products WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }
    
    public function create($name, $cat, $price, $old, $image) {
        $stmt = $pdo->prepare("INSERT INTO products (name, cat, price, old, image) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdii", $name, $cat, $price, $old, $image);
        $stmt->execute();
        return $pdo->lastInsertId();
    }
    
    public function update($id, $name, $cat, $price, $old, $image) {
        $stmt = $pdo->prepare("UPDATE products SET name = ?, cat = ?, price = ?, old = ?, image = ? WHERE id = ?");
        $stmt->bind_param("ssdii", $name, $cat, $price, $old, $image, $id);
        $stmt->execute();
        return $stmt->affected_rows;
    }
    
    public function delete($id) {
        $stmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->affected_rows;
    }
}

// Order class
class Order {
    public function create($orderNum, $custName, $phone, $city, $address, $payment, $total, $itemsJson, $notes) {
        global $pdo;
        $stmt = $pdo->prepare("INSERT INTO orders (order_number, customer_name, phone, city, address, payment_method, total_amount, items_json, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$orderNum, $custName, $phone, $city, $address, $payment, $total, $itemsJson, $notes]);
        return $pdo->lastInsertId();
    }
    
    public function getAll() {
        global $pdo;
        $stmt = $pdo->query("SELECT * FROM orders ORDER BY createdAt DESC");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

// Initialize models
$product = new Product();
$orderModel = new Order();

// Handle API requests
$uri = explode('/', trim($_SERVER["REQUEST_URI"], '/'));
$method = $_SERVER["REQUEST_METHOD"];
$uri = array_values(array_filter($uri, function($x) { return !empty($x); }));

// Determine route segments
$isOrdersRoute = (isset($uri[0]) && $uri[0] === 'api' && isset($uri[1]) && $uri[1] === 'orders') || (isset($uri[0]) && $uri[0] === 'orders');

if ($isOrdersRoute) {
    if ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($data) {
            $orderNum = $data["order_number"] ?? ('AS-' . rand(100000, 999999));
            $itemsJson = is_array($data["items"] ?? null) ? json_encode($data["items"]) : ($data["items_json"] ?? "[]");
            $newId = $orderModel->create(
                $orderNum,
                $data["customer_name"] ?? "",
                $data["phone"] ?? "",
                $data["city"] ?? "",
                $data["address"] ?? "",
                $data["payment_method"] ?? "Cash on Delivery",
                $data["total_amount"] ?? 0,
                $itemsJson,
                $data["notes"] ?? ""
            );
            echo json_encode(["status" => "success", "orderId" => $newId, "orderNumber" => $orderNum]);
        } else {
            echo json_encode(["status" => "error", "message" => "No order data provided"]);
        }
    } elseif ($method === 'GET') {
        $orders = $orderModel->getAll();
        echo json_encode(["status" => "success", "orders" => $orders, "count" => count($orders)]);
    }
    exit;
}

// Routes: /api/products (GET, POST) and /api/products/{id} (GET, PUT, DELETE)
if (isset($uri[0]) && $uri[0] === 'api' && isset($uri[1]) && $uri[1] === 'products') {
    $id = isset($uri[2]) ? (int)$uri[2] : null;
    
    if ($method === 'GET') {
        if ($id > 0) {
            $data = $product->getById($id);
            if ($data) echo json_encode(["status" => "success", "product" => $data]);
            else echo json_encode(["status" => "not_found", "message" => "Not found"]);
        } else {
            $data = $product->getAll();
            echo json_encode(["status" => "success", "products" => $data, "count" => count($data)]);
        }
    } elseif ($method === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($data) {
            $newId = $product->create($data["name"] ?? "", $data["cat"] ?? "Car Covers", $data["price"] ?? 0, $data["old"] ?? 0, $data["image"] ?? "default");
            echo json_encode(["status" => "success", "productId" => $newId]);
        } else {
            echo json_encode(["status" => "error", "message" => "No data"]);
        }
    } elseif ($method === 'PUT') {
        if ($id > 0) {
            $data = json_decode(file_get_contents("php://input"), true);
            if ($data) {
                $rows = $product->update($id, $data["name"] ?? "", $data["cat"] ?? "Car Covers", $data["price"] ?? 0, $data["old"] ?? 0, $data["image"] ?? "");
                if ($rows > 0) echo json_encode(["status" => "success", "message" => "Updated"]);
                else echo json_encode(["status" => "not_found"]);
            } else {
                echo json_encode(["status" => "error"]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "ID required"]);
        }
    } elseif ($method === 'DELETE') {
        if ($id > 0) {
            $rows = $product->delete($id);
            if ($rows > 0) echo json_encode(["status" => "success", "message" => "Deleted"]);
            else echo json_encode(["status" => "not_found"]);
        } else {
            echo json_encode(["status" => "error", "message" => "ID required"]);
        }
    }
} else {
    // Default: show info
    echo json_encode(["status" => "success", "message" => "API running", "endpoints" => ["/api/products", "/api/orders"]]);
}