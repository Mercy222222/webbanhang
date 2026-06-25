<?php include 'app/views/shares/header.php'; ?>

<div class="auth-container">
    <div style="text-align: center; margin-bottom: 2.5rem;">
        <i class="fa-solid fa-user-plus" style="font-size: 2.5rem; color: var(--primary-light); margin-bottom: 1rem;"></i>
        <h1 style="margin-bottom: 0.5rem;">Tạo tài khoản</h1>
        <p style="color: var(--text-muted);">Trở thành thành viên của cộng đồng GEARVN</p>
    </div>

    <?php if (isset($error)): ?>
        <div class="alert alert-danger" style="margin-bottom: 1.5rem;">
            <?= htmlspecialchars($error) ?>
        </div>
    <?php endif; ?>

    <form action="index.php?url=auth/register" method="POST">
        <div class="form-group">
            <label class="form-label">Họ và tên</label>
            <input type="text" name="name" class="form-control" placeholder="Nguyễn Văn A" required>
        </div>

        <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" name="email" class="form-control" placeholder="example@gmail.com" required>
        </div>
        
        <div class="form-group">
            <label class="form-label">Mật khẩu</label>
            <input type="password" name="password" class="form-control" placeholder="Trên 6 ký tự" required>
        </div>

        <div class="form-group" style="margin-bottom: 2rem;">
            <label class="form-label">Xác nhận mật khẩu</label>
            <input type="password" name="confirm_password" class="form-control" placeholder="Nhập lại mật khẩu" required>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem;">Đăng ký tài khoản</button>
    </form>

    <div style="text-align: center; margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem;">
        <p style="color: var(--text-muted); font-size: 0.9rem;">Bạn đã có tài khoản? <a href="index.php?url=auth/login" style="color: var(--primary-light); font-weight: 600;">Đăng nhập</a></p>
    </div>
</div>

<?php include 'app/views/shares/footer.php'; ?>
