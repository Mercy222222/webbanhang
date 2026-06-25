<?php include 'app/views/shares/header.php'; ?>

<section style="margin-bottom: 5rem;">
    <div style="background: linear-gradient(135deg, var(--primary) 0%, #b50012 100%); padding: 5rem 3rem; border-radius: var(--radius-lg); text-align: center; color: white; margin-bottom: 4rem; box-shadow: 0 10px 25px -5px rgba(227, 0, 25, 0.3);">
        <i class="fa-solid fa-compass" style="font-size: 3.5rem; margin-bottom: 1.5rem; color: var(--primary-light);"></i>
        <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem; color: white;">Khám Phá GEARVN</h1>
        <p style="font-size: 1.15rem; max-width: 700px; margin: 0 auto; color: #ffe3e3; line-height: 1.6;">Chào mừng bạn đến với chuyên trang khám phá công nghệ tại GEARVN. Nơi cập nhật các xu hướng sản phẩm mới, góc máy cực chất và các chương trình đặc quyền dành riêng cho bạn.</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2.5rem; margin-bottom: 5rem;">
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column;">
            <div style="height: 200px; background: url('https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&auto=format&fit=crop') center/cover no-repeat;"></div>
            <div style="padding: 2rem; flex: 1; display: flex; flex-direction: column;">
                <span style="color: var(--primary-light); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Xu hướng</span>
                <h3 style="margin: 0.75rem 0; font-size: 1.35rem; color: white; font-weight: 700;">Hệ sinh thái gaming đỉnh cao</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 2rem;">Khám phá cách kết nối Laptop Gaming ASUS ROG Strix, PC GEARVN G-Shield cùng màn hình OLED PG27AQDM để tối ưu hóa hiệu năng chiến game hàng ngày của bạn.</p>
                <a href="index.php?url=default/explore_trend" class="btn btn-outline" style="margin-top: auto; text-align: center;">Đọc thêm</a>
            </div>
        </div>

        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column;">
            <div style="height: 200px; background: url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop') center/cover no-repeat;"></div>
            <div style="padding: 2rem; flex: 1; display: flex; flex-direction: column;">
                <span style="color: var(--secondary); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Ưu đãi đặc quyền</span>
                <h3 style="margin: 0.75rem 0; font-size: 1.35rem; color: white; font-weight: 700;">Chương trình đặc quyền thành viên</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 2rem;">Đăng ký tài khoản tại GEARVN để nhận ngay các mã giảm giá đặc biệt như <b>GIAM10</b> hoặc <b>TECH50K</b>, đi kèm chính sách miễn phí vận chuyển toàn quốc.</p>
                <a href="index.php?url=auth/register" class="btn btn-primary" style="margin-top: auto; text-align: center;">Đăng ký ngay</a>
            </div>
        </div>

        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column;">
            <div style="height: 200px; background: url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop') center/cover no-repeat;"></div>
            <div style="padding: 2rem; flex: 1; display: flex; flex-direction: column;">
                <span style="color: var(--accent); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Gaming</span>
                <h3 style="margin: 0.75rem 0; font-size: 1.35rem; color: white; font-weight: 700;">Góc Setup cơ học ấn tượng</h3>
                <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 2rem;">Trải nghiệm cảm giác gõ phím đỉnh cao với ASUS ROG Azoth và chuột chơi game huyền thoại Logitech G502 X Plus. Cải thiện tối đa cảm giác và năng suất chiến game.</p>
                <a href="index.php?url=default/explore_setup" class="btn btn-outline" style="margin-top: auto; text-align: center;">Đọc thêm</a>
            </div>
        </div>
    </div>
</section>

<?php include 'app/views/shares/footer.php'; ?>
