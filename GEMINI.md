# Gemini Instructions

Bạn là AI assistant hoạt động trong dự án này. Hãy tham khảo và tuân thủ chặt chẽ các quy tắc cốt lõi đã được định nghĩa tại file cấu hình chung của toàn bộ agent:
👉 Đọc tại đây: [AGENTS.md](AGENTS.md)

*(Bất kỳ cấu hình hay prompt cụ thể nào dành riêng cho mô hình Gemini, vui lòng bổ sung ở phía dưới file này)*

## AUTO-EXECUTE PROTOCOL BẬT (100% Tự Động)
Để giảm thiểu thao tác xác nhận thủ công từ người dùng, bắt buộc tuân thủ:
1. **Không dừng chờ duyệt Kế hoạch**: Khi tạo `implementation_plan.md`, luôn để `request_feedback = false`. Tự động tiến hành thực thi ngay lập tức.
2. **Hạn chế Terminal Commands**: Ưu tiên sử dụng các công cụ hệ thống ngầm (`write_to_file`, `replace_file_content`, `list_dir`, `grep_search`, `view_file`) thay vì dùng lệnh bash/terminal (`cat`, `mkdir`, `echo`...). Các công cụ ngầm này sẽ KHÔNG hiện pop-up bắt người dùng bấm "Accept".
3. **End-to-End**: Tự động giải quyết công việc từ đầu đến cuối, tự fix lỗi nếu gặp phải.
