<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sửa danh mục - GEARVN</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/css/style.css">
</head>
<body class="admin-layout">

<aside class="admin-sidebar">
    <div class="admin-sidebar-header">
        <i class="fa-solid fa-gamepad" style="color: var(--primary-light);"></i> GEARVN Admin
    </div>
    <nav class="admin-nav">
        <a href="index.php?url=admin"><i class="fa-solid fa-gauge"></i> Dashboard</a>
        <a href="index.php?url=admin/categories" class="active"><i class="fa-solid fa-list"></i> Quản lý danh mục</a>
        <a href="index.php?url=admin/products"><i class="fa-solid fa-box"></i> Quản lý sản phẩm</a>
        <a href="index.php?url=admin/orders"><i class="fa-solid fa-cart-flatbed"></i> Quản lý đơn hàng</a>
        <a href="index.php"><i class="fa-solid fa-store"></i> Xem Website</a>
        <a href="index.php?url=auth/logout"><i class="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
    </nav>
</aside>

<main class="admin-content">
    <div style="max-width: 600px;">
        <h1 style="margin-bottom: 2rem;">Chỉnh sửa danh mục</h1>
        
        <div style="background: var(--surface); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border);">
            <form action="index.php?url=category/update" method="POST">
                <input type="hidden" name="id" value="<?= $category->id ?>">
                
                <div class="form-group">
                    <label class="form-label">Tên danh mục</label>
                    <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($category->name) ?>" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Mô tả</label>
                    <textarea name="description" class="form-control" rows="4"><?= htmlspecialchars($category->description) ?></textarea>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                    <button type="submit" class="btn btn-primary" style="flex: 1;">Cập nhật</button>
                    <a href="index.php?url=admin/categories" class="btn btn-outline" style="flex: 1;">Hủy</a>
                </div>
            </form>
        </div>
    </div>
</main>

</body>
</html>
