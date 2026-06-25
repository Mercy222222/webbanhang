<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sửa sản phẩm - GEARVN</title>
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
        <a href="index.php?url=admin/categories"><i class="fa-solid fa-list"></i> Quản lý danh mục</a>
        <a href="index.php?url=admin/products" class="active"><i class="fa-solid fa-box"></i> Quản lý sản phẩm</a>
        <a href="index.php?url=admin/orders"><i class="fa-solid fa-cart-flatbed"></i> Quản lý đơn hàng</a>
        <a href="index.php"><i class="fa-solid fa-store"></i> Xem Website</a>
        <a href="index.php?url=auth/logout"><i class="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
    </nav>
</aside>

<main class="admin-content">
    <div style="max-width: 800px;">
        <h1 style="margin-bottom: 2rem;">Chỉnh sửa sản phẩm</h1>
        
        <div style="background: var(--surface); padding: 2.5rem; border-radius: var(--radius-md); border: 1px solid var(--border);">
            <form action="index.php?url=product/update" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="id" value="<?= $product->id ?>">
                <input type="hidden" name="existing_image" value="<?= $product->image ?>">

                <div class="form-group">
                    <label class="form-label">Tên sản phẩm</label>
                    <input type="text" name="name" class="form-control" value="<?= htmlspecialchars($product->name) ?>" required>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Danh mục</label>
                    <select name="category_id" class="form-control" required>
                        <?php foreach ($categories as $cat): ?>
                            <option value="<?= $cat->id ?>" <?= $cat->id == $product->category_id ? 'selected' : '' ?>>
                                <?= htmlspecialchars($cat->name) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Giá sản phẩm (₫)</label>
                    <input type="number" name="price" class="form-control" value="<?= $product->price ?>" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Mô tả sản phẩm</label>
                    <textarea name="description" class="form-control" rows="6"><?= htmlspecialchars($product->description) ?></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">Hình ảnh hiện tại</label>
                    <?php if ($product->image): ?>
                        <img src="<?= htmlspecialchars($product->image) ?>" alt="Product" style="width: 100px; margin-bottom: 1rem; border-radius: 5px; background: white; padding: 5px;">
                    <?php endif; ?>
                    <input type="file" name="image" class="form-control">
                    <small style="color: var(--text-muted);">Để trống nếu không muốn thay đổi ảnh.</small>
                </div>
                
                <div style="display: flex; gap: 1.5rem; margin-top: 3rem;">
                    <button type="submit" class="btn btn-primary" style="flex: 1.5;">Cập nhật sản phẩm</button>
                    <a href="index.php?url=admin/products" class="btn btn-outline" style="flex: 1;">Hủy</a>
                </div>
            </form>
        </div>
    </div>
</main>

</body>
</html>