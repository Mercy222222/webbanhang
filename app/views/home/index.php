<?php include 'app/views/shares/header.php'; ?>

<?php if (!isset($current_category) && empty($_GET['keyword'])): ?>
    <section class="hero">
        <h1>Bứt Phá Giới Hạn Công Nghệ</h1>
        <p>Đón đầu xu hướng với những siêu phẩm Smartphone, Laptop và Phụ kiện đẳng cấp nhất hiện nay. Trải nghiệm không gian mua sắm tương lai ngay tại TechStore.</p>
        <div style="display: flex; gap: 1.5rem; justify-content: center;">
            <a href="#products" class="btn btn-primary" style="padding: 1rem 2.5rem;">Săn Deal Ngay</a>
            <a href="#products" class="btn btn-outline" style="padding: 1rem 2.5rem;">Xem Sản Phẩm <i class="fa-solid fa-arrow-down"></i></a>
        </div>
    </section>
<?php endif; ?>

<?php if (!empty($matching_pages)): ?>
    <div style="margin-bottom: 4rem;">
        <h3 style="color: white; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; font-size: 1.3rem;">
            <i class="fa-solid fa-circle-info" style="color: var(--primary-light);"></i> Trang thông tin tìm thấy (<?= count($matching_pages) ?>)
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            <?php foreach ($matching_pages as $page): ?>
                <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;"><a href="<?= $page['url'] ?>" style="color: white; text-decoration: none; font-weight: 700;"><?= htmlspecialchars($page['title']) ?></a></h4>
                        <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin: 0 0 1.5rem 0;"><?= htmlspecialchars($page['desc']) ?></p>
                    </div>
                    <a href="<?= $page['url'] ?>" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem; text-align: center; margin-top: auto; display: block; width: 100%;">Xem chi tiết <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
<?php endif; ?>

<div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem;" id="products">
    <h2 class="section-title" style="margin-bottom: 0; border-bottom: none;">
        <?php 
            if (isset($current_category)) {
                echo htmlspecialchars($current_category->name);
            } elseif (!empty($_GET['keyword'])) {
                echo "Kết quả cho: '" . htmlspecialchars($_GET['keyword']) . "'";
            } else {
                echo "Tất cả sản phẩm";
            }
        ?>
    </h2>
    <div style="color: var(--text-muted); font-weight: 500;">
        <?= count($products) ?> sản phẩm được tìm thấy
    </div>
</div>

<?php if (empty($products)): ?>
    <div style="text-align: center; padding: 5rem 0; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border);">
        <i class="fa-solid fa-search-minus" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 2rem;"></i>
        <h3 style="color: var(--text-muted);">Rất tiếc, không tìm thấy sản phẩm nào phù hợp.</h3>
        <a href="index.php" class="btn btn-primary" style="margin-top: 2rem;">Về trang chủ</a>
    </div>
<?php else: ?>
    <div class="product-grid">
        <?php foreach ($products as $product): ?>
            <div class="product-card">
                <?php
                    // Fallback to placeholder image if empty
                    $imageUrl = !empty($product->image) ? htmlspecialchars($product->image) : 'https://placehold.co/600x400/1e293b/white?text=TechStore';
                ?>
                <div style="position: relative; overflow: hidden;">
                    <img src="<?= $imageUrl ?>" alt="<?= htmlspecialchars($product->name) ?>" class="product-img">
                    <div style="position: absolute; top: 1rem; right: 1rem;">
                        <button class="btn btn-outline" style="width: 40px; height: 40px; padding: 0; border-radius: 50%; background: rgba(0,0,0,0.3); border: none; backdrop-filter: blur(5px);"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category"><?= htmlspecialchars($product->category_name ?? 'Công nghệ') ?></div>
                    <h3 class="product-title">
                        <a href="index.php?url=default/detail/<?= $product->id ?>">
                            <?= htmlspecialchars($product->name) ?>
                        </a>
                    </h3>
                    <div class="product-price">
                        <?= number_format($product->price, 0, ',', '.') ?> ₫
                    </div>
                    <div style="display: flex; gap: 0.75rem; margin-top: auto;">
                        <a href="index.php?url=cart/add/<?= $product->id ?>" class="btn btn-primary" style="flex: 1;">
                            <i class="fa-solid fa-cart-plus"></i> Mua ngay
                        </a>
                        <a href="index.php?url=default/detail/<?= $product->id ?>" class="btn btn-outline" style="width: 50px; padding: 0;">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<section style="margin-top: 8rem; padding: 5rem 3rem; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border); text-align: center;">
    <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Đăng ký nhận ưu đãi</h2>
    <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 3rem;">Nhận thông tin về các dòng sản phẩm mới nhất và các chương trình khuyến mãi sớm nhất từ TechStore.</p>
    <form style="display: flex; max-width: 500px; margin: 0 auto; gap: 1rem;">
        <input type="email" class="form-control" placeholder="Email của bạn..." required>
        <button type="button" class="btn btn-primary" style="padding: 0 2rem;">Gửi ngay</button>
    </form>
</section>

<?php include 'app/views/shares/footer.php'; ?>
