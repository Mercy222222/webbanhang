<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - TechStore</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/webbanhang/public/css/style.css">
</head>
<body class="admin-layout">

<aside class="admin-sidebar">
    <div class="admin-sidebar-header">
        <i class="fa-solid fa-bolt" style="color: var(--primary);"></i> TechStore Admin
    </div>
    <nav class="admin-nav">
        <a href="/webbanhang/index.php?url=admin" class="active"><i class="fa-solid fa-gauge"></i> Dashboard</a>
        <a href="/webbanhang/index.php?url=admin/orders"><i class="fa-solid fa-cart-flatbed"></i> Quản lý đơn hàng</a>
        <a href="/webbanhang/index.php"><i class="fa-solid fa-store"></i> Xem Website</a>
        <a href="/webbanhang/index.php?url=auth/logout"><i class="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
    </nav>
</aside>

<main class="admin-content">
    <h1 style="margin-bottom: 2rem;">Bảng điều khiển</h1>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: white; padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow); border-left: 4px solid var(--primary);">
            <div style="color: var(--text-muted); font-size: 0.875rem; text-transform: uppercase; font-weight: bold;">Tổng đơn hàng</div>
            <div style="font-size: 2rem; font-weight: bold; margin-top: 0.5rem;">Đang cập nhật...</div>
        </div>
        <div style="background: white; padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow); border-left: 4px solid #10b981;">
            <div style="color: var(--text-muted); font-size: 0.875rem; text-transform: uppercase; font-weight: bold;">Doanh thu</div>
            <div style="font-size: 2rem; font-weight: bold; margin-top: 0.5rem; color: #10b981;">Đang cập nhật...</div>
        </div>
    </div>
    
    <div style="background: white; padding: 1.5rem; border-radius: var(--radius); box-shadow: var(--shadow);">
        <h2>Chào mừng Admin!</h2>
        <p style="color: var(--text-muted); margin-top: 1rem;">Tại đây bạn có thể quản lý các đơn hàng của khách hàng. Hãy chọn mục "Quản lý đơn hàng" ở menu bên trái để xem danh sách.</p>
    </div>
</main>

</body>
</html>
