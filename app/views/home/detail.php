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

<section class="reviews-container">
    <!-- Reviews List -->
    <div>
        <h2 class="section-title">Đánh giá từ khách hàng</h2>
        <?php if (empty($reviews)): ?>
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--border); padding: 3rem; border-radius: var(--radius-lg); text-align: center; color: var(--text-muted);">
                <i class="fa-regular fa-comments" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-light);"></i>
                <p style="font-size: 1.1rem; margin: 0;">Chưa có đánh giá nào cho sản phẩm này.</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Hãy là người đầu tiên chia sẻ cảm nghĩ của bạn!</p>
            </div>
        <?php else: ?>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                <?php foreach ($reviews as $rev): ?>
                    <div style="background: rgba(255, 255, 255, 0.01); border: 1px solid var(--border); padding: 2rem; border-radius: var(--radius-lg); display: flex; gap: 1.5rem;">
                        <!-- Avatar Circle -->
                        <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary-light); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.2rem; flex-shrink: 0; text-transform: uppercase;">
                            <?= mb_substr($rev->user_name, 0, 1) ?>
                        </div>
                        <div style="flex: 1;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                                <h4 style="margin: 0; font-size: 1.1rem; color: #fff; font-weight: 600;"><?= htmlspecialchars($rev->user_name) ?></h4>
                                <span style="font-size: 0.85rem; color: var(--text-muted);"><?= date('d/m/Y H:i', strtotime($rev->created_at)) ?></span>
                            </div>
                            <!-- Stars -->
                            <div style="display: flex; gap: 0.25rem; color: #fbbf24; margin-bottom: 1rem; font-size: 0.9rem;">
                                <?php for ($i = 1; $i <= 5; $i++): ?>
                                    <i class="fa-<?= $i <= $rev->rating ? 'solid' : 'regular' ?> fa-star"></i>
                                <?php endfor; ?>
                            </div>
                            <p style="margin: 0; color: var(--text-muted); line-height: 1.6; font-size: 1.02rem; white-space: pre-line;">
                                <?= htmlspecialchars($rev->comment) ?>
                            </p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>

    <!-- Add Review Form -->
    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border); padding: 2.5rem; border-radius: var(--radius-lg); align-self: start;">
        <h3 style="margin-top: 0; margin-bottom: 1.5rem; font-size: 1.4rem; color: #fff; font-weight: 600;">Viết đánh giá của bạn</h3>
        
        <?php if (isset($_SESSION['user_id'])): ?>
            <form action="index.php?url=default/addReview" method="POST" style="display: flex; flex-direction: column; gap: 1.5rem;">
                <input type="hidden" name="product_id" value="<?= $product->id ?>">
                
                <!-- Rating Selector -->
                <div>
                    <label style="display: block; margin-bottom: 0.5rem; color: var(--primary-light); font-weight: 600; font-size: 0.95rem;">Đánh giá của bạn:</label>
                    <div class="star-rating-selector" style="display: flex; flex-direction: row-reverse; justify-content: flex-end; gap: 0.5rem; font-size: 1.75rem;">
                        <input type="radio" id="star5" name="rating" value="5" style="display: none;" required />
                        <label for="star5" class="fa-regular fa-star" style="cursor: pointer; color: #475569; transition: color 0.2s;"></label>
                        
                        <input type="radio" id="star4" name="rating" value="4" style="display: none;" />
                        <label for="star4" class="fa-regular fa-star" style="cursor: pointer; color: #475569; transition: color 0.2s;"></label>
                        
                        <input type="radio" id="star3" name="rating" value="3" style="display: none;" />
                        <label for="star3" class="fa-regular fa-star" style="cursor: pointer; color: #475569; transition: color 0.2s;"></label>
                        
                        <input type="radio" id="star2" name="rating" value="2" style="display: none;" />
                        <label for="star2" class="fa-regular fa-star" style="cursor: pointer; color: #475569; transition: color 0.2s;"></label>
                        
                        <input type="radio" id="star1" name="rating" value="1" style="display: none;" />
                        <label for="star1" class="fa-regular fa-star" style="cursor: pointer; color: #475569; transition: color 0.2s;"></label>
                    </div>
                </div>

                <!-- Comment input -->
                <div>
                    <label for="review-comment" style="display: block; margin-bottom: 0.5rem; color: var(--primary-light); font-weight: 600; font-size: 0.95rem;">Nhận xét:</label>
                    <textarea id="review-comment" name="comment" rows="4" required placeholder="Chia sẻ trải nghiệm thực tế..." style="width: 100%; padding: 1rem; background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border); border-radius: var(--radius-md); color: #fff; font-family: inherit; font-size: 0.95rem; resize: vertical; outline: none; transition: border-color 0.2s;"></textarea>
                </div>

                <button type="submit" class="btn btn-primary" style="padding: 1rem; font-size: 1rem; font-weight: 600; width: 100%; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                    <i class="fa-solid fa-paper-plane"></i> Gửi đánh giá
                </button>
            </form>
        <?php else: ?>
            <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
                <i class="fa-solid fa-lock" style="font-size: 2rem; margin-bottom: 1rem; color: var(--border);"></i>
                <p style="margin: 0; font-size: 1rem; line-height: 1.6;">
                    Vui lòng <a href="index.php?url=auth/login" style="color: var(--primary-light); font-weight: 600; text-decoration: none; border-bottom: 1px dashed var(--primary-light); padding-bottom: 1px;">Đăng nhập</a> để viết đánh giá cho sản phẩm này.
                </p>
            </div>
        <?php endif; ?>
    </div>
</section>

<style>
    .reviews-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: 3rem;
        align-items: start;
        margin-top: 5rem;
        margin-bottom: 5rem;
    }
    @media (min-width: 992px) {
        .reviews-container {
            grid-template-columns: 2fr 1fr;
        }
    }
    .star-rating-selector input:checked ~ label,
    .star-rating-selector label:hover,
    .star-rating-selector label:hover ~ label {
        color: #fbbf24 !important;
        font-family: "Font Awesome 6 Free";
        font-weight: 900;
    }
    #review-comment:focus {
        border-color: var(--primary-light) !important;
    }
</style>

<?php include 'app/views/shares/footer.php'; ?>
