</main>

<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            <div>
                <a href="index.php" class="logo" style="margin-bottom: 1.5rem;">
                    <i class="fa-solid fa-bolt"></i> TECHSTORE
                </a>
                <p style="color: var(--text-muted); font-size: 0.9rem;">
                    TechStore là cửa hàng bán lẻ các sản phẩm công nghệ uy tín hàng đầu. Chúng tôi cung cấp những cái tên mới nhất trong thế giới Smartphone, Laptop và Phụ kiện.
                </p>
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                    <a href="https://www.facebook.com/HUUTRI.USER" target="_blank" class="btn btn-outline" style="width: 40px; height: 40px; padding: 0; border-radius: 50%;"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/prx.m3rcy" target="_blank" class="btn btn-outline" style="width: 40px; height: 40px; padding: 0; border-radius: 50%;"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </div>
            
            <div>
                <h4 class="footer-title">Khám phá</h4>
                <ul class="footer-links">
                    <li><a href="index.php">Trang chủ</a></li>
                    <li><a href="index.php?url=default/search">Tất cả sản phẩm</a></li>
                    <li><a href="index.php?url=default/explore">Khuyến mãi</a></li>
                    <li><a href="index.php?url=default/explore">Tin công nghệ</a></li>
                </ul>
            </div>
            
            <div>
                <h4 class="footer-title">Hỗ trợ khách hàng</h4>
                <ul class="footer-links">
                    <li><a href="index.php?url=default/support#huong-dan">Hướng dẫn mua hàng</a></li>
                    <li><a href="index.php?url=default/support#bao-hanh">Chính sách bảo hành</a></li>
                    <li><a href="index.php?url=default/support#doi-tra">Chính sách đổi trả</a></li>
                    <li><a href="index.php?url=default/support">Liên hệ hỗ trợ</a></li>
                </ul>
            </div>
            
            <div>
                <h4 class="footer-title">Liên hệ</h4>
                <ul class="footer-links">
                    <li style="color: var(--text-muted);"><i class="fa-solid fa-location-dot" style="margin-right: 0.5rem; color: var(--primary-light);"></i> 123 Đường Công Nghệ, TP. HCM</li>
                    <li style="color: var(--text-muted);"><i class="fa-solid fa-phone" style="margin-right: 0.5rem; color: var(--primary-light);"></i> 0979 324 949</li>
                    <li style="color: var(--text-muted);"><i class="fa-solid fa-envelope" style="margin-right: 0.5rem; color: var(--primary-light);"></i> support@techstore.com</li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2024 TechStore. All rights reserved. Designed with ❤️ by Antigravity.</p>
        </div>
    </div>
</footer>

<script>
    // Simple script to handle dynamic UI if needed
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.querySelector('.header');
        window.onscroll = () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(15, 23, 42, 0.9)';
            } else {
                header.style.background = 'rgba(30, 41, 59, 0.7)';
            }
        };
    });
</script>

</body>
</html>