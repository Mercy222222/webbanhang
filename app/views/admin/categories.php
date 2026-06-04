<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý danh mục - TechStore</title>
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
        <a href="index.php?url=admin/categories" class="active"><i class="fa-solid fa-list"></i> Quản lý danh mục</a>
        <a href="index.php?url=admin/products"><i class="fa-solid fa-box"></i> Quản lý sản phẩm</a>
        <a href="index.php?url=admin/orders"><i class="fa-solid fa-cart-flatbed"></i> Quản lý đơn hàng</a>
        <a href="index.php"><i class="fa-solid fa-store"></i> Xem Website</a>
        <a href="index.php?url=auth/logout"><i class="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
    </nav>
</aside>

<main class="admin-content">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Quản lý danh mục</h1>
        <a href="index.php?url=category/add" class="btn btn-primary"><i class="fa-solid fa-plus"></i> Thêm danh mục</a>
    </div>

    <div class="table-container">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>
                    <th style="text-align: right;">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($categories as $cat): ?>
                <tr>
                    <td>#<?= $cat->id ?></td>
                    <td style="font-weight: 600;"><?= htmlspecialchars($cat->name) ?></td>
                    <td style="color: var(--text-muted);"><?= htmlspecialchars($cat->description) ?></td>
                    <td style="text-align: right;">
                        <a href="index.php?url=category/edit/<?= $cat->id ?>" class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;"><i class="fa-solid fa-edit"></i></a>
                        <a href="index.php?url=category/delete/<?= $cat->id ?>" class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="return confirm('Bạn có chắc muốn xóa danh mục này?')"><i class="fa-solid fa-trash"></i></a>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</main>

</body>
</html>
