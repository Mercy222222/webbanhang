<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Setup - GEARVN</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0f172a;
            --surface: #1e293b;
            --border: #334155;
            --text: #f8fafc;
            --text-muted: #94a3b8;
            --primary: #6366f1;
            --success: #10b981;
            --error: #ef4444;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            background-color: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 2.5rem;
            width: 100%;
            max-width: 600px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }
        h1 {
            font-size: 1.8rem;
            margin-top: 0;
            margin-bottom: 1.5rem;
            color: #fff;
            border-bottom: 1px solid var(--border);
            padding-bottom: 1rem;
        }
        .step {
            margin-bottom: 1rem;
            padding: 1rem;
            border-radius: 8px;
            background-color: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .step-info {
            display: flex;
            flex-direction: column;
        }
        .step-title {
            font-weight: 600;
            font-size: 0.95rem;
        }
        .step-desc {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-top: 0.25rem;
        }
        .badge {
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        .badge-pending {
            background-color: rgba(148, 163, 184, 0.1);
            color: var(--text-muted);
        }
        .badge-success {
            background-color: rgba(16, 185, 129, 0.1);
            color: var(--success);
        }
        .badge-error {
            background-color: rgba(239, 68, 68, 0.1);
            color: var(--error);
        }
        .btn {
            display: block;
            width: 100%;
            padding: 0.75rem;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            margin-top: 1.5rem;
            transition: opacity 0.2s;
        }
        .btn:hover {
            opacity: 0.9;
        }
        pre {
            background: #090d16;
            padding: 1rem;
            border-radius: 6px;
            font-size: 0.8rem;
            overflow-x: auto;
            color: #e2e8f0;
            border: 1px solid var(--border);
        }
    </style>
</head>
<body>
<div class="container">
    <h1>Cấu hình Cơ sở dữ liệu GEARVN</h1>

    <?php
    $host = "localhost";
    $username = "root";
    $password = "";
    $db_name = "my_store";

    $steps = [
        'connect' => ['title' => 'Kết nối MySQL Server', 'desc' => 'Thực hiện kết nối đến localhost', 'status' => 'pending', 'msg' => ''],
        'create_db' => ['title' => 'Tạo Cơ sở dữ liệu', 'desc' => 'Tạo database my_store nếu chưa tồn tại', 'status' => 'pending', 'msg' => ''],
        'schema' => ['title' => 'Khởi tạo cấu trúc bảng', 'desc' => 'Nhập các bảng từ database.sql', 'status' => 'pending', 'msg' => ''],
        'seed_categories' => ['title' => 'Nhập danh mục', 'desc' => 'Nhập danh mục sản phẩm mặc định', 'status' => 'pending', 'msg' => ''],
        'seed_products' => ['title' => 'Nhập sản phẩm mẫu', 'desc' => 'Cập nhật các sản phẩm và link ảnh từ fix_db.php', 'status' => 'pending', 'msg' => ''],
        'create_admin' => ['title' => 'Tạo tài khoản quản trị', 'desc' => 'Tạo admin@gearvn.com / admin123', 'status' => 'pending', 'msg' => ''],
    ];

    try {
        // 1. Connect
        $conn = new PDO("mysql:host=$host", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $steps['connect']['status'] = 'success';
        $steps['connect']['msg'] = 'Kết nối thành công!';

        // 2. Create Database
        $conn->exec("CREATE DATABASE IF NOT EXISTS `$db_name` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
        $conn->exec("USE `$db_name`;");
        $conn->exec("SET NAMES utf8mb4;");
        $steps['create_db']['status'] = 'success';
        $steps['create_db']['msg'] = "Database `$db_name` đã sẵn sàng.";

        // 3. Schema
        if (file_exists('database.sql')) {
            $sql = file_get_contents('database.sql');
            
            // Remove comments and split by semicolon
            $sql_clean = preg_replace('/--.*\n/', '', $sql);
            $sql_clean = preg_replace('/\/\*.*?\*\//s', '', $sql_clean);
            $statements = array_filter(array_map('trim', explode(';', $sql_clean)));

            $conn->exec("SET FOREIGN_KEY_CHECKS = 0;");
            foreach ($statements as $stmt) {
                if (!empty($stmt)) {
                    $conn->exec($stmt);
                }
            }
            $conn->exec("SET FOREIGN_KEY_CHECKS = 1;");
            $steps['schema']['status'] = 'success';
            $steps['schema']['msg'] = 'Đã tạo xong các bảng: users, category, product, orders, order_details.';
        } else {
            throw new Exception("Không tìm thấy file database.sql trong thư mục gốc.");
        }

        // 4. Seed Categories (Already inserted in database.sql, but let's double check or rewrite to prevent duplicate key)
        $steps['seed_categories']['status'] = 'success';
        $steps['seed_categories']['msg'] = 'Đã nhập danh mục mẫu thành công.';

        // 5. Seed Products (From fix_db.php logic)
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

        $conn->exec("SET FOREIGN_KEY_CHECKS = 0;");
        $conn->exec("TRUNCATE TABLE `product`;");
        
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
        $steps['seed_products']['status'] = 'success';
        $steps['seed_products']['msg'] = 'Đã cập nhật xong các sản phẩm mẫu vào bảng product.';

        // Seed Coupons
        $conn->exec("TRUNCATE TABLE `coupons`;");
        $stmt_coupon = $conn->prepare("INSERT INTO `coupons` (`code`, `discount_type`, `discount_value`, `expiry_date`) VALUES (:code, :type, :val, :expiry)");
        $stmt_coupon->execute([':code' => 'GIAM10', ':type' => 'percentage', ':val' => 10, ':expiry' => date('Y-m-d', strtotime('+30 days'))]);
        $stmt_coupon->execute([':code' => 'TECH50K', ':type' => 'fixed', ':val' => 50000, ':expiry' => date('Y-m-d', strtotime('+30 days'))]);

        // 6. Create Admin
        $admin_email = 'admin@gearvn.com';
        $admin_pass_plain = 'admin123';
        $admin_pass_hash = password_hash($admin_pass_plain, PASSWORD_BCRYPT);
        
        $stmt_admin_check = $conn->prepare("SELECT id FROM `users` WHERE email = :email");
        $stmt_admin_check->execute([':email' => $admin_email]);
        
        if ($stmt_admin_check->rowCount() == 0) {
            $stmt_admin = $conn->prepare("INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES (:name, :email, :password, :role)");
            $stmt_admin->execute([
                ':name' => 'Administrator',
                ':email' => $admin_email,
                ':password' => $admin_pass_hash,
                ':role' => 'admin'
            ]);
            $steps['create_admin']['msg'] = "Đã tạo tài khoản admin: $admin_email / $admin_pass_plain";
        } else {
            $steps['create_admin']['msg'] = "Tài khoản admin ($admin_email) đã tồn tại.";
        }
        $steps['create_admin']['status'] = 'success';

    } catch (Exception $e) {
        foreach ($steps as $k => $v) {
            if ($steps[$k]['status'] === 'pending') {
                $steps[$k]['status'] = 'error';
                $steps[$k]['msg'] = $e->getMessage();
                break;
            }
        }
    }

    // Display steps
    foreach ($steps as $key => $step) {
        $badgeClass = 'badge-' . $step['status'];
        $badgeText = '';
        if ($step['status'] == 'pending') $badgeText = 'Đang chờ';
        elseif ($step['status'] == 'success') $badgeText = 'Hoàn tất';
        else $badgeText = 'Lỗi';

        echo "<div class='step'>";
        echo "  <div class='step-info'>";
        echo "      <div class='step-title'>" . htmlspecialchars($step['title']) . "</div>";
        echo "      <div class='step-desc'>" . htmlspecialchars($step['desc']) . "</div>";
        if (!empty($step['msg'])) {
            echo "      <div style='margin-top: 0.5rem; font-size: 0.8rem; color: " . ($step['status'] == 'success' ? 'var(--success)' : 'var(--error)') . ";'>" . htmlspecialchars($step['msg']) . "</div>";
        }
        echo "  </div>";
        echo "  <span class='badge {$badgeClass}'>{$badgeText}</span>";
        echo "</div>";
    }
    ?>

    <?php if (isset($steps['create_admin']['status']) && $steps['create_admin']['status'] == 'success'): ?>
        <a href="index.php?url=auth/login" class="btn">Đi tới trang Đăng nhập</a>
    <?php else: ?>
        <a href="setup_db.php" class="btn" style="background-color: var(--error);">Thử lại</a>
    <?php endif; ?>
</div>
</body>
</html>
