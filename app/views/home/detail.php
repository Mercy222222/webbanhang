<?php include 'app/views/shares/header.php'; ?>

<div style="margin-bottom: 2rem;">
    <a href="index.php" class="btn btn-outline" style="width: auto; padding: 0.5rem 1rem;"><i class="fa-solid fa-arrow-left"></i> Quay lại</a>
</div>

<div style="display: flex; gap: 4rem; background: var(--surface); padding: 3rem; border-radius: var(--radius-lg); border: 1px solid var(--border); overflow: hidden;">
    <div class="zoom-img-container" style="flex: 1; padding: 3rem; border: 1px solid var(--border);">
        <?php $imageUrl = !empty($product->image) ? htmlspecialchars($product->image) : 'https://placehold.co/600x400/1e293b/white?text=GEARVN'; ?>
        <img src="<?= $imageUrl ?>" alt="<?= htmlspecialchars($product->name) ?>">
    </div>
    <div style="flex: 1; display: flex; flex-direction: column;">
        <div style="font-size: 0.9rem; color: var(--primary-light); font-weight: 700; text-transform: uppercase; margin-bottom: 0.75rem;">Sản phẩm cao cấp</div>
        <h1 style="font-size: 3rem; margin-bottom: 1.5rem; line-height: 1.1;"><?= htmlspecialchars($product->name) ?></h1>
        
        <div style="font-size: 2.5rem; color: var(--secondary); font-weight: 800; margin-bottom: 2.5rem; display: flex; align-items: center; gap: 1rem;">
            <?= number_format($product->price, 0, ',', '.') ?> ₫
            <span style="font-size: 1rem; color: var(--text-muted); text-decoration: line-through; font-weight: 400;"><?= number_format($product->price * 1.2, 0, ',', '.') ?> ₫</span>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.02); padding: 2rem; border-radius: var(--radius-md); border: 1px solid var(--border); margin-bottom: 3rem;">
            <h3 style="margin-bottom: 1rem; font-size: 1.1rem; color: var(--primary-light);">Thông tin sản phẩm</h3>
            <div style="color: var(--text-muted); line-height: 1.8; font-size: 1.05rem;">
                <?= nl2br(htmlspecialchars($product->description)) ?>
            </div>
        </div>

        <div style="margin-top: auto; display: flex; gap: 1rem;">
            <a href="index.php?url=cart/add/<?= $product->id ?>" class="btn btn-primary" style="flex: 2; padding: 1.25rem; font-size: 1.1rem; border-radius: var(--radius-md);">
                <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
            </a>
            <button class="btn btn-outline" style="flex: 0.5; padding: 1.25rem; border-radius: var(--radius-md);">
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
        
        <div style="margin-top: 2rem; display: flex; gap: 2rem; padding-top: 2rem; border-top: 1px solid var(--border);">
            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">
                <i class="fa-solid fa-truck-fast" style="color: var(--primary-light);"></i> Giao hàng miễn phí
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.9rem;">
                <i class="fa-solid fa-shield-halved" style="color: var(--primary-light);"></i> Bảo hành 12 tháng
            </div>
        </div>
    </div>
</div>

<section style="margin-top: 5rem;">
    <h2 class="section-title">Thông số kỹ thuật</h2>
    <div class="table-container">
        <table class="table">
            <tbody>
                <tr>
                    <td style="width: 30%; color: var(--text-muted); font-weight: 600;">Thương hiệu</td>
                    <td>Chính hãng GEARVN</td>
                </tr>
                <tr>
                    <td style="color: var(--text-muted); font-weight: 600;">Tình trạng</td>
                    <td>Mới 100% fullbox</td>
                </tr>
                <tr>
                    <td style="color: var(--text-muted); font-weight: 600;">Xuất xứ</td>
                    <td>Nhập khẩu chính ngạch</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include 'app/views/shares/footer.php'; ?>
