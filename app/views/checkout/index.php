<?php include 'app/views/shares/header.php'; ?>

<h2 class="section-title">Thanh toán & Đặt hàng</h2>

<div style="display: grid; grid-template-columns: 1fr 400px; gap: 4rem; align-items: flex-start; margin-bottom: 5rem;">
    <!-- Left: Form thông tin -->
    <div style="background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <h3 style="margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-truck" style="color: var(--primary-light);"></i> Thông tin giao hàng
        </h3>
        
        <?php if (isset($error)): ?>
            <div class="alert alert-danger" style="margin-bottom: 2rem;"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form action="index.php?url=checkout" method="POST">
            <div class="form-group">
                <label class="form-label">Người nhận hàng</label>
                <input type="text" class="form-control" value="<?= htmlspecialchars($_SESSION['user_name']) ?>" disabled style="opacity: 0.7; cursor: not-allowed;">
                <small style="color: var(--text-muted);">Tài khoản: <?= htmlspecialchars($_SESSION['user_email'] ?? '') ?></small>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr; gap: 1.5rem;">
                <div class="form-group">
                    <label class="form-label">Số điện thoại liên hệ <span style="color: var(--primary-light);">*</span></label>
                    <input type="text" name="phone" id="phone" class="form-control" required placeholder="Ví dụ: 0912345678">
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Địa chỉ giao hàng chi tiết <span style="color: var(--primary-light);">*</span></label>
                <textarea name="address" id="address" class="form-control" rows="4" required placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."></textarea>
            </div>

            <div style="margin-top: 3rem;">
                <h3 style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <i class="fa-solid fa-wallet" style="color: var(--primary-light);"></i> Phương thức thanh toán
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Option COD -->
                    <label style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border: 1px solid var(--border); border-radius: var(--radius-md); background: rgba(255,255,255,0.01); cursor: pointer; transition: all 0.2s;">
                        <input type="radio" name="payment_method" value="cod" checked onchange="togglePaymentInfo('cod')" style="accent-color: var(--primary);">
                        <i class="fa-solid fa-money-bill-wave" style="color: var(--primary-light); font-size: 1.25rem;"></i>
                        <div>
                            <div style="font-weight: 700; color: white;">Thanh toán khi nhận hàng (COD)</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Nhận hàng rồi mới thanh toán bằng tiền mặt.</div>
                        </div>
                    </label>

                    <!-- Option Bank -->
                    <label style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border: 1px solid var(--border); border-radius: var(--radius-md); background: rgba(255,255,255,0.01); cursor: pointer; transition: all 0.2s;">
                        <input type="radio" name="payment_method" value="bank" onchange="togglePaymentInfo('bank')" style="accent-color: var(--primary);">
                        <i class="fa-solid fa-building-columns" style="color: var(--secondary); font-size: 1.25rem;"></i>
                        <div>
                            <div style="font-weight: 700; color: white;">Chuyển khoản ngân hàng</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Thanh toán qua tài khoản ngân hàng của cửa hàng.</div>
                        </div>
                    </label>

                    <!-- Option E-Wallet -->
                    <label style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem; border: 1px solid var(--border); border-radius: var(--radius-md); background: rgba(255,255,255,0.01); cursor: pointer; transition: all 0.2s;">
                        <input type="radio" name="payment_method" value="wallet" onchange="togglePaymentInfo('wallet')" style="accent-color: var(--primary);">
                        <i class="fa-solid fa-qrcode" style="color: var(--accent); font-size: 1.25rem;"></i>
                        <div>
                            <div style="font-weight: 700; color: white;">Ví điện tử (Momo / ZaloPay)</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Chuyển khoản nhanh chóng qua tài khoản ví Momo.</div>
                        </div>
                    </label>
                </div>

                <!-- Info boxes for payment methods -->
                <div id="bank-info" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); border-radius: var(--radius-md); color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                    <h4 style="color: white; margin-top: 0; margin-bottom: 0.75rem;"><i class="fa-solid fa-info-circle" style="color: var(--secondary);"></i> Thông tin chuyển khoản</h4>
                    
                    <div style="margin-bottom: 1.5rem;">
                        <label style="color: white; font-weight: 600; display: block; margin-bottom: 0.5rem; font-size: 0.85rem;">Chọn ngân hàng thụ hưởng:</label>
                        <select id="bank-select" class="form-control" style="background: var(--bg); color: white; border: 1px solid var(--border); padding: 0.75rem; border-radius: var(--radius-md); width: 100%; cursor: pointer;" onchange="updateQrCode()">
                            <option value="bidv" selected>BIDV (Ngân hàng Đầu tư & Phát triển Việt Nam)</option>
                            <option value="mb">MB Bank (Ngân hàng Quân Đội)</option>
                            <option value="vietinbank">VietinBank (Ngân hàng Công Thương)</option>
                        </select>
                    </div>

                    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; margin-top: 1rem;">
                        <div style="flex: 1; min-width: 200px;">
                            <div id="bank-details-bidv">
                                <div>Ngân hàng: <b>BIDV</b></div>
                                <div>Số tài khoản: <b style="color: var(--secondary); font-size: 1.2rem;">0979324949</b></div>
                                <div>Chủ tài khoản: <b>VÕ HỮU TRÍ</b></div>
                            </div>
                            <div id="bank-details-mb" style="display: none;">
                                <div>Ngân hàng: <b>MB Bank</b></div>
                                <div>Số tài khoản: <b style="color: var(--secondary); font-size: 1.2rem;">0979324949</b></div>
                                <div>Chủ tài khoản: <b>VÕ HỮU TRÍ</b></div>
                            </div>
                            <div id="bank-details-vietinbank" style="display: none;">
                                <div>Ngân hàng: <b>VietinBank</b></div>
                                <div>Số tài khoản: <b style="color: var(--secondary); font-size: 1.2rem;">0979324949</b></div>
                                <div>Chủ tài khoản: <b>VÕ HỮU TRÍ</b></div>
                            </div>
                            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.05);">
                                <div>Số tiền thanh toán: <b style="color: var(--secondary); font-size: 1.1rem;"><?= number_format($final_total, 0, ',', '.') ?> ₫</b></div>
                                <div style="margin-top: 0.5rem; color: var(--primary-light);">Nội dung CK: <b id="bank-memo-text">GV [Số điện thoại của bạn]</b></div>
                            </div>
                        </div>
                        <div class="qr-transition-container" style="text-align: center; background: white; padding: 1.25rem; border-radius: var(--radius-md); box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.1); width: 220px; margin: 0 auto;">
                            <img id="vietqr-img" src="https://img.vietqr.io/image/bidv-0979324949-compact2.png?amount=<?= $final_total ?>&accountName=VO%20HUU%20TRI&addInfo=GV" alt="Mã QR Chuyển khoản" style="width: 100%; aspect-ratio: 1; object-fit: contain; display: block; margin: 0 auto;">
                            <div style="color: #1e293b; font-size: 0.75rem; font-weight: 700; margin-top: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.25rem;"><i class="fa-solid fa-qrcode" style="color: var(--primary);"></i> Quét mã thanh toán nhanh</div>
                        </div>
                    </div>
                </div>

                <div id="wallet-info" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); border-radius: var(--radius-md); color: var(--text-muted); font-size: 0.9rem; line-height: 1.6;">
                    <h4 style="color: white; margin-top: 0; margin-bottom: 0.75rem;"><i class="fa-solid fa-info-circle" style="color: var(--accent);"></i> Thanh toán qua Momo</h4>
                    
                    <div style="display: flex; gap: 2rem; align-items: center; flex-wrap: wrap; margin-top: 1rem;">
                        <div style="flex: 1; min-width: 200px;">
                            <div>Số điện thoại ví: <b style="color: var(--secondary); font-size: 1.1rem;">0979324949</b></div>
                            <div>Chủ ví: <b>VÕ HỮU TRÍ</b></div>
                            <div style="margin-top: 0.5rem;">Số tiền: <b style="color: var(--secondary); font-size: 1.1rem;"><?= number_format($final_total, 0, ',', '.') ?> ₫</b></div>
                            <div style="margin-top: 0.5rem; color: var(--primary-light);">Nội dung ghi chú: <b id="wallet-memo-text">GV [Số điện thoại]</b></div>
                            <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--secondary);">* Vui lòng chuyển tiền kèm nội dung ghi chú là số điện thoại đặt hàng của bạn.</div>
                        </div>
                        <div class="qr-transition-container" style="text-align: center; background: white; padding: 1.25rem; border-radius: var(--radius-md); box-shadow: var(--shadow); border: 1px solid rgba(0,0,0,0.1); width: 220px; margin: 0 auto;">
                            <img id="walletqr-img" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fnhantien.momo.vn%2F0979324949%2F<?= $final_total ?>" alt="Mã QR Momo" style="width: 100%; aspect-ratio: 1; object-fit: contain; display: block; margin: 0 auto;">
                            <div style="color: #1e293b; font-size: 0.75rem; font-weight: 700; margin-top: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 0.25rem;"><i class="fa-solid fa-qrcode" style="color: #a21caf;"></i> Quét mã Momo để trả tiền</div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.15rem; padding: 1.25rem; margin-top: 3rem; border-radius: var(--radius-md);">Xác nhận đặt hàng & Thanh toán <i class="fa-solid fa-arrow-right" style="margin-left: 0.5rem;"></i></button>
        </form>

        <!-- Payment Confirmation Modal -->
        <div id="payment-confirm-modal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); z-index: 9999; align-items: center; justify-content: center; padding: 2rem;">
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); max-width: 500px; width: 100%; padding: 2.5rem; box-shadow: var(--shadow-lg); text-align: center; position: relative; animation: modalFadeIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
                <div style="width: 70px; height: 70px; background: rgba(245, 158, 11, 0.1); color: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.25rem; margin: 0 auto 1.5rem;">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <h3 style="color: white; margin-top: 0; margin-bottom: 1rem; font-size: 1.5rem; font-weight: 700;">Nhắc nhở chuyển khoản</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem;">
                    Bạn đã lựa chọn phương thức thanh toán chuyển khoản trước. Vui lòng đảm bảo **đã thực hiện quét mã QR và chuyển khoản thành công** trước khi nhấn Xác nhận để đơn hàng được duyệt nhanh chóng.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button id="modal-cancel-btn" type="button" class="btn btn-outline" style="padding: 0.75rem 1.5rem; font-size: 0.9rem; margin: 0; width: auto;">Kiểm tra lại</button>
                    <button id="modal-confirm-btn" type="button" class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.9rem; margin: 0; width: auto; background: var(--secondary); box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">Tôi đã chuyển khoản</button>
                </div>
            </div>
        </div>
        
        <style>
        @keyframes modalFadeIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        </style>
    </div>

    <!-- Right: Tóm tắt đơn hàng -->
    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2.5rem; position: sticky; top: 120px;">
        <h3 style="margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 1rem;">Đơn hàng (<?= count($checkout_items) ?>)</h3>
        
        <ul style="margin-bottom: 2rem; max-height: 250px; overflow-y: auto;">
            <?php foreach ($checkout_items as $item): ?>
                <li style="display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 1rem;">
                    <img src="<?= !empty($item['image']) ? htmlspecialchars($item['image']) : 'https://placehold.co/600x400/1e293b/white?text=GEARVN' ?>" alt="" style="width: 50px; height: 50px; object-fit: contain; background: white; border-radius: 5px; padding: 2px;">
                    <div style="flex: 1;">
                        <div style="font-weight: 600; font-size: 0.95rem; color: white; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;"><?= htmlspecialchars($item['name']) ?></div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); display: flex; justify-content: space-between; margin-top: 0.25rem;">
                            <span>SL: <?= $item['quantity'] ?></span>
                            <span style="color: var(--secondary); font-weight: 600;"><?= number_format($item['price'] * $item['quantity'], 0, ',', '.') ?> ₫</span>
                        </div>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>

        <!-- Coupon Input Form -->
        <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border);">
            <form action="index.php?url=checkout/applyCoupon" method="POST" style="display: flex; gap: 0.5rem; align-items: center;">
                <input type="text" name="coupon_code" class="form-control" placeholder="Mã giảm giá (ví dụ: GIAM10)" style="padding: 0.65rem; font-size: 0.85rem;" value="<?= htmlspecialchars($_SESSION['coupon']['code'] ?? '') ?>">
                <?php if (isset($_SESSION['coupon'])): ?>
                    <button type="submit" class="btn btn-danger" style="padding: 0.65rem 1rem; font-size: 0.85rem; margin: 0; width: auto;"><i class="fa-solid fa-xmark"></i></button>
                <?php else: ?>
                    <button type="submit" class="btn btn-primary" style="padding: 0.65rem 1.25rem; font-size: 0.85rem; margin: 0; width: auto; white-space: nowrap;">Áp dụng</button>
                <?php endif; ?>
            </form>
            
            <?php if (isset($_SESSION['coupon_success'])): ?>
                <div style="color: var(--success); font-size: 0.8rem; margin-top: 0.5rem; font-weight: 500;"><i class="fa-solid fa-circle-check"></i> <?= $_SESSION['coupon_success'] ?></div>
                <?php unset($_SESSION['coupon_success']); ?>
            <?php endif; ?>
            <?php if (isset($_SESSION['coupon_error'])): ?>
                <div style="color: var(--error); font-size: 0.8rem; margin-top: 0.5rem; font-weight: 500;"><i class="fa-solid fa-circle-exclamation"></i> <?= $_SESSION['coupon_error'] ?></div>
                <?php unset($_SESSION['coupon_error']); ?>
            <?php endif; ?>
        </div>
        
        <div style="border-top: 2px solid var(--border); padding-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--text-muted);">
                <span>Tạm tính</span>
                <span><?= number_format($total, 0, ',', '.') ?> ₫</span>
            </div>
            
            <?php if ($discount > 0): ?>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; color: var(--secondary); font-weight: 600;">
                    <span>Giảm giá (<?= htmlspecialchars($coupon_code) ?>)</span>
                    <span>- <?= number_format($discount, 0, ',', '.') ?> ₫</span>
                </div>
            <?php endif; ?>

            <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; color: var(--text-muted);">
                <span>Giao hàng</span>
                <span style="color: var(--secondary);">Miễn phí</span>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                <span style="font-weight: 600;">Tổng thanh toán</span>
                <div style="text-align: right;">
                    <div style="font-size: 1.75rem; font-weight: 800; color: var(--secondary); line-height: 1;"><?= number_format($final_total, 0, ',', '.') ?> ₫</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">(Đã bao gồm thuế VAT)</div>
                </div>
            </div>
        </div>

        <div style="margin-top: 3rem; background: rgba(16, 185, 129, 0.05); padding: 1.25rem; border-radius: var(--radius-md); border: 1px dashed var(--secondary); display: flex; gap: 0.75rem; align-items: flex-start;">
            <i class="fa-solid fa-shield-heart" style="color: var(--secondary); margin-top: 0.25rem;"></i>
            <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">Cam kết bảo mật thông tin khách hàng và giao hàng chính hãng 100%.</p>
        </div>
    </div>
</div>

<script>
function togglePaymentInfo(method) {
    const bankInfo = document.getElementById('bank-info');
    const walletInfo = document.getElementById('wallet-info');
    
    if (method === 'bank') {
        bankInfo.style.display = 'block';
        walletInfo.style.display = 'none';
        updateQrCode();
    } else if (method === 'wallet') {
        bankInfo.style.display = 'none';
        walletInfo.style.display = 'block';
        updateQrCode();
    } else {
        bankInfo.style.display = 'none';
        walletInfo.style.display = 'none';
    }
}

function updateQrCode() {
    const bankSelect = document.getElementById('bank-select');
    if (!bankSelect) return;
    
    const bank = bankSelect.value;
    const phoneInput = document.getElementById('phone');
    const phone = phoneInput ? phoneInput.value.trim() || '[Số điện thoại]' : '[Số điện thoại]';
    const amount = <?= $final_total ?>;
    const accountName = encodeURIComponent("VO HUU TRI");
    const addInfo = encodeURIComponent("GV " + phone);
    
    // Show correct bank details
    document.getElementById('bank-details-bidv').style.display = bank === 'bidv' ? 'block' : 'none';
    document.getElementById('bank-details-mb').style.display = bank === 'mb' ? 'block' : 'none';
    document.getElementById('bank-details-vietinbank').style.display = bank === 'vietinbank' ? 'block' : 'none';
    
    // Update texts
    document.getElementById('bank-memo-text').innerText = "GV " + phone;
    document.getElementById('wallet-memo-text').innerText = "GV " + phone;
    
    // Update Bank QR image with loading skeleton transition
    const bankQrImg = document.getElementById('vietqr-img');
    if (bankQrImg) {
        const qrContainer = bankQrImg.closest('.qr-transition-container');
        if (qrContainer) qrContainer.classList.add('loading');
        
        bankQrImg.onload = () => {
            if (qrContainer) qrContainer.classList.remove('loading');
        };
        
        bankQrImg.src = `https://img.vietqr.io/image/${bank}-0979324949-compact2.png?amount=${amount}&accountName=${accountName}&addInfo=${addInfo}`;
    }
    
    // Update Wallet QR image with loading skeleton transition
    const walletQrImg = document.getElementById('walletqr-img');
    if (walletQrImg) {
        const qrContainer = walletQrImg.closest('.qr-transition-container');
        if (qrContainer) qrContainer.classList.add('loading');
        
        walletQrImg.onload = () => {
            if (qrContainer) qrContainer.classList.remove('loading');
        };
        
        const momoUrl = encodeURIComponent(`https://nhantien.momo.vn/0979324949/${amount}?note=GV ${phone}`);
        walletQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${momoUrl}`;
    }
}

// Add event listener to phone input and form submit validation
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', updateQrCode);
    }
    
    // Initialize QR code text
    updateQrCode();

    // Intercept form submit for prepaid methods
    const form = document.querySelector('form[action="index.php?url=checkout"]');
    const modal = document.getElementById('payment-confirm-modal');
    const confirmBtn = document.getElementById('modal-confirm-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    
    if (form && modal && confirmBtn && cancelBtn) {
        form.addEventListener('submit', function(e) {
            const paymentMethodInput = document.querySelector('input[name="payment_method"]:checked');
            const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'cod';
            
            if (paymentMethod === 'bank' || paymentMethod === 'wallet') {
                e.preventDefault();
                modal.style.display = 'flex';
            }
        });
        
        confirmBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            form.submit();
        });
        
        cancelBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
});
</script>

<?php include 'app/views/shares/footer.php'; ?>
