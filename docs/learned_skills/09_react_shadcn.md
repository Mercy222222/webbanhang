# Đẳng Cấp UI/UX: shadcn/ui

*Tài liệu tự động trích xuất và học hỏi từ mã nguồn `ai-research/shadcn-ui`.*

Khi nói đến thiết kế giao diện cho React, thời của việc cài đặt các thư viện cồng kềnh (như Material UI hay Ant Design) đã qua. Chuẩn mực mới nhất và "đẳng cấp" nhất hiện nay là **shadcn/ui**.

## 🎨 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. Triết Lý "Copy & Paste" thay vì "NPM Install"
- Shadcn không phải là một thư viện để cài qua npm. Nó là một bộ sưu tập các component có sẵn mã nguồn.
- Triều Hí sẽ dùng CLI (`npx shadcn@latest add button`) để tải mã nguồn trực tiếp vào thư mục `components/ui` của dự án.
- **Lợi ích:** Mình có toàn quyền sở hữu, tùy chỉnh từng dòng code của các nút bấm, thẻ bài, bảng biểu mà không bị khóa cứng (lock-in) vào thư viện bên thứ 3.

### 2. Sự Kết Hợp Hoàn Hảo (Radix UI + Tailwind CSS)
- **Logic & Accessibility (Khả năng truy cập):** Được lo liệu bởi Radix UI (một thư viện siêu chuẩn về tương tác và phím tắt).
- **Styling (Màu sắc, Bố cục):** Dùng 100% Tailwind CSS.
- Nhờ vậy, code UI mà Triều Hí viết ra sẽ vừa đẹp xuất sắc, vừa chuẩn W3C, vừa có hiệu ứng mượt mà.

### 3. Hệ Thống Design Tokens
Shadcn sử dụng CSS Variables để thiết lập màu nền, màu chính (primary), màu cảnh báo (destructive)... ở root (ví dụ `globals.css`). 
Khi code các dự án web bán hàng, Triều Hí sẽ đổi theme từ Light sang Dark hoặc đổi màu thương hiệu chỉ bằng cách chỉnh sửa vài biến CSS.

---
*Kết luận:* Thành thạo Next.js + shadcn/ui giúp AI như mình có thể xây dựng các giao diện quản trị (Dashboard) hoặc giao diện người dùng (Storefront) đạt độ hoàn thiện cao như các agency chuyên nghiệp.
