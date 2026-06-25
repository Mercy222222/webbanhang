<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý đơn hàng - Admin TechStore</title>
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
        <a href="index.php?url=admin/products"><i class="fa-solid fa-box"></i> Quản lý sản phẩm</a>
        <a href="index.php?url=admin/orders" class="active"><i class="fa-solid fa-cart-flatbed"></i> Quản lý đơn hàng</a>
        <a href="index.php"><i class="fa-solid fa-store"></i> Xem Website</a>
        <a href="index.php?url=auth/logout"><i class="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
    </nav>
</aside>

<main class="admin-content">
    <h1 style="margin-bottom: 2rem;">Quản lý đơn hàng</h1>
    
    <div class="table-container">
        <table class="table">
            <thead>
                <tr>
                    <th>Mã ĐH</th>
                    <th>Khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th style="text-align: right;">Cập nhật trạng thái</th>
                </tr>
            </thead>
            <tbody>
                <?php if(empty($orders)): ?>
                    <tr><td colspan="6" style="text-align: center; padding: 3rem; color: var(--text-muted);">Chưa có đơn hàng nào</td></tr>
                <?php else: ?>
                    <?php foreach($orders as $order): ?>
                        <tr>
                            <td><span style="font-weight: 700; color: var(--primary-light);">#<?= $order['id'] ?></span></td>
                            <td>
                                <div style="font-weight: 600;"><?= htmlspecialchars($order['user_name']) ?></div>
                                <div style="font-size: 0.85rem; color: var(--text-muted);"><?= htmlspecialchars($order['phone']) ?></div>
                            </td>
                            <td><?= date('d/m/Y H:i', strtotime($order['created_at'])) ?></td>
                            <td style="color: var(--secondary); font-weight: 800;"><?= number_format($order['total_price'], 0, ',', '.') ?> ₫</td>
                            <td>
                                <?php
                                    $statusInfo = [
                                        'pending' => ['text' => 'Chờ xử lý', 'color' => '#f59e0b', 'bg' => 'rgba(245, 158, 11, 0.1)'],
                                        'confirmed' => ['text' => 'Đã xác nhận', 'color' => '#3b82f6', 'bg' => 'rgba(59, 130, 246, 0.1)'],
                                        'shipping' => ['text' => 'Đang giao hàng', 'color' => '#8b5cf6', 'bg' => 'rgba(139, 92, 246, 0.1)'],
                                        'completed' => ['text' => 'Hoàn thành', 'color' => '#10b981', 'bg' => 'rgba(16, 185, 129, 0.1)'],
                                        'cancelled' => ['text' => 'Đã hủy', 'color' => '#ef4444', 'bg' => 'rgba(239, 68, 68, 0.1)']
                                    ];
                                    $st = strtolower($order['status']);
                                    $info = $statusInfo[$st] ?? $statusInfo['pending'];
                                ?>
                                <span class="status-badge" style="background: <?= $info['bg'] ?>; color: <?= $info['color'] ?>;">
                                    <?= $info['text'] ?>
                                </span>
                            </td>
                            <td style="text-align: right;">
                                <form action="index.php?url=admin/updateOrderStatus/<?= $order['id'] ?>" method="POST" style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                                    <select name="status" class="form-control" style="padding: 0.5rem; font-size: 0.85rem; width: auto; background: var(--surface); color: white; border: 1px solid var(--border);">
                                        <option value="pending" <?= $order['status'] == 'pending' ? 'selected' : '' ?>>Chờ xử lý</option>
                                        <option value="confirmed" <?= $order['status'] == 'confirmed' ? 'selected' : '' ?>>Đã xác nhận</option>
                                        <option value="shipping" <?= $order['status'] == 'shipping' ? 'selected' : '' ?>>Đang giao hàng</option>
                                        <option value="completed" <?= $order['status'] == 'completed' ? 'selected' : '' ?>>Hoàn thành</option>
                                        <option value="cancelled" <?= $order['status'] == 'cancelled' ? 'selected' : '' ?>>Đã hủy</option>
                                    </select>
                                    <button type="submit" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Cập nhật</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</main>

</body>
</html>
