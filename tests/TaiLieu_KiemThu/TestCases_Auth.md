# Kịch bản Kiểm thử (Test Cases) - Tính năng Đăng nhập & Đăng ký

Tài liệu này định nghĩa chi tiết các kịch bản kiểm thử (test cases) cho chức năng Xác thực (Đăng nhập, Đăng ký, Ràng buộc) của dự án Tiệm bánh LangXiMi. 

## Báo cáo Phương pháp Kiểm thử: AI Testing vs Manual Testing

Theo định hướng phân tích chuyên sâu của hệ thống, dự án chia làm hai luồng kiểm thử để so sánh hiệu quả:

1. **Kiểm thử Thủ công (Manual Testing):**
   - **Mục tiêu:** Kiểm tra trải nghiệm thực tế (UX/UI), các thông báo lỗi hiển thị cho người dùng và luồng thao tác bằng tay.
   - **Thực hiện:** Con người thao tác trực tiếp trên giao diện trình duyệt, nhập các giá trị biên (đúng/sai) vào form và quan sát kết quả trả về. (Các Test case thủ công được trình bày chi tiết ở phần dưới).

2. **Kiểm thử bằng AI / Automation (AI-Assisted Automated Testing):**
   - **Mục tiêu:** Kiểm tra logic Backend, tốc độ phản hồi và xác thực các ràng buộc (Validation Constraints) ở tầng sâu mà không bị phụ thuộc vào giao diện.
   - **Thực hiện:** AI (Team Triều Hí) đã tự động sinh ra mã kiểm thử tích hợp (Integration Tests bằng `xUnit` và `WebApplicationFactory`). Các kịch bản này chạy tự động 100%, gửi trực tiếp HTTP Requests (mang theo Anti-forgery Token) để xuyên thủng các lớp bảo vệ và đảm bảo logic từ chối mật khẩu yếu hoặc đăng nhập sai hoạt động chính xác. (Source code AI tạo nằm tại `tests/LangXiMi.Tests/AuthTests.cs`).

---

## Danh sách Kịch bản Kiểm thử chi tiết (Áp dụng cho cả 2 nhóm)

## 1. Module Đăng nhập (Login)

### TC_LI_01: Đăng nhập thành công với tài khoản hợp lệ
- **Mô tả:** Kiểm tra đăng nhập với email và password đúng.
- **Dữ liệu đầu vào:** 
  - Email: `admin@langximi.vn`
  - Password: `admin123@`
- **Các bước:**
  1. Truy cập trang Đăng nhập (`/Account/Login`).
  2. Nhập Email và Password.
  3. Bấm nút "Đăng nhập".
- **Kết quả mong đợi:** 
  - Đăng nhập thành công.
  - Chuyển hướng người dùng về trang chủ (hoặc trang Sản phẩm).
  - Hiển thị tên người dùng trên góc phải màn hình thay cho nút "Đăng nhập".

### TC_LI_02: Đăng nhập thất bại do sai mật khẩu
- **Mô tả:** Kiểm tra hệ thống từ chối truy cập khi nhập sai mật khẩu (Test đăng nhập không được thì sao).
- **Dữ liệu đầu vào:** 
  - Email: `admin@langximi.vn`
  - Password: `sai_mat_khau_123`
- **Các bước:**
  1. Nhập đúng Email nhưng sai mật khẩu.
  2. Bấm "Đăng nhập".
- **Kết quả mong đợi:** 
  - Đăng nhập thất bại.
  - Vẫn ở lại trang Đăng nhập.
  - Hiển thị thông báo lỗi: "Email hoặc mật khẩu không chính xác."

### TC_LI_03: Đăng nhập với tài khoản chưa tồn tại
- **Mô tả:** Kiểm tra đăng nhập bằng email chưa được đăng ký trong hệ thống.
- **Dữ liệu đầu vào:** Email `notfound@test.com`, Password `Abc@123`.
- **Kết quả mong đợi:** Hệ thống báo lỗi tương tự "Email hoặc mật khẩu không chính xác." để bảo mật (không tiết lộ việc email có tồn tại hay không).

### TC_LI_04: Kiểm tra ràng buộc bỏ trống (Validation Constraints)
- **Mô tả:** Kiểm tra validation ở phía Frontend và Backend.
- **Các bước:** 
  1. Để trống ô Email và Password.
  2. Bấm Đăng nhập.
- **Kết quả mong đợi:** 
  - Giao diện báo lỗi yêu cầu nhập Email (bắt buộc).
  - Không gửi request (hoặc nếu gửi thì Backend trả về lỗi Required).

---

## 2. Module Đăng ký (Register)

### TC_RG_01: Đăng ký thành công tài khoản mới
- **Mô tả:** Kiểm tra tạo tài khoản với thông tin hợp lệ.
- **Dữ liệu đầu vào:** 
  - Email: `khachhang_moi@gmail.com`
  - Mật khẩu: `Test1234@`
  - Xác nhận MK: `Test1234@`
  - Họ tên: `Nguyễn Văn A`
  - SĐT: `0987654321`
- **Các bước:**
  1. Vào trang Đăng ký.
  2. Điền đủ và đúng các thông tin.
  3. Bấm Đăng ký.
- **Kết quả mong đợi:** 
  - Tài khoản được tạo thành công trong DB với Role "Customer".
  - Tự động đăng nhập và chuyển về trang mua sắm.

### TC_RG_02: Đăng ký thất bại do Email đã tồn tại
- **Mô tả:** Kiểm tra ràng buộc duy nhất (Unique) của Email.
- **Dữ liệu đầu vào:** Sử dụng lại email `admin@langximi.vn` (đã tồn tại).
- **Kết quả mong đợi:** Hệ thống hiển thị lỗi báo "Email này đã được sử dụng."

### TC_RG_03: Ràng buộc Mật khẩu yếu (Weak Password Constraint)
- **Mô tả:** Identity yêu cầu mật khẩu phải có chữ hoa, thường, số, ký tự đặc biệt.
- **Dữ liệu đầu vào:** Mật khẩu `123456` (quá ngắn và không có ký tự đặc biệt).
- **Kết quả mong đợi:** Hệ thống từ chối tạo tài khoản và báo lỗi "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và ký tự đặc biệt."

### TC_RG_04: Ràng buộc xác nhận mật khẩu không khớp
- **Mô tả:** Nhập mật khẩu và xác nhận mật khẩu khác nhau.
- **Dữ liệu đầu vào:** Mật khẩu `Abc@123`, Xác nhận: `Def@456`
- **Kết quả mong đợi:** Form validation (Data Annotations) hiển thị lỗi "Mật khẩu xác nhận không khớp." ngay tại form.
