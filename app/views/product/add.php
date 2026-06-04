<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thêm sản phẩm - TechStore</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/css/style.css">
</head>
<body class="admin-layout">

<aside class="admin-sidebar">
    <div class="admin-sidebar-header">
        <i class="fa-solid fa-bolt" style="color: var(--primary-light);"></i> TechStore Admin
    </div>
    <nav class="admin-nav">
        <a href="index.php?url=admin"><i class="fa-solid fa-gauge"></i> Dashboard</a>
        <a href="index.php?url=admin/categories"><i class="fa-solid fa-list"></i> Quản lý danh mục</a>
        <a href="index.php?url=admin/products" class="active"><i class="fa-solid fa-box"></i> Quản lý sản phẩm</a>
        <a href="index.php?url=admin/orders"><i class="fa-solid fa-cart-flatbed"></i> Quản lý đơn hàng</a>
        <a href="index.php"><i class="fa-solid fa-store"></i> Xem Website</a>
        <a href="index.php?url=auth/logout"><i class="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
    </nav>
</aside>

<main class="admin-content">
    <div style="max-width: 800px;">
        <h1 style="margin-bottom: 2rem;">Thêm sản phẩm mới</h1>
        
        <?php if (!empty($errors)): ?>
            <div class="alert alert-danger">
                <ul style="margin-left: 1.5rem;">
                    <?php foreach ($errors as $error): ?>
                        <li><?= htmlspecialchars($error) ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <div style="background: var(--surface); padding: 2.5rem; border-radius: var(--radius-md); border: 1px solid var(--border);">
            <form action="index.php?url=product/save" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label class="form-label">Tên sản phẩm</label>
                    <input type="text" name="name" class="form-control" placeholder="Nhập tên sản phẩm..." required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Danh mục</label>
                    <select name="category_id" class="form-control" required>
                        <option value="">-- Chọn danh mục --</option>
                        <?php foreach ($categories as $cat): ?>
                            <option value="<?= $cat->id ?>"><?= htmlspecialchars($cat->name) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Giá sản phẩm (₫)</label>
                    <input type="number" name="price" class="form-control" placeholder="Ví dụ: 15000000" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Mô tả sản phẩm</label>
                    <textarea name="description" class="form-control" rows="6" placeholder="Nhập mô tả chi tiết..."></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">Hình ảnh sản phẩm</label>
                    <input type="file" name="image" class="form-control">
                </div>
                
                <div style="display: flex; gap: 1.5rem; margin-top: 3rem;">
                    <button type="submit" class="btn btn-primary" style="flex: 1.5;">Lưu sản phẩm</button>
                    <a href="index.php?url=admin/products" class="btn btn-outline" style="flex: 1;">Hủy</a>
                </div>
            </form>
        </div>
    </div>
</main>

</body>
</html>