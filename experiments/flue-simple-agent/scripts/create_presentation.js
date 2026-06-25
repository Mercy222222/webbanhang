import PptxGenJS from 'pptxgenjs';
import path from 'path';

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_16x9';

const slides = [
  {
    title: 'GIỚI THIỆU ĐỀ TÀI',
    content: [
      'Bối cảnh: Sự phát triển mạnh mẽ của thương mại điện tử làm thay đổi thói quen mua sắm của người tiêu dùng.',
      'Khó khăn của cửa hàng truyền thống:',
      '- Phụ thuộc vào vị trí địa lý, khó tiếp cận khách hàng ở xa.',
      '- Khó khăn trong việc quản lý số lượng bánh, hạn sử dụng ngắn.',
      '- Trải nghiệm khách hàng bị giới hạn ở không gian cửa hàng.',
      'Giải pháp: Xây dựng "Website kinh doanh bánh ngọt trực tuyến" để số hóa quy trình kinh doanh, tăng hiệu quả bán hàng và quản trị.'
    ]
  },
  {
    title: 'MỤC TIÊU CỦA ĐỒ ÁN',
    content: [
      'Đối với Khách hàng:',
      '- Mua sắm mọi lúc, mọi nơi với giao diện thân thiện, trực quan.',
      '- Tìm kiếm và chọn lọc bánh dễ dàng (theo loại, giá, hương vị).',
      '- Đặt hàng, tùy chọn thêm thông điệp lên bánh và theo dõi trạng thái đơn.',
      'Đối với Quản trị viên (Admin):',
      '- Cập nhật thông tin, giá cả, hình ảnh sản phẩm nhanh chóng.',
      '- Quản lý đơn hàng, kho hàng tự động, tránh thất thoát.',
      '- Hệ thống báo cáo, thống kê doanh thu chính xác theo ngày/tháng/năm.'
    ]
  },
  {
    title: 'PHẠM VI VÀ ĐỐI TƯỢNG NGHIÊN CỨU',
    content: [
      'Phạm vi chức năng:',
      '- Module Khách hàng: Đăng ký/Đăng nhập, Giỏ hàng, Đặt hàng, Thanh toán, Lịch sử mua hàng.',
      '- Module Admin: Quản lý Sản phẩm, Danh mục, Đơn hàng, Người dùng, Thống kê doanh thu.',
      'Phạm vi ứng dụng:',
      '- Triển khai cho các cửa hàng kinh doanh bánh ngọt quy mô vừa và nhỏ.',
      '- Hỗ trợ giao hàng trong phạm vi khu vực nội thành.'
    ]
  },
  {
    title: 'CÔNG NGHỆ VÀ CÔNG CỤ SỬ DỤNG',
    content: [
      'Phát triển Giao diện (Frontend):',
      '- HTML5, CSS3, JavaScript: Nền tảng xây dựng cấu trúc và giao diện.',
      '- Framework/Thư viện: ReactJS/VueJS (Tăng tốc độ phản hồi), Bootstrap/Tailwind (Responsive).',
      'Xử lý Nghiệp vụ (Backend):',
      '- Ngôn ngữ: NodeJS hoặc PHP, cung cấp các API xử lý dữ liệu.',
      'Cơ sở dữ liệu (Database):',
      '- MySQL / MongoDB: Lưu trữ dữ liệu bảo mật, toàn vẹn thông tin người dùng và đơn hàng.',
      'Công cụ phân tích thiết kế: StarUML, Draw.io để vẽ sơ đồ.'
    ]
  },
  {
    title: 'PHÂN TÍCH YÊU CẦU HỆ THỐNG',
    content: [
      'Yêu cầu chức năng:',
      '- Quản lý tài khoản: Đăng ký, Đăng nhập, Phân quyền (Admin/User).',
      '- Mua hàng: Chọn bánh, Thêm vào giỏ, Mã giảm giá, Đặt hàng, Chọn hình thức giao hàng/thanh toán.',
      '- Quản trị: Thêm/Sửa/Xóa sản phẩm, Cập nhật trạng thái đơn hàng.',
      'Yêu cầu phi chức năng:',
      '- Hiệu năng: Tốc độ tải trang dưới 3 giây, chịu tải nhiều user cùng lúc.',
      '- Bảo mật: Mã hóa mật khẩu, chống tấn công SQL Injection, XSS.',
      '- Khả dụng: Giao diện thích ứng (Responsive) trên PC, Tablet, Mobile.'
    ]
  },
  {
    title: 'MÔ HÌNH USE CASE TỔNG QUÁT',
    content: [
      'Tác nhân (Actor):',
      '- Khách hàng (Thành viên/Khách viếng thăm).',
      '- Quản trị viên (Admin).',
      'Ca sử dụng (Use Case) chính của Khách hàng:',
      '- Xem danh mục bánh, Tìm kiếm bánh, Đăng ký/Đăng nhập.',
      '- Quản lý giỏ hàng, Thanh toán đơn hàng, Theo dõi trạng thái đơn.',
      'Ca sử dụng (Use Case) chính của Admin:',
      '- Quản lý danh mục, Quản lý sản phẩm, Quản lý đơn hàng, Thống kê.'
    ]
  },
  {
    title: 'SƠ ĐỒ HOẠT ĐỘNG (ACTIVITY DIAGRAM)',
    content: [
      'Luồng Đặt hàng của khách hàng:',
      '- Xem sản phẩm -> Thêm vào giỏ hàng -> Chuyển đến trang thanh toán.',
      '- Nhập thông tin giao hàng -> Chọn phương thức thanh toán -> Xác nhận.',
      '- Hệ thống kiểm tra tồn kho -> Trừ kho -> Tạo đơn hàng -> Thông báo thành công.',
      'Luồng Xử lý đơn hàng của Admin:',
      '- Tiếp nhận đơn -> Kiểm tra thông tin -> Duyệt đơn.',
      '- Cập nhật trạng thái: Đang giao -> Đã giao / Hủy đơn.'
    ]
  },
  {
    title: 'SƠ ĐỒ TUẦN TỰ (SEQUENCE DIAGRAM)',
    content: [
      'Mô tả tương tác giữa các đối tượng trong hệ thống theo thời gian thực.',
      'Ví dụ: Chức năng Đăng nhập:',
      '1. User nhập Username/Password trên giao diện.',
      '2. Giao diện (Client) gửi request lên Server (Controller).',
      '3. Controller truy vấn Database để xác thực thông tin.',
      '4. Database trả kết quả -> Controller tạo Session/Token.',
      '5. Hệ thống trả về thông báo thành công và chuyển hướng trang.'
    ]
  },
  {
    title: 'CƠ SỞ DỮ LIỆU & BIỂU MẪU THỰC TẾ',
    content: [
      'Cấu trúc Cơ sở dữ liệu (Database Schema):',
      '- Các bảng chính: Users, Categories, Products, Orders, Order_Details.',
      '- Mối quan hệ: Một User có nhiều Orders, Một Order có nhiều Order_Details.',
      'Ứng dụng Biểu mẫu thực tế vào phần mềm:',
      '- Hóa đơn bán lẻ (In từ hệ thống khi giao hàng).',
      '- Phiếu nhập kho / xuất kho (Quản lý số lượng bánh và nguyên liệu).',
      '- Báo cáo doanh thu (Được kết xuất dạng bảng và biểu đồ).'
    ]
  },
  {
    title: 'KẾT LUẬN & HƯỚNG PHÁT TRIỂN',
    content: [
      'Ưu điểm đã đạt được:',
      '- Nắm bắt và mô hình hóa thành công quy trình nghiệp vụ bán bánh ngọt.',
      '- Thiết kế cơ sở dữ liệu và các luồng chức năng hợp lý, tính ứng dụng cao.',
      'Khuyết điểm:',
      '- Chưa tích hợp các cổng thanh toán điện tử (VNPay, Momo) ở mức độ sâu.',
      'Hướng phát triển tương lai:',
      '- Xây dựng ứng dụng trên nền tảng Mobile (iOS/Android).',
      '- Tích hợp Trí tuệ nhân tạo (AI) để gợi ý bánh theo sở thích cá nhân.'
    ]
  }
];

slides.forEach((slideData, index) => {
  if (index === 0) {
    const slide = pptx.addSlide();
    slide.addText('BÁO CÁO ĐỒ ÁN', { x: 0, y: 1.2, w: '100%', h: 1, fontSize: 36, bold: true, color: '003366', align: 'center' });
    slide.addText('WEBSITE BÁN BÁNH NGỌT', { x: 0, y: 2.2, w: '100%', h: 1, fontSize: 48, bold: true, color: 'CC0000', align: 'center' });
    slide.addText('Học phần: Phân tích và Thiết kế hệ thống\n\nGiảng viên hướng dẫn: Th.S Nguyễn Văn Danh\n\nSinh viên thực hiện:\nHoàng Minh Triều\nNguyễn Gia Sinh\nVõ Hữu Trí\nPhan Tấn Phát', { x: 0, y: 3.5, w: '100%', h: 2, fontSize: 20, color: '333333', align: 'center' });
  }

  const slide = pptx.addSlide();
  
  slide.addText(slideData.title, {
    x: 0.5, y: 0.5, w: '90%', h: 1, 
    fontSize: 32, bold: true, color: '003366', align: 'center'
  });
  
  const bulletsContent = slideData.content.map(text => ({ 
    text: text, 
    options: { 
      bullet: text.startsWith('-') ? { indent: 20 } : true, 
      breakLine: true 
    } 
  }));
  
  slide.addText(bulletsContent, {
    x: 0.5, y: 1.5, w: '90%', h: 3.8, 
    fontSize: 20, color: '333333', valign: 'top'
  });
});

const outPath = path.resolve(process.cwd(), 'BaoCao_BanBanhNgot_ChiTiet.pptx');
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log(`PPTX created at: ${outPath}`);
}).catch(err => {
  console.error(err);
});
