<?php include 'app/views/shares/header.php'; ?>

<section style="margin-bottom: 5rem;">
    <div style="background: linear-gradient(135deg, #0f172a 0%, var(--surface) 100%); border: 1px solid var(--border); padding: 5rem 3rem; border-radius: var(--radius-lg); text-align: center; margin-bottom: 4rem;">
        <i class="fa-solid fa-headset" style="font-size: 3.5rem; margin-bottom: 1.5rem; color: var(--secondary);"></i>
        <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 1rem; color: white;">Hỗ Trợ Khách Hàng</h1>
        <p style="font-size: 1.15rem; max-width: 700px; margin: 0 auto; color: var(--text-muted); line-height: 1.6;">Chúng tôi luôn sẵn sàng hỗ trợ bạn. Tìm hiểu các hướng dẫn mua sắm, chính sách bảo hành chính hãng và chính sách đổi trả sản phẩm dễ dàng tại TechStore dưới đây.</p>
    </div>

    <div style="display: grid; grid-template-columns: 300px 1fr; gap: 4rem; align-items: flex-start;">
        <!-- Left: Quick Navigation Tabs -->
        <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; position: sticky; top: 120px;">
            <h3 style="margin-top: 0; margin-bottom: 1.5rem; font-size: 1.1rem; color: white; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border);">Nội dung hỗ trợ</h3>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
                <li><a href="#huong-dan" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 6px; color: var(--text); text-decoration: none; background: rgba(255,255,255,0.02); font-weight: 600;"><i class="fa-solid fa-book" style="color: var(--primary-light);"></i> Hướng dẫn mua hàng</a></li>
                <li><a href="#bao-hanh" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 6px; color: var(--text); text-decoration: none; background: rgba(255,255,255,0.02); font-weight: 600;"><i class="fa-solid fa-shield-halved" style="color: var(--secondary);"></i> Chính sách bảo hành</a></li>
                <li><a href="#doi-tra" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 6px; color: var(--text); text-decoration: none; background: rgba(255,255,255,0.02); font-weight: 600;"><i class="fa-solid fa-rotate-left" style="color: var(--accent);"></i> Chính sách đổi trả</a></li>
            </ul>
        </div>

        <!-- Right: Policy Content -->
        <div style="display: flex; flex-direction: column; gap: 4rem;">
            <!-- Hướng dẫn mua hàng -->
            <div id="huong-dan" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 3rem;">
                <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: white; display: flex; align-items: center; gap: 0.75rem; font-size: 1.75rem;">
                    <i class="fa-solid fa-book" style="color: var(--primary-light);"></i> Hướng dẫn mua hàng
                </h2>
                <div style="color: var(--text-muted); line-height: 1.8; font-size: 0.95rem; display: flex; flex-direction: column; gap: 1rem;">
                    <p><b>Bước 1: Chọn sản phẩm</b> - Truy cập danh mục sản phẩm, tìm kiếm món đồ công nghệ ưa thích của bạn và nhấn <b>Mua ngay</b> để đưa sản phẩm vào giỏ hàng.</p>
                    <p><b>Bước 2: Xem giỏ hàng</b> - Nhấp vào biểu tượng <b>Giỏ hàng</b> ở góc trên bên phải để kiểm tra danh sách sản phẩm, tăng/giảm số lượng và áp dụng <b>Mã giảm giá</b> (nếu có).</p>
                    <p><b>Bước 3: Thanh toán</b> - Điền thông tin giao hàng gồm số điện thoại và địa chỉ nhận hàng. Lựa chọn phương thức thanh toán phù hợp: COD (Thanh toán khi nhận hàng), Chuyển khoản ngân hàng hoặc qua Ví điện tử.</p>
                    <p><b>Bước 4: Xác nhận đơn hàng</b> - Nhấp nút <b>Xác nhận đặt hàng</b>. Đơn hàng của bạn sẽ được lưu vào hệ thống ở trạng thái Chờ xử lý (`pending`), nhân viên TechStore sẽ liên hệ xác nhận và giao hàng nhanh nhất.</p>
                </div>
            </div>

            <!-- Chính sách bảo hành -->
            <div id="bao-hanh" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 3rem;">
                <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: white; display: flex; align-items: center; gap: 0.75rem; font-size: 1.75rem;">
                    <i class="fa-solid fa-shield-halved" style="color: var(--secondary);"></i> Chính sách bảo hành
                </h2>
                <div style="color: var(--text-muted); line-height: 1.8; font-size: 0.95rem; display: flex; flex-direction: column; gap: 1rem;">
                    <p>Mọi thiết bị điện thoại (iPhone, Samsung) và laptop (Dell, MacBook) mua tại TechStore đều được hưởng gói **Bảo hành chính hãng 12 tháng** kể từ ngày mua hàng.</p>
                    <p>Đối với các sản phẩm phụ kiện như bàn phím Keychron, chuột Logitech và tai nghe Sony, thời gian bảo hành sẽ là **6 tháng** lỗi 1 đổi 1 trong vòng 30 ngày đầu tiên nếu phát sinh lỗi phần cứng từ nhà sản xuất.</p>
                    <p><b>Điều kiện từ chối bảo hành:</b> Sản phẩm có dấu hiệu va đập, rơi vỡ, ngấm nước, tự ý tháo dỡ linh kiện hoặc tem bảo hành bị rách, không còn nguyên vẹn.</p>
                </div>
            </div>

            <!-- Chính sách đổi trả -->
            <div id="doi-tra" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 3rem;">
                <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: white; display: flex; align-items: center; gap: 0.75rem; font-size: 1.75rem;">
                    <i class="fa-solid fa-rotate-left" style="color: var(--accent);"></i> Chính sách đổi trả
                </h2>
                <div style="color: var(--text-muted); line-height: 1.8; font-size: 0.95rem; display: flex; flex-direction: column; gap: 1rem;">
                    <p>Khách hàng được quyền đổi sản phẩm mới hoặc hoàn trả sản phẩm cũ trong vòng **7 ngày** kể từ ngày nhận hàng với điều kiện:</p>
                    <p>- Sản phẩm vẫn còn nguyên bao bì, chưa bóc seal (đối với điện thoại/laptop mới) và chưa qua sử dụng.</p>
                    <p>- Có đầy đủ hóa đơn mua hàng và các phụ kiện đi kèm (sách hướng dẫn, cáp sạc, hộp sản phẩm).</p>
                    <p>- Trong trường hợp trả hàng vì lý do chủ quan (đổi ý), quý khách vui lòng thanh toán phí dịch vụ xử lý đơn hàng tương ứng 10% giá trị sản phẩm.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'app/views/shares/footer.php'; ?>
