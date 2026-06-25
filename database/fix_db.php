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
        ['name' => 'Laptop Gaming', 'desc' => 'Laptop chơi game cao cấp, cấu hình khủng'],
        ['name' => 'PC GEARVN', 'desc' => 'Máy tính để bàn GEARVN cấu hình tối ưu'],
        ['name' => 'Linh Kiện Máy Tính', 'desc' => 'CPU, Ram, VGA, SSD, Mainboard chính hãng'],
        ['name' => 'Màn Hình Máy Tính', 'desc' => 'Màn hình gaming tần số quét cao, siêu nét'],
        ['name' => 'Bàn Phím Cơ', 'desc' => 'Bàn phím cơ cao cấp, hotswap, keycap đẹp'],
        ['name' => 'Chuột Gaming', 'desc' => 'Chuột gaming độ nhạy cao, công thái học'],
        ['name' => 'Tai Nghe Gaming', 'desc' => 'Tai nghe chơi game âm thanh vòm, chống ồn chủ động']
    ];

    $stmt_cat = $conn->prepare("INSERT INTO `category` (`name`, `description`) VALUES (:name, :desc)");
    foreach ($categories as $cat) {
        $stmt_cat->execute([':name' => $cat['name'], ':desc' => $cat['desc']]);
    }

    // Insert products with external image URLs
    $products = [
        [
            'name' => 'Laptop Gaming ASUS ROG Strix G16 (2024)',
            'desc' => 'CPU Intel Core i7-13650HX, GPU RTX 4060 8GB, RAM 16GB DDR5, SSD 512GB PCIe, Màn hình 16" FHD+ IPS 165Hz.',
            'price' => 35990000,
            'category_id' => 1,
            'image' => 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Laptop Gaming Acer Predator Helios Neo 16',
            'desc' => 'CPU Intel Core i7-14700HX, GPU RTX 4060 8GB, RAM 16GB DDR5, SSD 512GB PCIe, Màn hình 16" WQXGA 240Hz.',
            'price' => 37490000,
            'category_id' => 1,
            'image' => 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'PC GEARVN G-Shield Intel (14th Gen)',
            'desc' => 'Case máy tính GEARVN tối ưu hóa hiệu năng chơi game, Intel Core i5-14400F, RAM 16GB, SSD 512GB, RTX 4060.',
            'price' => 19990000,
            'category_id' => 2,
            'image' => 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Card Màn Hình ASUS ROG Strix GeForce RTX 4070 Ti Super 16GB',
            'desc' => 'Card đồ họa đỉnh cao với thiết kế hầm hố triple-fan Axial-tech, led Aura Sync RGB, 16GB VRAM GDDR6X.',
            'price' => 26890000,
            'category_id' => 3,
            'image' => 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Bộ vi xử lý Intel Core i9-14900K',
            'desc' => 'CPU cao cấp thế hệ 14 Raptor Lake Refresh, 24 Cores (8 P-cores + 16 E-cores), 32 Threads, Max Turbo 6.0 GHz.',
            'price' => 15490000,
            'category_id' => 3,
            'image' => 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Màn Hình Gaming ASUS ROG Swift PG27AQDM OLED 2K 240Hz',
            'desc' => 'Màn hình chơi game OLED 27 inch sắc nét, độ phân giải 2K QHD (2560x1440), tần số quét siêu cao 240Hz, phản hồi 0.03ms.',
            'price' => 21990000,
            'category_id' => 4,
            'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Bàn phím cơ không dây ASUS ROG Azoth OLED',
            'desc' => 'Bàn phím cơ Custom 75% cao cấp, màn hình hiển thị OLED, núm xoay đa năng, Hotswap switch ROG NX, kết nối 3 chế độ.',
            'price' => 5990000,
            'category_id' => 5,
            'image' => 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Chuột chơi game không dây Logitech G502 X Plus Wireless',
            'desc' => 'Chuột chơi game huyền thoại nâng cấp, công nghệ switch lai LIGHTFORCE, cảm biến HERO 25K cực nhạy, led LIGHTSYNC RGB.',
            'price' => 3590000,
            'category_id' => 6,
            'image' => 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=400&auto=format&fit=crop'
        ],
        [
            'name' => 'Tai nghe chơi game không dây Razer BlackShark V2 Pro (2023)',
            'desc' => 'Tai nghe Esports chụp tai, kết nối HyperSpeed Wireless, màng loa TriForce Titanium 50mm, mic tháo rời Super Wideband.',
            'price' => 4690000,
            'category_id' => 7,
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
