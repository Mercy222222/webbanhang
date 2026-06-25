<?php include 'app/views/shares/header.php'; ?>

<div class="container" style="margin-top: 2rem;">
    <div style="display: flex; gap: 2rem; background: var(--surface); padding: 2rem; border-radius: var(--radius); box-shadow: var(--shadow);">
        <div class="zoom-img-container" style="flex: 1; padding: 2rem; border: 1px solid var(--border);">
            <?php $imageUrl = !empty($product->image) ? htmlspecialchars($product->image) : '/webbanhang/public/image/placeholder.png'; ?>
            <img src="<?= $imageUrl ?>" alt="<?= htmlspecialchars($product->name) ?>">
        </div>
        <div style="flex: 1; display: flex; flex-direction: column;">
            <h1 style="font-size: 2rem; margin-bottom: 1rem;"><?= htmlspecialchars($product->name) ?></h1>
            <div style="font-size: 1.5rem; color: #ef4444; font-weight: bold; margin-bottom: 1.5rem;">
                <?= number_format($product->price, 0, ',', '.') ?> ₫
            </div>
            
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 0.5rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">Mô tả sản phẩm</h3>
                <div style="color: var(--text-muted); line-height: 1.6;">
                    <?= nl2br(htmlspecialchars($product->description)) ?>
                </div>
            </div>

            <div style="margin-top: auto;">
                <a href="/webbanhang/index.php?url=cart/add/<?= $product->id ?>" class="btn btn-primary" style="font-size: 1.125rem; padding: 1rem;">
                    <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
                </a>
            </div>
        </div>
    </div>
</div>

<?php include 'app/views/shares/footer.php'; ?>
