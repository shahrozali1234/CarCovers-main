-- ===== AUTO SHIELD DATABASE SETUP =====
-- This SQL script creates the database and table for the AutoShield e-commerce backend

-- Create database (run this in MySQL workbench or phpMySQL)
CREATE DATABASE IF NOT EXISTS autoshield;
USE autoshield;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cat VARCHAR(100) NOT NULL DEFAULT 'Car Covers',
    price DECIMAL(10, 2) NOT NULL,
    old DECIMAL(10, 2),
    image VARCHAR(255) DEFAULT 'default.jpg',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes for faster queries
    INDEX idx_category (cat),
    INDEX idx_createdAt (createdAt)
);

-- ===== INITIAL PRODUCT DATA =====
-- Insert initial products if table is empty
INSERT IGNORE INTO products (name, cat, price, old, image) VALUES
('Premium Black Car Top Cover', 'Car Covers', 6999, 8999, 'car-cover-black.jpg'),
('Water Resistant Silver Cover', 'Car Covers', 7499, 8999, 'car-cover-silver.jpg'),
('UV Protection Sport Cover', 'Car Covers', 6499, 8299, 'car-cover-sport.jpg'),
('All Weather Premium Cover', 'SUV Covers', 8999, 10999, 'car-cover-suv.jpg'),
('Compact Sedan Top Cover', 'Car Covers', 5999, 7499, 'car-cover-sedan.jpg'),
('Premium Bike Cover', 'Bike Covers', 2999, 3999, 'bike-cover.jpg'),
('SUV Heavy Duty Cover', 'SUV Covers', 9499, 11999, 'car-cover-suv-heavy.jpg'),
('Car Cover Storage Bag', 'Accessories', 1499, 1999, 'accessory-bag.jpg');

-- ===== SAMPLE QUERIES =====
-- Select all products
SELECT * FROM products;

-- Get products by category
SELECT * FROM products WHERE cat = 'Car Covers';

-- Search products by name
SELECT * FROM products WHERE name LIKE '%Black%';

-- Get product by ID
SELECT * FROM products WHERE id = 1;

-- Insert a new product
INSERT INTO products (name, cat, price, old, image) VALUES ('New Product', 'Car Covers', 1000, 1500, 'new.jpg');

-- Update product price
UPDATE products SET price = 7000 WHERE id = 1;

-- Delete product
DELETE FROM products WHERE id = 99;

-- ===== ORDERS TABLE & LOGS =====
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    payment_method VARCHAR(100) DEFAULT 'Cash on Delivery (COD)',
    total_amount DECIMAL(10, 2) NOT NULL,
    items_json LONGTEXT NOT NULL,
    notes TEXT,
    status VARCHAR(50) DEFAULT 'Confirmed',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_order_num (order_number),
    INDEX idx_order_phone (phone),
    INDEX idx_order_createdAt (createdAt)
);