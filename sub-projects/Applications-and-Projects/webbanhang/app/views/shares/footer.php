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
    document.addEventListener('DOMContentLoaded', () => {
        // Sticky header transition
        const header = document.querySelector('.header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.style.background = 'rgba(15, 23, 42, 0.9)';
                    header.style.padding = '0.5rem 0';
                } else {
                    header.style.background = 'rgba(30, 41, 59, 0.7)';
                    header.style.padding = '0';
                }
            });
        }

        // --- 1. Scroll Reveal Animation using IntersectionObserver ---
        const revealTargets = document.querySelectorAll('.hero, .section-title, .product-grid, .product-card, section, .table-container, .auth-container, .footer-grid');
        revealTargets.forEach(el => {
            el.classList.add('reveal-item');
        });

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Stop observing once revealed
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

        // --- 2. 3D Tilt & Mouse Light Glow Effect on Cards ---
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // 3D tilt angle calculations
                const width = rect.width;
                const height = rect.height;
                const centerX = rect.left + width / 2;
                const centerY = rect.top + height / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                // Max tilt 8 degrees
                const rotateX = (-8 * mouseY / (height / 2)).toFixed(2);
                const rotateY = (8 * mouseX / (width / 2)).toFixed(2);

                card.style.setProperty('--rotate-x', `${rotateX}deg`);
                card.style.setProperty('--rotate-y', `${rotateY}deg`);
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--rotate-x', `0deg`);
                card.style.setProperty('--rotate-y', `0deg`);
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });

        // --- 3. Magnetic Button Attraction ---
        const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .search-bar button');
        magneticBtns.forEach(btn => {
            btn.classList.add('magnetic-btn');
            btn.addEventListener('mousemove', e => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                // Move button slightly towards cursor
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });

        // --- 4. Micro-interactions: Wobble cart on hover ---
        const cartAction = document.querySelector('.action-item');
        if (cartAction) {
            cartAction.addEventListener('mouseenter', () => {
                const badge = cartAction.querySelector('.badge');
                if (badge) {
                    badge.style.animation = 'none';
                    // Trigger reflow
                    void badge.offsetWidth;
                    badge.style.animation = 'pulseBadge 0.8s ease-in-out infinite';
                }
            });
            cartAction.addEventListener('mouseleave', () => {
                const badge = cartAction.querySelector('.badge');
                if (badge) {
                    badge.style.animation = 'pulseBadge 2s infinite';
                }
            });
        }

        // --- 5. Interactive Image Zoom & Pan on Details Page ---
        const zoomContainers = document.querySelectorAll('.zoom-img-container');
        zoomContainers.forEach(container => {
            const img = container.querySelector('img');
            if (!img) return;

            container.addEventListener('mousemove', e => {
                const rect = container.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                img.style.transformOrigin = `${x}% ${y}%`;
                img.style.transform = 'scale(1.8)';
            });

            container.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                img.style.transformOrigin = 'center center';
            });
        });
    });
</script>

</body>
</html>