# Kiến Trúc Mã Nguồn Penpot (Design Platform)

*Tài liệu tự động trích xuất và học hỏi từ mã nguồn `ai-research/penpot`.*

Penpot là nền tảng thiết kế UI/UX mã nguồn mở, hỗ trợ tự lưu trữ (self-hosted) và đặc biệt tập trung vào việc thu hẹp khoảng cách giữa Designer và Developer thông qua việc sử dụng các tiêu chuẩn web thực tế (SVG, CSS, HTML).

## 🛠 Tech Stack Chính (Phân Tích Source Code)

Dựa vào việc scan các file cấu hình tại frontend và backend, kiến trúc của Penpot rất thú vị vì nó sử dụng hệ sinh thái **Clojure**:

1. **Ngôn ngữ Cốt Lõi:**
   - **Clojure (Backend):** Được quản lý thông qua `deps.edn` và `build.clj`. Clojure là ngôn ngữ Lisp chạy trên máy ảo Java (JVM), có thế mạnh tuyệt đối về xử lý luồng dữ liệu (concurrency) và tính bất biến (immutability) - cực kỳ phù hợp cho một ứng dụng realtime collaboration (cộng tác thời gian thực).
   - **ClojureScript (Frontend):** Sử dụng `shadow-cljs.edn` để biên dịch ClojureScript sang JavaScript chạy trên trình duyệt.

2. **Frontend Build Tools:**
   - Sử dụng **Vite** (`vite.config.js`) để đóng gói các asset tĩnh hoặc các thành phần JavaScript thuần.
   - Quản lý package bằng **pnpm** (`pnpm-workspace.yaml`).

3. **Testing:**
   - Frontend E2E testing được thiết lập bằng **Playwright** (`playwright.config.js`).

## 🧠 Tại sao lại chọn Clojure/ClojureScript?
1. **Single Language (Isomorphic):** Dùng chung một cấu trúc dữ liệu và syntax từ Front đến Back.
2. **Real-time Sync:** Xử lý hàng chục người cùng chỉnh sửa một file thiết kế cần một hệ thống quản lý State (trạng thái) cực tốt. Tính "bất biến" (immutable data structures) của Clojure sinh ra để giải quyết bài toán này.
3. **Data as Code (Dữ liệu là Mã nguồn):** Thiết kế trên Penpot được mô tả bằng dữ liệu chuẩn, giúp cho việc build các hệ thống API, Plugin hay AI Agent (như MCP Server) đọc và dịch ra React/Vue/HTML cực kỳ chuẩn xác.

## 🤖 Ứng dụng cho AI Agent
Vì Penpot hỗ trợ **MCP Server (Model Context Protocol)**, các AI Agent như Triều Hí có thể:
- Lấy trực tiếp thông tin Layer, Design Tokens từ tài khoản Penpot.
- Chuyển đổi bản vẽ thành mã code UI (Tailwind/React) tự động.
- Sửa đổi thiết kế trực tiếp thông qua API.

---
*Lưu trữ tự động thông qua giao thức Auto-Execute.*
