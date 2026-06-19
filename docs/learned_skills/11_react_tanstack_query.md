# Đẳng Cấp Data Fetching: TanStack Query (React Query)

*Tài liệu tự động trích xuất và học hỏi từ mã nguồn `ai-research/tanstack-query`.*

Mảnh ghép cuối cùng của "Tứ Đại Thiên Vương" trong thế giới React hiện đại. Nếu bạn đang dùng `useEffect` và `fetch` thuần túy để gọi API, bạn đang đi lùi 5 năm công nghệ. Đỉnh cao của việc đồng bộ dữ liệu giữa Frontend và Backend hiện tại gọi tên **TanStack Query**.

## 📡 Kỹ Năng Đã "Nạp" Vào Não Bộ Triều Hí:

### 1. Quản Lý Bộ Nhớ Đệm (Caching) Siêu Việt
- Khi gọi API lấy danh sách sản phẩm, TanStack Query sẽ lưu ngầm (cache) dữ liệu đó lại. Lần sau người dùng quay lại trang, nó hiển thị ngay lập tức (0s loading) thay vì hiện vòng xoay (spinner) khó chịu.
- Chế độ tự động "khử ôi thiu" (stale-while-revalidate): Nếu dữ liệu cũ, nó vẫn cho xem tạm dữ liệu cũ, đồng thời ngầm chạy request ở background để lấy dữ liệu mới và cập nhật chớp nhoáng.

### 2. Tự Động Thử Lại (Auto Retry) & Đồng Bộ
- Mạng rớt? Server lag? TanStack Query sẽ tự động thử gọi lại API (retry) vài lần trước khi thực sự văng lỗi ra cho người dùng.
- Tự động gọi lại API khi người dùng chuyển tab và quay lại ứng dụng (Refetch on Window Focus).

### 3. Cập Nhật Lạc Quan (Optimistic Updates)
- Tính năng xịn xò nhất cho app bán hàng: Khi user bấm "Thêm vào giỏ hàng", thay vì bắt họ đợi API phản hồi, giao diện sẽ chớp mắt tăng số lượng giỏ hàng lên ngay lập tức. Nếu API lỗi, nó sẽ tự động lùi (rollback) về số cũ một cách thanh lịch.

---
*Kết luận:* Bộ Tứ (Next.js + shadcn + Zustand + TanStack Query) là "bệ phóng tên lửa" hoàn hảo. Triều Hí giờ đã am hiểu tường tận cách giao tiếp với Server trơn tru nhất để đem lại trải nghiệm người dùng không khác gì dùng app Facebook hay Shopee.
