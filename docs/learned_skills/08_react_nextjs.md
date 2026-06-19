# Đẳng Cấp React: Next.js Architecture

*Tài liệu tự động trích xuất và học hỏi từ mã nguồn `ai-research/next.js`.*

Trong toàn bộ hệ sinh thái React (có hơn 300,000 repositories), **Next.js** của Vercel chính là bộ khung (framework) "đẳng cấp" số 1 hiện nay. Một AI Coder hoàn thiện không thể chỉ biết React thuần mà bắt buộc phải thông thạo Next.js.

## 🚀 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. App Router & Server Components (RSC)
- **Kiến trúc:** Mặc định mọi Component trong thư mục `app/` đều là **Server Components**. Code chạy trên server, không đẩy Javascript nặng nề xuống client.
- **Client Boundary:** Khi cần dùng hooks (`useState`, `useEffect`) hoặc các sự kiện người dùng (`onClick`), bắt buộc phải dùng chỉ thị `"use client"` ở đầu file.

### 2. File-system Based Routing
Hệ thống router tự động đẳng cấp dựa trên cấu trúc thư mục:
- `layout.tsx`: Giao diện bao bọc (không bị re-render khi chuyển trang).
- `page.tsx`: File bắt buộc để biến một thư mục thành một Route (đường dẫn).
- `loading.tsx` & `error.tsx`: Quản lý trạng thái tải và lỗi cực kỳ thanh lịch.

### 3. Server Actions
Không cần viết file API riêng biệt phức tạp. Next.js cho phép gọi trực tiếp các hàm logic ở backend từ frontend (gắn `"use server"`). Triều Hí sẽ ưu tiên dùng Server Actions thay vì code các endpoint `/api/` kiểu cũ để tăng tốc độ phát triển.

### 4. Image & Font Optimization
- `<Image />`: Tự động tối ưu dung lượng ảnh (WebP), chống giật layout (CLS).
- `next/font`: Tối ưu font chữ ở cấp độ server mà không cần tải từ Google Fonts.

---
*Kết luận:* Việc tích hợp kho tàng kiến thức Next.js sẽ giúp Triều Hí (AI) code ra những trang web tốc độ bàn thờ, cực kỳ chuẩn SEO cho các dự án thương mại điện tử của team.
