<?php
// ===== PRODUCT OPERATIONS =====
// Contains all product database operations for the AutoShield backend

// Get all products with pagination support
function getAllProducts($conn, $page = 1, $limit = 20) {
    $offset = ($page - 1) * $limit;
    
    $query = "SELECT id, name, cat, price, old, image FROM products ORDER BY createdAt DESC LIMIT :limit OFFSET :offset";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":limit", $limit, PDO::PARAM_INT);
    $stmt->bindValue(":offset", $offset, PDO::PARAM_INT);
    $stmt->execute();
    
    $products = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $products[] = $row;
    }
    
    // Get total count for pagination
    $countQuery = "SELECT COUNT(*) as total FROM products";
    $countStmt = $conn->query($countQuery);
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)["total"];
    
    return [
        "products" => $products,
        "total" => $total,
        "page" => $page,
        "totalPages" => ceil($total / $limit)
    ];
}

// Get a single product by ID
function getProductById($conn, $id) {
    $query = "SELECT id, name, cat, price, old, image FROM products WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($row) {
        return [
            "status" => "success",
            "product" => $row
        ];
    } else {
        return [
            "status" => "not_found",
            "message" => "Product not found"
        ];
    }
}

// Create a new product
function createProduct($conn, $name, $cat, $price, $old, $image) {
    $query = "INSERT INTO products (name, cat, price, old, image) VALUES (:name, :cat, :price, :old, :image)";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":name", $name);
    $stmt->bindValue(":cat", $cat);
    $stmt->bindValue(":price", $price);
    $stmt->bindValue(":old", $old);
    $stmt->bindValue(":image", $image);
    
    $stmt->execute();
    
    return [
        "status" => "success",
        "message" => "Product created successfully",
        "productId" => $conn->lastInsertId()
    ];
}

// Update a product
function updateProduct($conn, $id, $name, $cat, $price, $old, $image) {
    $query = "UPDATE products SET name = :name, cat = :cat, price = :price, old = :old, image = :image WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->bindValue(":name", $name);
    $stmt->bindValue(":cat", $cat);
    $stmt->bindValue(":price", $price);
    $stmt->bindValue(":old", $old);
    $stmt->bindValue(":image", $image);
    
    $stmt->execute();
    
    return [
        "status" => $stmt->rowCount() > 0 ? "success" : "not_found",
        "message" => $stmt->rowCount() > 0 ? "Product updated successfully" : "Product not found"
    ];
}

// Delete a product
function deleteProduct($conn, $id) {
    $query = "DELETE FROM products WHERE id = :id";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":id", $id, PDO::PARAM_INT);
    $stmt->execute();
    
    return [
        "status" => $stmt->rowCount() > 0 ? "success" : "not_found",
        "message" => $stmt->rowCount() > 0 ? "Product deleted successfully" : "Product not found"
    ];
}

// Search products by name or category
function searchProducts($conn, $query) {
    $search = "%" . $query . "%";
    
    $query = "SELECT id, name, cat, price, old, image FROM products WHERE name LIKE :query OR cat LIKE :query ORDER BY createdAt DESC";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":query", $search, PDO::PARAM_STR);
    $stmt->execute();
    
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Get products by category
function getProductsByCategory($conn, $category) {
    $query = "SELECT id, name, cat, price, old, image FROM products WHERE cat = :category ORDER BY createdAt DESC";
    $stmt = $conn->prepare($query);
    $stmt->bindValue(":category", $category, PDO::PARAM_STR);
    $stmt->execute();
    
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}