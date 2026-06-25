# Kịch bản Kiểm thử (Test Cases) - Giỏ hàng & Đặt hàng (Checkout)

Tài liệu này định nghĩa chi tiết các kịch bản kiểm thử cho module **Giỏ hàng (Cart)** và **Đặt hàng (Checkout)** của dự án LangXiMi.

## 1. Giỏ hàng (Cart)

### TC_CART_01: Thêm sản phẩm mới vào giỏ hàng
- **Mục tiêu:** Kiểm tra khả năng lưu trữ sản phẩm vào Session giỏ hàng.
- **Thực hiện:** Chọn sản phẩm "Bánh sinh nhật socola" -> Nhập số lượng 2 -> Bấm "Thêm vào giỏ".
- **Kết quả mong đợi:** 
  - Biểu tượng giỏ hàng trên thanh header cập nhật số lượng thành "2".
  - Hiển thị Toast thông báo thành công.

### TC_CART_02: Cập nhật số lượng sản phẩm (Tăng/Giảm)
- **Mục tiêu:** Đảm bảo tổng tiền được tính lại chính xác khi thay đổi số lượng.
- **Thực hiện:** Vào trang Giỏ hàng -> Đổi số lượng của 1 sản phẩm từ 1 lên 3.
- **Kết quả mong đợi:** Cột "Thành tiền" của sản phẩm đó và "Tổng thanh toán" tự động nhân 3 lên mà không cần tải lại trang (dùng AJAX).

### TC_CART_03: Giảm số lượng về 0 (Xóa sản phẩm)
- **Mục tiêu:** Kiểm tra logic dọn dẹp khi số lượng bằng 0.
- **Thực hiện:** Đổi số lượng về 0 hoặc bấm nút "Xóa (Thùng rác)".
- **Kết quả mong đợi:** Sản phẩm hoàn toàn biến mất khỏi danh sách giỏ hàng.

---

## 2. Đặt hàng (Checkout)

### TC_CO_01: Kiểm tra đơn hàng dưới mức tối thiểu (Min Order Amount)
- **Mục tiêu:** Ngăn người dùng đặt đơn hàng quá nhỏ lẻ (dưới 100k).
- **Thực hiện:** Thêm vào giỏ 1 "Bánh mì nhân pate thịt" (Giá 30.000đ) -> Bấm "Thanh toán".
- **Kết quả mong đợi:** Hệ thống chặn lại và báo lỗi: "Tổng giá trị đơn hàng phải từ 100.000 VNĐ trở lên."

### TC_CO_02: Kiểm tra ràng buộc Bánh Sinh Nhật phải đặt trước 24h
- **Mục tiêu:** Test logic đặc thù kinh doanh (Bánh sinh nhật cần thời gian làm).
- **Thực hiện:** Thêm "Bánh sinh nhật socola" vào giỏ. Tại form Checkout, chọn "Ngày nhận hàng" là ngay ngày hôm nay (hiện tại). Bấm Thanh toán.
- **Kết quả mong đợi:** Báo lỗi: "Bánh Sinh Nhật cần được đặt trước ít nhất 24 giờ."

### TC_CO_03: Kiểm tra trừ Tồn kho (Stock Deduction - FIFO)
- **Mục tiêu:** Backend (EF Core Transaction) phải trừ số lượng lô hàng cũ nhất trước.
- **Thực hiện:** Đặt thành công 5 sản phẩm X.
- **Kết quả mong đợi:** Trong Database, bảng `TonKho` của sản phẩm X sẽ bị trừ 5 cái ở lô hàng có `HanSuDung` (Hạn sử dụng) ngắn nhất. Số lượng `StockQuantity` trong bảng `Products` cũng giảm đi 5.

### TC_CO_04: Đặt hàng thành công
- **Mục tiêu:** Hoàn tất luồng UC06 (Use Case 06).
- **Thực hiện:** Thỏa mãn toàn bộ điều kiện (tổng tiền > 100k, nhập đủ họ tên, SĐT, địa chỉ giao hàng). Bấm Thanh toán.
- **Kết quả mong đợi:** 
  - Đơn hàng mới (status `Chờ xác nhận`) được tạo.
  - Xóa sạch giỏ hàng.
  - Chuyển hướng tới trang "Đặt hàng thành công" kèm mã đơn hàng.
