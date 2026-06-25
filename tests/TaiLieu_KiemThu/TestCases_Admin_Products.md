# Kịch bản Kiểm thử - Quản trị viên (Admin) & Quản lý Sản phẩm

## 1. Chức năng Admin (Quản lý & Thống kê)

### TC_AD_01: Quyền truy cập Admin (Authorization)
- **Mục tiêu:** Đảm bảo khách hàng thường không thể vào trang Admin.
- **Thực hiện:** Đăng nhập bằng tài khoản Customer (`khachhang@gmail.com`). Gõ trực tiếp URL `/Admin/Dashboard`.
- **Kết quả mong đợi:** Hệ thống chặn và văng ra trang Access Denied (hoặc yêu cầu đăng nhập lại với quyền Admin).

### TC_AD_02: Thêm mới Sản phẩm (Create Product)
- **Mục tiêu:** Admin có thể upload bánh mới lên hệ thống.
- **Thực hiện:** Đăng nhập Admin -> Vào Quản lý Sản phẩm -> Bấm "Thêm Mới". Nhập tên bánh, giá tiền (150,000đ), chọn danh mục, tải ảnh lên.
- **Kết quả mong đợi:** Sản phẩm được lưu vào DB. Ra trang chủ sẽ thấy ngay bánh vừa thêm nằm ở trang danh sách.

### TC_AD_03: Duyệt / Hủy Đơn Hàng (Order Management)
- **Mục tiêu:** Chuyển trạng thái đơn hàng của khách.
- **Thực hiện:** Vào Quản lý Đơn hàng -> Tìm đơn hàng đang "Chờ xác nhận" -> Bấm chuyển sang "Đang giao".
- **Kết quả mong đợi:** Cập nhật thành công. Cột trạng thái đổi sang "Đang giao". (Nếu khách hàng vào xem lịch sử mua hàng cũng sẽ thấy cập nhật này).

---

## 2. Tìm kiếm & Duyệt Sản Phẩm (Guest/Customer)

### TC_PR_01: Tìm kiếm sản phẩm theo tên
- **Thực hiện:** Nhập chữ "Socola" vào thanh tìm kiếm và nhấn Enter.
- **Kết quả mong đợi:** Danh sách chỉ hiển thị các loại bánh có chứa chữ "Socola". Không hiện bánh mì mặn hay bánh trà xanh.

### TC_PR_02: Lọc sản phẩm theo Danh mục
- **Thực hiện:** Nhấp vào danh mục "Bánh Kem Sinh Nhật" trên menu.
- **Kết quả mong đợi:** Chỉ các bánh thuộc đúng ID Danh mục đó mới hiện ra. URL thay đổi tương ứng (VD: `/Product/Category/1`).

---

## 3. Quản lý Hồ sơ Khách hàng (Profile & Order History)

### TC_PF_01: Xem lịch sử đơn hàng
- **Thực hiện:** Khách hàng vào trang "Đơn hàng của tôi".
- **Kết quả mong đợi:** Hiển thị danh sách các đơn đã đặt. Bấm "Xem chi tiết" sẽ ra hóa đơn đầy đủ.

### TC_PF_02: Hủy đơn hàng đang chờ
- **Thực hiện:** Bấm nút "Hủy đơn" với những đơn hàng mới đặt (Chờ xác nhận).
- **Kết quả mong đợi:** Trạng thái chuyển thành "Đã hủy". Nút "Hủy đơn" biến mất (không cho hủy lại). Tồn kho của các sản phẩm trong đơn được hoàn trả lại vào Database.
