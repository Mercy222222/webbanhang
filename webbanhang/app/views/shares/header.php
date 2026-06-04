<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore - Điện thoại, Laptop, Phụ kiện</title>
    <!-- Use FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/webbanhang/public/css/style.css">
</head>
<body>

<header class="header">
    <div class="container">
        <div class="header-top">
            <a href="/webbanhang/index.php" class="logo">
                <i class="fa-solid fa-bolt"></i> TechStore
            </a>
            
            <form class="search-bar" action="/webbanhang/index.php" method="GET">
                <input type="hidden" name="url" value="default/search">
                <input type="text" name="keyword" placeholder="Tìm kiếm sản phẩm, danh mục..." required>
                <button type="submit"><i class="fa-solid fa-search"></i></button>
            </form>

            <div class="header-actions">
                <a href="/webbanhang/index.php?url=cart" class="action-item">
                    <i class="fa-solid fa-cart-shopping"></i> Giỏ hàng
                    <?php 
                        $cart_count = 0;
                        if(isset($_SESSION['cart'])) {
                            foreach($_SESSION['cart'] as $item) {
                                $cart_count += $item['quantity'];
                            }
                        }
                    ?>
                    <span class="badge"><?= $cart_count ?></span>
                </a>

                <a href="/webbanhang/index.php?url=auth/profile" class="action-item">
                    <i class="fa-solid fa-clock-rotate-left"></i> Lịch sử ĐH
                </a>
                
                <?php if (isset($_SESSION['user_id'])): ?>
                    <a href="/webbanhang/index.php?url=auth/logout" class="action-item">
                        <i class="fa-solid fa-user"></i> Đăng xuất (<?= htmlspecialchars($_SESSION['user_name']) ?>)
                    </a>
                    <?php if ($_SESSION['user_role'] == 'admin'): ?>
                        <a href="/webbanhang/index.php?url=admin" class="action-item" style="color: #ef4444;">
                            <i class="fa-solid fa-gauge"></i> Admin
                        </a>
                    <?php endif; ?>
                <?php else: ?>
                    <a href="/webbanhang/index.php?url=auth/login" class="action-item">
                        <i class="fa-solid fa-user"></i> Đăng nhập
                    </a>
                <?php endif; ?>
            </div>
        </div>
        
        <nav class="nav">
            <ul class="nav-list">
                <li><a href="/webbanhang/index.php">Trang chủ</a></li>
                <?php if(isset($categories)): ?>
                    <?php foreach($categories as $cat): ?>
                        <li><a href="/webbanhang/index.php?url=default/category/<?= $cat->id ?>"><?= htmlspecialchars($cat->name) ?></a></li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
        </nav>
    </div>
</header>
<main class="main-content container">
