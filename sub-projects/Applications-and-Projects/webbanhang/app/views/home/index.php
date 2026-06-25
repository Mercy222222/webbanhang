<?php include 'app/views/shares/header.php'; ?>

<?php if (!isset($current_category) && empty($_GET['keyword'])): ?>
    <section class="hero">
        <h1>Khám Phá Công Nghệ Đỉnh Cao</h1>
        <p>Các dòng sản phẩm Điện thoại, Laptop, Phụ kiện mới nhất đã cập bến TechStore. Mua ngay với giá cực ưu đãi!</p>
        <a href="#products" class="btn btn-outline" style="color: white; border-color: white;">Xem Sản Phẩm <i class="fa-solid fa-arrow-down"></i></a>
    </section>
<?php endif; ?>

<h2 class="section-title" id="products">
    <?php 
        if (isset($current_category)) {
            echo "Sản phẩm: " . htmlspecialchars($current_category->name);
        } elseif (!empty($_GET['keyword'])) {
            echo "Kết quả tìm kiếm cho: '" . htmlspecialchars($_GET['keyword']) . "'";
        } else {
            echo "Tất cả sản phẩm";
        }
    ?>
</h2>

<?php if (empty($products)): ?>
    <div class="alert alert-danger">Không tìm thấy sản phẩm nào.</div>
<?php else: ?>
    <div class="product-grid">
        <?php foreach ($products as $product): ?>
            <div class="product-card">
                <?php
                    // Fallback to placeholder image if empty
                    $imageUrl = !empty($product->image) ? htmlspecialchars($product->image) : '/webbanhang/public/image/placeholder.png';
                ?>
                <img src="<?= $imageUrl ?>" alt="<?= htmlspecialchars($product->name) ?>" class="product-img">
                <div class="product-info">
                    <div class="product-category"><?= htmlspecialchars($product->category_name ?? 'Danh mục') ?></div>
                    <h3 class="product-title">
                        <a href="/webbanhang/index.php?url=default/detail/<?= $product->id ?>">
                            <?= htmlspecialchars($product->name) ?>
                        </a>
                    </h3>
                    <div class="product-price"><?= number_format($product->price, 0, ',', '.') ?> ₫</div>
                    <a href="/webbanhang/index.php?url=cart/add/<?= $product->id ?>" class="btn btn-primary">
                        <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                    </a>
                </div>
            </div>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<?php include 'app/views/shares/footer.php'; ?>
