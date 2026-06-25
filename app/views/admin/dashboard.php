<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - GEARVN</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/css/style.css">
</head>
<body class="admin-layout">

<aside class="admin-sidebar">
    <div class="admin-sidebar-header">
        <i class="fa-solid fa-gamepad" style="color: var(--primary-light);"></i> GEARVN Admin
    </div>
    <nav class="admin-nav">
        <a href="index.php?url=admin" class="active"><i class="fa-solid fa-gauge"></i> Dashboard</a>
        <a href="index.php?url=admin/categories"><i class="fa-solid fa-list"></i> Quản lý danh mục</a>
        <a href="index.php?url=admin/products"><i class="fa-solid fa-box"></i> Quản lý sản phẩm</a>
        <a href="index.php?url=admin/orders"><i class="fa-solid fa-cart-flatbed"></i> Quản lý đơn hàng</a>
        <a href="index.php"><i class="fa-solid fa-store"></i> Xem Website</a>
        <a href="index.php?url=auth/logout"><i class="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
    </nav>
</aside>

<main class="admin-content">
    <h1 style="margin-bottom: 2rem;">Bảng điều khiển</h1>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
        <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border); border-left: 5px solid var(--primary);">
            <div style="color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Tổng sản phẩm</div>
            <div style="font-size: 2.5rem; font-weight: 800; margin-top: 0.5rem; color: white;">...</div>
            <a href="index.php?url=admin/products" style="display: inline-block; margin-top: 1rem; font-size: 0.85rem; font-weight: 600;">Xem tất cả <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border); border-left: 5px solid var(--secondary);">
            <div style="color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Đơn hàng mới</div>
            <div style="font-size: 2.5rem; font-weight: 800; margin-top: 0.5rem; color: var(--secondary);">...</div>
            <a href="index.php?url=admin/orders" style="display: inline-block; margin-top: 1rem; font-size: 0.85rem; font-weight: 600;">Xử lý ngay <i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border); border-left: 5px solid var(--accent);">
            <div style="color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Danh mục</div>
            <div style="font-size: 2.5rem; font-weight: 800; margin-top: 0.5rem; color: var(--accent);">...</div>
            <a href="index.php?url=admin/categories" style="display: inline-block; margin-top: 1rem; font-size: 0.85rem; font-weight: 600;">Quản lý <i class="fa-solid fa-arrow-right"></i></a>
        </div>
    </div>
    
    <div style="background: var(--surface); padding: 2.5rem; border-radius: var(--radius-lg); border: 1px solid var(--border); text-align: center;">
        <i class="fa-solid fa-rocket" style="font-size: 3rem; color: var(--primary-light); margin-bottom: 1.5rem;"></i>
        <h2>Hệ thống đã sẵn sàng</h2>
        <p style="color: var(--text-muted); margin: 1rem auto 2rem; max-width: 600px;">Chào mừng bạn quay lại trang quản trị. Tại đây bạn có thể kiểm soát toàn bộ cửa hàng, từ sản phẩm, danh mục đến các đơn hàng của khách hàng.</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <a href="index.php?url=admin/products" class="btn btn-primary">Bắt đầu quản lý</a>
            <a href="index.php" class="btn btn-outline">Xem Website</a>
        </div>
    </div>
</main>

</body>
</html>
