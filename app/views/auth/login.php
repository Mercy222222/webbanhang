<?php include 'app/views/shares/header.php'; ?>

<div class="auth-container">
    <div style="text-align: center; margin-bottom: 2.5rem;">
        <i class="fa-solid fa-lock" style="font-size: 2.5rem; color: var(--primary-light); margin-bottom: 1rem;"></i>
        <h1 style="margin-bottom: 0.5rem;">Đăng nhập</h1>
        <p style="color: var(--text-muted);">Chào mừng bạn quay lại GEARVN</p>
    </div>

    <?php if (isset($error)): ?>
        <div class="alert alert-danger" style="margin-bottom: 1.5rem;">
            <?= htmlspecialchars($error) ?>
        </div>
    <?php endif; ?>

    <form action="index.php?url=auth/login" method="POST">
        <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" name="email" class="form-control" placeholder="example@gmail.com" required>
        </div>
        
        <div class="form-group">
            <label class="form-label">Mật khẩu</label>
            <input type="password" name="password" class="form-control" placeholder="••••••••" required>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); cursor: pointer;">
                <input type="checkbox"> Ghi nhớ đăng nhập
            </label>
            <a href="#" style="font-size: 0.85rem; color: var(--primary-light);">Quên mật khẩu?</a>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem;">Đăng nhập ngay</button>
    </form>

    <div style="text-align: center; margin-top: 2rem; border-top: 1px solid var(--border); padding-top: 1.5rem;">
        <p style="color: var(--text-muted); font-size: 0.9rem;">Bạn chưa có tài khoản? <a href="index.php?url=auth/register" style="color: var(--primary-light); font-weight: 600;">Đăng ký ngay</a></p>
    </div>
</div>

<?php include 'app/views/shares/footer.php'; ?>
