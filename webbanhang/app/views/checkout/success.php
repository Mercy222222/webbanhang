<?php include 'app/views/shares/header.php'; ?>

<div style="text-align: center; padding: 5rem 3rem; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); margin-top: 2rem;">
    <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.1); color: var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 2rem;">
        <i class="fa-solid fa-check"></i>
    </div>
    <h1 style="margin-bottom: 1rem;">Đặt hàng thành công!</h1>
    <p style="color: var(--text-muted); font-size: 1.1rem; max-width: 500px; margin: 0 auto 2.5rem;">Cảm ơn bạn đã tin tưởng lựa chọn TechStore. Đơn hàng của bạn đã được ghi nhận và sẽ được xử lý trong thời gian sớm nhất.</p>
    
    <?php if (isset($payment_method) && ($payment_method == 'bank' || $payment_method == 'wallet')): ?>
        <!-- High prominence warning reminder -->
        <div style="margin: 0 auto 2.5rem; max-width: 600px; padding: 1.5rem; background: rgba(245, 158, 11, 0.05); border: 1px dashed var(--accent); border-radius: var(--radius-md); text-align: left; display: flex; gap: 1rem; align-items: flex-start;">
            <i class="fa-solid fa-triangle-exclamation" style="color: var(--accent); font-size: 1.5rem; margin-top: 0.25rem;"></i>
            <div>
                <h4 style="color: white; margin: 0 0 0.5rem 0; font-weight: 700;">⚠️ Nhắc nhở thanh toán chuyển khoản:</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0; line-height: 1.6;">
                    Hệ thống đã tiếp nhận đơn hàng của bạn ở trạng thái <b>Chờ xử lý</b>. Vui lòng đảm bảo bạn **đã quét mã và hoàn tất chuyển khoản** để nhân viên TechStore có thể kiểm duyệt và xác nhận đơn hàng thành công nhanh nhất.
                </p>
            </div>
        </div>
    <?php endif; ?>
    
    <div style="display: flex; gap: 1rem; justify-content: center;">
        <a href="index.php" class="btn btn-primary" style="padding: 1rem 2.5rem;">Tiếp tục mua hàng</a>
        <a href="index.php?url=auth/profile" class="btn btn-outline" style="padding: 1rem 2.5rem;">Xem lịch sử đơn hàng</a>
    </div>
</div>

<section style="margin-top: 5rem; text-align: center;">
    <h3 style="margin-bottom: 1.5rem;">Bạn có thắc mắc?</h3>
    <p style="color: var(--text-muted);">Hãy liên hệ với chúng tôi qua hotline <span style="color: var(--primary-light); font-weight: 700;">0979 324 949</span> để được hỗ trợ nhanh nhất.</p>
</section>

<?php include 'app/views/shares/footer.php'; ?>
