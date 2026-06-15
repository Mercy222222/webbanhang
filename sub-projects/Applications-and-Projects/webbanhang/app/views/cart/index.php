<?php include 'app/views/shares/header.php'; ?>

<div class="container" style="margin-top: 2rem;">
    <h2 class="section-title">Giỏ hàng của bạn</h2>

    <?php if (empty($cart)): ?>
        <div class="alert alert-danger" style="text-align: center; padding: 3rem;">
            <h3>Giỏ hàng đang trống</h3>
            <p style="margin: 1rem 0;">Bạn chưa chọn sản phẩm nào để mua.</p>
            <a href="/webbanhang/index.php" class="btn btn-primary">Tiếp tục mua sắm</a>
        </div>
    <?php else: ?>
        <form action="/webbanhang/index.php?url=cart/update" method="POST">
            <table class="table" style="margin-bottom: 2rem;">
                <thead>
                    <tr>
                        <th style="width: 100px;">Hình ảnh</th>
                        <th>Sản phẩm</th>
                        <th style="width: 150px; text-align: right;">Đơn giá</th>
                        <th style="width: 120px; text-align: center;">Số lượng</th>
                        <th style="width: 150px; text-align: right;">Thành tiền</th>
                        <th style="width: 80px; text-align: center;">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($cart as $item): ?>
                        <tr>
                            <td>
                               <?php $img = !empty($item['image']) ? $item['image'] : '/webbanhang/public/image/placeholder.png'; ?>
                                <img src="<?= htmlspecialchars($img) ?>" alt="" style="width: 60px; height: 60px; object-fit: contain;">
                            </td>
                            <td style="font-weight: 500;"><?= htmlspecialchars($item['name']) ?></td>
                            <td style="text-align: right; color: #ef4444; font-weight: 500;"><?= number_format($item['price'], 0, ',', '.') ?> ₫</td>
                            <td style="text-align: center;">
                                <input type="number" name="quantities[<?= $item['id'] ?>]" value="<?= $item['quantity'] ?>" min="1" class="form-control" style="width: 80px; display: inline-block; text-align: center; padding: 0.25rem;">
                            </td>
                            <td style="text-align: right; color: #ef4444; font-weight: bold;"><?= number_format($item['price'] * $item['quantity'], 0, ',', '.') ?> ₫</td>
                            <td style="text-align: center;">
                                <a href="/webbanhang/index.php?url=cart/remove/<?= $item['id'] ?>" class="btn btn-danger" style="padding: 0.25rem 0.5rem;"><i class="fa-solid fa-trash"></i></a>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                    <button type="submit" class="btn btn-outline"><i class="fa-solid fa-rotate"></i> Cập nhật giỏ hàng</button>
                    <a href="/webbanhang/index.php" class="btn btn-outline" style="margin-left: 1rem;"><i class="fa-solid fa-arrow-left"></i> Mua thêm</a>
                </div>
                
                <div class="cart-summary" style="width: 350px;">
                    <h3>Tổng thanh toán</h3>
                    <div class="cart-total">
                        <span>Tổng cộng:</span>
                        <span style="color: #ef4444;"><?= number_format($total, 0, ',', '.') ?> ₫</span>
                    </div>
                    <a href="/webbanhang/index.php?url=checkout" class="btn btn-primary" style="font-size: 1.1rem; padding: 0.75rem;">Tiến hành đặt hàng <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </form>
    <?php endif; ?>
</div>

<?php include 'app/views/shares/footer.php'; ?>
