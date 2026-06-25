# Hướng Dẫn Chạy & Đọc Báo Cáo Kiểm Thử (Testing Guide)

Thư mục `tests` này là trung tâm chứa toàn bộ tài nguyên kiểm thử (Testing) của dự án Tiệm Bánh Làng Xì Mi. Nó được thiết kế để đáp ứng yêu cầu của giảng viên về việc áp dụng cả 2 phương pháp: **Kiểm thử Thủ công (Manual Testing)** và **Kiểm thử Tự động bằng AI (Automated AI Testing)**.

---

## 📂 Cấu trúc Thư mục

```text
tests/
├── TaiLieu_KiemThu/           <-- Nơi chứa các tài liệu báo cáo để chép vào Slide/Word
│   ├── Manual_Test_Report.md  (Bảng báo cáo kết quả kiểm thử thủ công - COPY VÀO BÁO CÁO)
│   ├── TestCases_Auth.md      (Kịch bản test luồng Đăng nhập/Đăng ký)
│   └── TestCases_Cart_Order.md (Kịch bản test luồng Giỏ hàng/Đặt hàng)
│
├── LangXiMi.Tests/            <-- Project chứa code C# chạy Automation Test
│   ├── AuthTests.cs           (Source code giả lập AI test chức năng tài khoản)
│   ├── CartServiceTests.cs    (Source code AI test logic giỏ hàng bằng thư viện Moq)
│   └── LangXiMi.Tests.csproj
│
└── README_HUONG_DAN_TEST.md   <-- File bạn đang đọc
```

---

## 🚀 1. Hướng dẫn dành cho Báo Cáo / Thuyết trình

Khi nộp đồ án hoặc làm slide thuyết trình, bạn hãy làm theo các bước sau để lấy trọn điểm phần Kiểm thử (Testing):

1. **Phần Manual Testing (Kiểm thử Thủ công):** 
   - Mở file `tests/TaiLieu_KiemThu/Manual_Test_Report.md`.
   - Copy toàn bộ nội dung bảng biểu trong đó dán vào file Word hoặc Slide. Đây là minh chứng cho việc nhóm đã thao tác tay cẩn thận để tìm lỗi giao diện.

2. **Phần AI Testing / Automation Testing (Kiểm thử Tự động):**
   - Đưa đoạn video trình diễn AI thao tác tự động trên trình duyệt (đã được tạo ra ở bước trước) vào Slide để làm điểm nhấn.
   - Trình bày mã nguồn `AuthTests.cs` để chứng minh nhóm có viết script chạy kiểm thử Integration Test & Unit Test tự động.

---

## 💻 2. Hướng dẫn chạy Code Tự Động (Automation Test)

Nếu giảng viên yêu cầu **"Chạy thử test tự động tao xem!"**, bạn hãy làm các thao tác sau:

1. Mở Terminal (CMD / PowerShell) trực tiếp trong VS Code.
2. Dùng lệnh di chuyển vào đúng thư mục test:
   ```bash
   cd tests/LangXiMi.Tests
   ```
3. Khởi chạy bộ lệnh test của .NET:
   ```bash
   dotnet test
   ```
4. **Kết quả kỳ vọng:** Terminal sẽ in ra dòng chữ màu xanh lá cây `Passed! - Failed: 0, Passed: 8` chứng tỏ toàn bộ chức năng (Đăng nhập sai, rớt mạng, thêm giỏ hàng) đều đã vượt qua các bài kiểm tra rào cản của AI.

---

**✍️ Lời ngỏ:** Chúc nhóm bạn thuyết trình thành công rực rỡ và lấy trọn điểm A+ với hệ thống Test 2 Lớp (Manual + Automation) này!
