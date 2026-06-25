# Lập trình Backend & Database (PHP/MySQL)

- **`backend-api`**: Thiết kế và lập trình REST/GraphQL API. Đề cao thiết kế Controller, cấu trúc Route rõ ràng. Đòi hỏi xác thực dữ liệu khắt khe (Validation) và cấu hình Session Security (JWT/HTTP-Only Cookies) an toàn.
- **`db-backend`**: Quản trị PHP & MySQL Database. Quy định bắt buộc: **LUÔN dùng PDO** cho kết nối DB, cấm tuyệt đối việc nối chuỗi (interpolate variables) trực tiếp vào SQL để chống SQL Injection. Xử lý hiển thị chống XSS.
