<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStore - Điện thoại, Laptop, Phụ kiện</title>
    <!-- Use FontAwesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/css/style.css">
</head>
<body>

<div class="ambient-blob ambient-blob-1"></div>
<div class="ambient-blob ambient-blob-2"></div>
<div class="ambient-blob ambient-blob-3"></div>

<header class="header">
    <div class="container">
        <div class="header-top">
            <a href="index.php" class="logo">
                <i class="fa-solid fa-bolt"></i> TECHSTORE
            </a>
            
            <form class="search-bar" action="index.php" method="GET">
                <input type="hidden" name="url" value="default/search">
                <input type="text" name="keyword" placeholder="Bạn tìm gì hôm nay..." required>
                <button type="submit"><i class="fa-solid fa-search"></i></button>
            </form>

            <div class="header-actions">
                <a href="index.php?url=cart" class="action-item">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <?php 
                        $cart_count = 0;
                        if(isset($_SESSION['cart'])) {
                            foreach($_SESSION['cart'] as $item) {
                                $cart_count += $item['quantity'];
                            }
                        }
                    ?>
                    <span class="badge"><?= $cart_count ?></span>
                    <span>Giỏ hàng</span>
                </a>

                <a href="index.php?url=auth/profile" class="action-item">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <span>Lịch sử ĐH</span>
                </a>
                
                <?php if (isset($_SESSION['user_id'])): ?>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <a href="index.php?url=auth/profile" class="action-item">
                            <i class="fa-solid fa-circle-user" style="font-size: 1.25rem;"></i>
                            <span><?= htmlspecialchars($_SESSION['user_name']) ?></span>
                        </a>
                        <a href="index.php?url=auth/logout" class="action-item" title="Đăng xuất">
                            <i class="fa-solid fa-sign-out-alt"></i>
                        </a>
                        <?php if (isset($_SESSION['user_role']) && $_SESSION['user_role'] == 'admin'): ?>
                            <a href="index.php?url=admin" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem; box-shadow: none;">
                                <i class="fa-solid fa-gauge"></i> Admin
                            </a>
                        <?php endif; ?>
                    </div>
                <?php else: ?>
                    <a href="index.php?url=auth/login" class="btn btn-outline" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;">
                        <i class="fa-solid fa-user"></i> Đăng nhập
                    </a>
                <?php endif; ?>
            </div>
        </div>
        
        <nav class="nav">
            <ul class="nav-list">
                <li><a href="index.php">Trang chủ</a></li>
                <?php if(isset($categories)): ?>
                    <?php foreach($categories as $cat): ?>
                        <li><a href="index.php?url=default/category/<?= $cat->id ?>"><?= htmlspecialchars($cat->name) ?></a></li>
                    <?php endforeach; ?>
                <?php endif; ?>
            </ul>
        </nav>
    </div>
</header>
<main class="main-content container">
