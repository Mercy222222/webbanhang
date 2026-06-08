<?php include 'app/views/shares/header.php'; ?>

<h2 class="section-title">Giỏ hàng của bạn</h2>

<?php if (empty($cart)): ?>
    <div style="text-align: center; padding: 5rem 3rem; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <i class="fa-solid fa-cart-shopping" style="font-size: 4rem; color: var(--text-muted); opacity: 0.3; margin-bottom: 2rem;"></i>
        <h3 style="margin-bottom: 1rem;">Giỏ hàng của bạn đang trống</h3>
        <p style="color: var(--text-muted); margin-bottom: 2.5rem;">Hãy khám phá những sản phẩm công nghệ tuyệt vời của chúng tôi và chọn cho mình sản phẩm ưng ý nhất.</p>
        <a href="index.php" class="btn btn-primary" style="padding: 1rem 3rem;">Bắt đầu mua sắm <i class="fa-solid fa-arrow-right"></i></a>
    </div>
<?php else: ?>
    <div style="display: grid; grid-template-columns: 1fr 350px; gap: 3rem; align-items: flex-start;">
        <form id="cart-form" method="POST" style="display: contents;">
            <div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th style="width: 50px; text-align: center;">
                                    <input type="checkbox" id="select-all" checked onchange="toggleSelectAll(this)" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--primary);">
                                </th>
                                <th style="width: 120px;">Sản phẩm</th>
                                <th></th>
                                <th style="width: 150px; text-align: right;">Đơn giá</th>
                                <th style="width: 120px; text-align: center;">Số lượng</th>
                                <th style="width: 150px; text-align: right;">Thành tiền</th>
                                <th style="width: 80px; text-align: center;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($cart as $item): ?>
                                <tr>
                                    <td style="text-align: center; vertical-align: middle;">
                                        <input type="checkbox" name="selected_items[]" value="<?= $item['id'] ?>" class="cart-item-checkbox" checked onchange="updateCartSummary()" style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--primary);">
                                    </td>
                                    <td>
                                        <?php $img = !empty($item['image']) ? $item['image'] : 'https://placehold.co/600x400/1e293b/white?text=GEARVN'; ?>
                                        <img src="<?= htmlspecialchars($img) ?>" alt="" style="width: 80px; height: 80px; object-fit: contain; background: white; border-radius: 8px; padding: 5px;">
                                    </td>
                                    <td style="vertical-align: middle;">
                                        <div style="font-weight: 700; color: white; font-size: 1.1rem;"><?= htmlspecialchars($item['name']) ?></div>
                                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">Ship nhanh 24h</div>
                                    </td>
                                    <td style="text-align: right; font-weight: 600; vertical-align: middle;"><?= number_format($item['price'], 0, ',', '.') ?> ₫</td>
                                    <td style="text-align: center; vertical-align: middle;">
                                        <input type="number" name="quantities[<?= $item['id'] ?>]" value="<?= $item['quantity'] ?>" min="1" class="form-control" style="width: 70px; text-align: center; display: inline-block;">
                                    </td>
                                    <td class="item-subtotal" data-val="<?= $item['price'] * $item['quantity'] ?>" style="text-align: right; color: var(--secondary); font-weight: 800; vertical-align: middle;"><?= number_format($item['price'] * $item['quantity'], 0, ',', '.') ?> ₫</td>
                                    <td style="text-align: center; vertical-align: middle;">
                                        <a href="index.php?url=cart/remove/<?= $item['id'] ?>" style="color: #ef4444; font-size: 1.1rem;"><i class="fa-solid fa-trash"></i></a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-top: 2rem;">
                    <a href="index.php" class="btn btn-outline" style="width: auto; padding: 0.75rem 1.5rem;"><i class="fa-solid fa-arrow-left"></i> Tiếp tục mua sắm</a>
                    <button type="submit" formaction="index.php?url=cart/update" class="btn btn-outline" style="width: auto; padding: 0.75rem 1.5rem;"><i class="fa-solid fa-rotate"></i> Cập nhật số lượng</button>
                </div>
            </div>

            <div class="cart-summary" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2.5rem; position: sticky; top: 120px;">
                <h3 style="margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">Tóm tắt đơn hàng</h3>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; color: var(--text-muted);">
                    <span>Tạm tính:</span>
                    <span class="cart-summary-total"><?= number_format($total, 0, ',', '.') ?> ₫</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; color: var(--text-muted);">
                    <span>Phí vận chuyển:</span>
                    <span style="color: var(--secondary); font-weight: 600;">Miễn phí</span>
                </div>
                
                <div class="cart-total" style="border-top: 1px solid var(--border); padding-top: 1.5rem; margin-bottom: 2.5rem; display: flex; justify-content: space-between;">
                    <span style="font-size: 1.1rem;">Tổng cộng:</span>
                    <span class="cart-summary-total" style="color: var(--secondary); font-size: 1.75rem; font-weight: 800;"><?= number_format($total, 0, ',', '.') ?> ₫</span>
                </div>
                
                <button type="submit" formaction="index.php?url=checkout" class="btn btn-primary" style="width: 100%; padding: 1.25rem; font-size: 1.1rem; border-radius: var(--radius-md); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">Tiến hành thanh toán <i class="fa-solid fa-credit-card"></i></button>
                
                <div style="margin-top: 2rem; text-align: center;">
                    <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" style="display: inline-block; width: 32px; filter: grayscale(0.5); opacity: 0.5;">
                    <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" style="display: inline-block; width: 32px; filter: grayscale(0.5); opacity: 0.5; margin: 0 0.5rem;">
                    <img src="https://img.icons8.com/color/48/paypal.png" alt="Paypal" style="display: inline-block; width: 32px; filter: grayscale(0.5); opacity: 0.5;">
                </div>
            </div>
        </form>
    </div>
<?php endif; ?>

<script>
function toggleSelectAll(master) {
    const checkboxes = document.querySelectorAll('.cart-item-checkbox');
    checkboxes.forEach(cb => {
        cb.checked = master.checked;
    });
    updateCartSummary();
}

function updateCartSummary() {
    let total = 0;
    const checkboxes = document.querySelectorAll('.cart-item-checkbox');
    let checkedCount = 0;
    
    checkboxes.forEach(cb => {
        if (cb.checked) {
            checkedCount++;
            const row = cb.closest('tr');
            const subtotalCell = row.querySelector('.item-subtotal');
            const val = parseFloat(subtotalCell.getAttribute('data-val'));
            total += val;
        }
    });
    
    // Update master checkbox state
    const selectAllCb = document.getElementById('select-all');
    if (selectAllCb) {
        selectAllCb.checked = (checkedCount === checkboxes.length && checkboxes.length > 0);
        selectAllCb.indeterminate = (checkedCount > 0 && checkedCount < checkboxes.length);
    }

    // Format and display totals in VND
    const formatted = new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
    }).format(total).replace(/\s?₫/, ' ₫');
    
    document.querySelectorAll('.cart-summary-total').forEach(el => {
        el.textContent = formatted;
    });
}

// Run once on load to ensure sync
document.addEventListener('DOMContentLoaded', () => {
    updateCartSummary();
});
</script>

<?php include 'app/views/shares/footer.php'; ?>
