<?php include 'app/views/shares/header.php'; ?>

<div class="auth-container">
    <h2 style="text-align: center; margin-bottom: 1.5rem;">Đăng Nhập</h2>
    
    <?php if (isset($error)): ?>
        <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>

    <form action="/webbanhang/index.php?url=auth/login" method="POST">
        <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input type="email" name="email" id="email" class="form-control" required placeholder="Nhập địa chỉ email">
        </div>
        
        <div class="form-group">
            <label class="form-label" for="password">Mật khẩu</label>
            <input type="password" name="password" id="password" class="form-control" required placeholder="Nhập mật khẩu">
        </div>
        
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Đăng Nhập</button>
    </form>
    
    <div style="text-align: center; margin-top: 1.5rem; color: var(--text-muted);">
        Chưa có tài khoản? <a href="/webbanhang/index.php?url=auth/register">Đăng ký ngay</a>
    </div>
</div>

<?php include 'app/views/shares/footer.php'; ?>
