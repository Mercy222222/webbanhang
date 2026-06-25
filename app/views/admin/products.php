<?php
require_once 'app/config/database.php';
require_once 'app/models/CategoryModel.php';
$db = (new Database())->getConnection();
$categories = (new CategoryModel($db))->getCategories();
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý sản phẩm - GEARVN</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/css/style.css">
    <!-- SweetAlert2 for premium notifications -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="admin-layout">

<aside class="admin-sidebar">
    <div class="admin-sidebar-header">
        <i class="fa-solid fa-gamepad" style="color: var(--primary-light);"></i> GEARVN Admin
    </div>
    <nav class="admin-nav">
        <a href="index.php?url=admin"><i class="fa-solid fa-gauge"></i> Dashboard</a>
        <a href="index.php?url=admin/categories"><i class="fa-solid fa-list"></i> Quản lý danh mục</a>
        <a href="index.php?url=admin/products" class="active"><i class="fa-solid fa-box"></i> Quản lý sản phẩm</a>
        <a href="index.php?url=admin/orders"><i class="fa-solid fa-cart-flatbed"></i> Quản lý đơn hàng</a>
        <a href="index.php"><i class="fa-solid fa-store"></i> Xem Website</a>
        <a href="index.php?url=auth/logout"><i class="fa-solid fa-sign-out-alt"></i> Đăng xuất</a>
    </nav>
</aside>

<main class="admin-content">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h1>Quản lý sản phẩm</h1>
        <button onclick="openAddModal()" class="btn btn-primary" style="cursor: pointer;"><i class="fa-solid fa-plus"></i> Thêm sản phẩm</button>
    </div>

    <div class="table-container">
        <table class="table">
            <thead>
                <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th style="text-align: right;">Thao tác</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($products as $product): ?>
                <tr>
                    <td>
                        <img src="<?= !empty($product->image) ? htmlspecialchars($product->image) : 'https://placehold.co/600x400/1e293b/white?text=GEARVN' ?>" 
                             alt="<?= htmlspecialchars($product->name) ?>" 
                             style="width: 50px; height: 50px; object-fit: contain; border-radius: 5px; background: white;">
                    </td>
                    <td style="font-weight: 600;"><?= htmlspecialchars($product->name) ?></td>
                    <td><span class="status-badge" style="background: rgba(99, 102, 241, 0.1); color: var(--primary-light);"><?= htmlspecialchars($product->category_name) ?></span></td>
                    <td style="color: var(--secondary); font-weight: 700;"><?= number_format($product->price, 0, ',', '.') ?> ₫</td>
                    <td style="text-align: right; display: flex; gap: 0.5rem; justify-content: flex-end; align-items: center; height: 60px;">
                        <button onclick="openEditModal(<?= $product->id ?>)" class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; height: 32px;"><i class="fa-solid fa-edit"></i></button>
                        <button onclick="deleteProduct(<?= $product->id ?>)" class="btn btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; height: 32px;"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</main>

<!-- Modal for Product Form (Add / Edit) -->
<div id="productModal" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); z-index: 9999; justify-content: center; align-items: center; padding: 1rem;">
    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 12px; max-width: 550px; width: 100%; padding: 2rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); position: relative;">
        <h3 id="modalTitle" style="margin-top: 0; margin-bottom: 1.5rem; color: #fff; font-size: 1.35rem; font-weight: 700;">Thêm sản phẩm mới</h3>
        <button onclick="closeProductModal()" style="position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.25rem;"><i class="fa-solid fa-xmark"></i></button>
        
        <form id="productForm" onsubmit="handleProductFormSubmit(event)">
            <input type="hidden" id="prodId" name="id">
            
            <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label">Tên sản phẩm</label>
                <input type="text" id="prodName" name="name" class="form-control" placeholder="Nhập tên sản phẩm..." required>
            </div>
            
            <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label">Danh mục</label>
                <select id="prodCategory" name="category_id" class="form-control" required>
                    <option value="">-- Chọn danh mục --</option>
                    <?php foreach ($categories as $cat): ?>
                        <option value="<?= $cat->id ?>"><?= htmlspecialchars($cat->name) ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label">Giá sản phẩm (₫)</label>
                <input type="number" id="prodPrice" name="price" class="form-control" placeholder="Ví dụ: 15000000" required>
            </div>

            <div class="form-group" style="margin-bottom: 1.25rem;">
                <label class="form-label">Mô tả sản phẩm</label>
                <textarea id="prodDescription" name="description" class="form-control" rows="4" placeholder="Nhập mô tả chi tiết..."></textarea>
            </div>

            <div class="form-group" style="margin-bottom: 1.5rem;">
                <label class="form-label">Hình ảnh sản phẩm</label>
                <input type="text" id="prodImageUrl" name="image" class="form-control" placeholder="Dán URL hình ảnh hoặc tải tệp lên bên dưới...">
                <input type="file" id="prodImageFile" name="image_file" class="form-control" style="margin-top: 0.5rem; padding: 0.4rem;">
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button type="submit" class="btn btn-primary" style="flex: 1.5; padding: 0.8rem; cursor: pointer;">Lưu sản phẩm</button>
                <button type="button" onclick="closeProductModal()" class="btn btn-outline" style="flex: 1; padding: 0.8rem; cursor: pointer;">Hủy</button>
            </div>
        </form>
    </div>
</div>

<script>
// Open modal for adding
function openAddModal() {
    document.getElementById('modalTitle').innerText = 'Thêm sản phẩm mới';
    document.getElementById('prodId').value = '';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').style.display = 'flex';
}

// Open modal for editing
async function openEditModal(id) {
    try {
        const response = await fetch(`api/products/${id}`);
        const result = await response.json();
        if (result.success) {
            const product = result.data;
            document.getElementById('modalTitle').innerText = 'Chỉnh sửa sản phẩm';
            document.getElementById('prodId').value = product.id;
            document.getElementById('prodName').value = product.name;
            document.getElementById('prodCategory').value = product.category_id;
            document.getElementById('prodPrice').value = Math.round(product.price);
            document.getElementById('prodDescription').value = product.description || '';
            document.getElementById('prodImageUrl').value = product.image || '';
            document.getElementById('prodImageFile').value = ''; // Reset file input
            document.getElementById('productModal').style.display = 'flex';
        } else {
            Swal.fire('Lỗi', result.message || 'Không thể lấy thông tin sản phẩm', 'error');
        }
    } catch (error) {
        Swal.fire('Lỗi', 'Không thể kết nối tới API: ' + error.message, 'error');
    }
}

function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Handle Form Submit
async function handleProductFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('prodId').value;
    const isEdit = !!id;
    
    // Use FormData to support image uploads
    const formData = new FormData();
    formData.append('name', document.getElementById('prodName').value);
    formData.append('category_id', document.getElementById('prodCategory').value);
    formData.append('price', document.getElementById('prodPrice').value);
    formData.append('description', document.getElementById('prodDescription').value);
    
    const imageFile = document.getElementById('prodImageFile').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    } else {
        formData.append('image', document.getElementById('prodImageUrl').value);
    }
    
    const url = isEdit ? `api/products/${id}` : 'api/products';
    
    // Simulate PUT method for PHP MVC router since PHP handles PUT payload parsing differently
    if (isEdit) {
        formData.append('_method', 'PUT');
    }
    
    try {
        Swal.fire({
            title: 'Đang xử lý...',
            allowOutsideClick: false,
            didOpen: () => { Swal.showLoading(); }
        });

        const response = await fetch(url, {
            method: 'POST', // Send as POST for multipart form uploads
            body: formData
        });
        
        const result = await response.json();
        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Cập nhật thành công!' : 'Thêm thành công!',
                text: result.message,
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                location.reload();
            });
        } else {
            Swal.fire('Lỗi', result.message || 'Có lỗi xảy ra trong quá trình lưu sản phẩm', 'error');
        }
    } catch (error) {
        Swal.fire('Lỗi', 'Lỗi kết nối API: ' + error.message, 'error');
    }
}

// Handle Delete
async function deleteProduct(id) {
    const confirmRes = await Swal.fire({
        title: 'Bạn có chắc chắn?',
        text: "Hành động này sẽ xóa sản phẩm khỏi hệ thống và không thể khôi phục!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Đồng ý xóa',
        cancelButtonText: 'Hủy'
    });
    
    if (confirmRes.isConfirmed) {
        try {
            Swal.fire({
                title: 'Đang xóa...',
                allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });

            const response = await fetch(`api/products/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Đã xóa sản phẩm!',
                    text: result.message,
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    location.reload();
                });
            } else {
                Swal.fire('Lỗi', result.message || 'Không thể xóa sản phẩm', 'error');
            }
        } catch (error) {
            Swal.fire('Lỗi', 'Lỗi kết nối API: ' + error.message, 'error');
        }
    }
}
</script>
</body>
</html>
