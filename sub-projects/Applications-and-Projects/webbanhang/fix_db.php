<?php
require_once 'app/config/database.php';

$db = new Database();
$conn = $db->getConnection();

try {
    $conn->beginTransaction();

    // Disable foreign key checks temporarily
    $conn->exec("SET FOREIGN_KEY_CHECKS = 0;");

    // Clear tables
    $conn->exec("TRUNCATE TABLE `product`;");
    $conn->exec("TRUNCATE TABLE `category`;");

    // Insert categories with UTF-8
    $categories = [
        ['name' => 'Điện thoại', 'desc' => 'Các dòng điện thoại thông minh'],
        ['name' => 'Laptop', 'desc' => 'Máy tính xách tay các hãng'],
        ['name' => 'Chuột', 'desc' => 'Chuột máy tính không dây, có dây'],
        ['name' => 'Bàn phím', 'desc' => 'Bàn phím cơ, bàn phím văn phòng'],
        ['name' => 'Tai nghe', 'desc' => 'Tai nghe bluetooth, tai nghe chụp tai']
    ];

    $stmt_cat = $conn->prepare("INSERT INTO `category` (`name`, `description`) VALUES (:name, :desc)");
    foreach ($categories as $cat) {
        $stmt_cat->execute([':name' => $cat['name'], ':desc' => $cat['desc']]);
    }

    // Insert products with external image URLs
    $products = [
        [
            'name' => 'iPhone 15 Pro Max 256GB',
            'desc' => 'Màn hình 6.7 inch, Chip A17 Pro, Camera 48MP.',
            'price' => 30990000,
            'category_id' => 1,
            'image' => 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Samsung Galaxy S24 Ultra 256GB',
            'desc' => 'Màn hình 6.8 inch, Chip Snapdragon 8 Gen 3, Camera 200MP.',
            'price' => 27490000,
            'category_id' => 1,
            'image' => 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'MacBook Air M3 13 inch 8GB/256GB',
            'desc' => 'Chip Apple M3 mạnh mẽ, thiết kế mỏng nhẹ, pin 18h.',
            'price' => 27990000,
            'category_id' => 2,
            'image' => 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Dell XPS 13 Plus 9320',
            'desc' => 'Màn hình OLED, CPU Intel Core i7, RAM 16GB.',
            'price' => 39990000,
            'category_id' => 2,
            'image' => 'https://images.unsplash.com/photo-1496181130204-755241544e35?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Chuột không dây Logitech MX Master 3S',
            'desc' => 'Chuột công thái học, cảm biến 8000 DPI, click chống ồn.',
            'price' => 2490000,
            'category_id' => 3,
            'image' => 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Bàn phím cơ Keychron K8 Pro',
            'desc' => 'Bàn phím cơ không dây, hotswap, LED RGB, switch Gateron.',
            'price' => 2290000,
            'category_id' => 4,
            'image' => 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Tai nghe Sony WH-1000XM5',
            'desc' => 'Tai nghe chống ồn chủ động không dây đỉnh cao, âm thanh Hi-Res.',
            'price' => 7490000,
            'category_id' => 5,
            'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop'
        ]
    ];

    $stmt_prod = $conn->prepare("INSERT INTO `product` (`name`, `description`, `price`, `category_id`, `image`) VALUES (:name, :desc, :price, :cat_id, :img)");
    
    foreach ($products as $prod) {
        $stmt_prod->execute([
            ':name' => $prod['name'],
            ':desc' => $prod['desc'],
            ':price' => $prod['price'],
            ':cat_id' => $prod['category_id'],
            ':img' => $prod['image']
        ]);
    }

    $conn->exec("SET FOREIGN_KEY_CHECKS = 1;");
    $conn->commit();

    echo "Data fixed successfully.\n";
} catch (Exception $e) {
    $conn->rollBack();
    echo "Error: " . $e->getMessage() . "\n";
}
?>
