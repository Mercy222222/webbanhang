<?php include 'app/views/shares/header.php'; ?>
<?php /** @var array $products */ ?>
<?php /** @var object $product */ ?>
<h1>Danh sách sản phẩm</h1>
<a href="/webbanhang/Product/add" class="btn btn-success mb-2">Thêm sản phẩm mới</a>

<ul class="list-group">
    <?php foreach ($products as $product): ?>
        <li class="list-group-item">
            <h2>
                <a href="/webbanhang/Product/show/<?php echo $product->id; ?>">
                    <?php echo htmlspecialchars($product->name, ENT_QUOTES, 'UTF-8'); ?>
                </a>
            </h2>

            <?php if ($product->image): ?>
                <img src="/webbanhang/<?php echo $product->image; ?>" 
                     alt="Product Image" 
                     style="max-width: 100px;" 
                     class="img-thumbnail mb-2">
            <?php endif; ?>

            <p>
                <?php echo htmlspecialchars($product->description, ENT_QUOTES, 'UTF-8'); ?>
            </p>

            <p>
                <strong>Giá:</strong> 
                <?php echo htmlspecialchars($product->price, ENT_QUOTES, 'UTF-8'); ?> VND
            </p>

            <p>
                <strong>Danh mục:</strong> 
                <?php echo htmlspecialchars($product->category_name, ENT_QUOTES, 'UTF-8'); ?>
            </p>

            <div class="actions">
                <a href="/webbanhang/Product/edit/<?php echo $product->id; ?>" 
                   class="btn btn-warning btn-sm">Sửa</a>
                
                <a href="/webbanhang/Product/delete/<?php echo $product->id; ?>" 
                   class="btn btn-danger btn-sm" 
                   onclick="return confirm('Bạn có chắc chắn muốn xóa sản phẩm này?');">Xóa</a>
                
                <a href="/webbanhang/Product/addToCart/<?php echo $product->id; ?>" 
                   class="btn btn-primary btn-sm">Thêm vào giỏ hàng</a>
            </div>
        </li>
    <?php endforeach; ?>
</ul>

<?php include 'app/views/shares/footer.php'; ?>