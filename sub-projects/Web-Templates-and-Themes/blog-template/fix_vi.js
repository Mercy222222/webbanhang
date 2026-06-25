const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// Replace all the broken strings in terminal
html = html.replace(/Vo H\?u Tr/g, 'Võ Hữu Trí');
html = html.replace(/Vo H\?u Tr/g, 'Võ Hữu Trí');

// Let's replace the broken W2.vi object sections
let badWorkExp = `workExperience: [
          {
            id: 1,
            company: "D An Freelance",
            position: "L-p trAnh viAn Web Fullstack",
            duration: "2024 - Hin ti",
            location: "ThAnh ph\` H" ChA- Minh, Vit Nam",
            description: "Nh-n thit k vA l-p trAnh website, trang gi>i thiu sn phcm vA cAc ph n m?m bAn hAng nh? cho ch  shop vA khAch hAng t do.",
            responsibilities: [
              "XAc \`<nh nhu c u nghip v c a khAch hAng \` xAy dng b\` cc UI/UX",
              "PhAt trin APIs lu tr_, kt xut c sY d_ liu nhanh chA3ng",
              "T\`i u giao din hin th< di \`Tng hoAn ho chucn responsive"
            ],
            achievements: [
              "BAn giao thAnh cA'ng hn 5 website thc t hot \`Tng mt mA",
              "A?p dng cu trAc th vin CSS vA JS t\`i gin, gim dung lng ti trang"
            ]
          },
          {
            id: 2,
            company: "V-n hAnh SMM Panel",
            position: "Qun tr< viAn H th\`ng",
            duration: "2023 - Hin ti",
            location: "ThAnh ph\` H" ChA- Minh, Vit Nam",
            description: "Qun tr< n?n tng cung cp d<ch v mng xA hTi, tA-ch hp lu"ng x- lA t \`Tng, theo dAi doanh thu vA cu hAnh API nhA phAn ph\`i.",
            responsibilities: [
              "?"ng bT hA3a kt n\`i API trung gian phAn ph\`i d<ch v t \`Tng",
              "X- lA vA g r\`i l-i nghn giao d<ch d_ liu trAn c sY d_ liu",
              "Chm sA3c vA gii quyt yAu c u k1 thu-t trc tip cho ng?i dA1ng"
            ],
            achievements: [
              "T \`Tng hA3a hoAn toAn trAn 95% \`n hAng vA dAng ti?n np vAo h th\`ng",
              "Duy trA tA-nh  n \`<nh c a mAy ch  vA \`m bo th?i gian x- lA siAu t\`c"
            ]
          }
        ],`;

let goodWorkExp = `workExperience: [
          {
            id: 1,
            company: "Dự án Freelance",
            position: "Lập trình viên Web Fullstack",
            duration: "2024 - Hiện tại",
            location: "Thành phố Hồ Chí Minh, Việt Nam",
            description: "Nhận thiết kế và lập trình website, trang giới thiệu sản phẩm và các phần mềm bán hàng nhỏ cho chủ shop và khách hàng tự do.",
            responsibilities: [
              "Xác định nhu cầu nghiệp vụ của khách hàng để xây dựng bố cục UI/UX",
              "Phát triển APIs lưu trữ, kết xuất cơ sở dữ liệu nhanh chóng",
              "Tối ưu giao diện hiển thị di động hoàn hảo chuẩn responsive"
            ],
            achievements: [
              "Bàn giao thành công hơn 5 website thực tế hoạt động mượt mà",
              "Áp dụng cấu trúc thư viện CSS và JS tối giản, giảm dung lượng tải trang"
            ]
          },
          {
            id: 2,
            company: "Vận hành SMM Panel",
            position: "Quản trị viên Hệ thống",
            duration: "2023 - Hiện tại",
            location: "Thành phố Hồ Chí Minh, Việt Nam",
            description: "Quản trị nền tảng cung cấp dịch vụ mạng xã hội, tích hợp luồng xử lý tự động, theo dõi doanh thu và cấu hình API nhà phân phối.",
            responsibilities: [
              "Đồng bộ hóa kết nối API trung gian phân phối dịch vụ tự động",
              "Xử lý và gỡ rối lỗi nghẽn giao dịch dữ liệu trên cơ sở dữ liệu",
              "Chăm sóc và giải quyết yêu cầu kỹ thuật trực tiếp cho người dùng"
            ],
            achievements: [
              "Tự động hóa hoàn toàn trên 95% đơn hàng và dòng tiền nạp vào hệ thống",
              "Duy trì tính ổn định của máy chủ và đảm bảo thời gian xử lý siêu tốc"
            ]
          }
        ],`;

// We use an index based approach to just replace everything from "        workExperience: [" to the end of the certificates block
// to avoid exact string matching issues.

let viIndex = html.lastIndexOf('vi: {');
if(viIndex !== -1) {
    let newViText = `vi: {
        "nav.home": "Trang chủ",
        "nav.about": "Giới thiệu",
        "nav.skills": "Kỹ năng",
        "nav.certificates": "Chứng chỉ",
        "nav.projects": "Dự án",
        "nav.contact": "Liên hệ",
        "nav.workExp": "Kinh nghiệm",
        "page.aboutme": "Giới thiệu về tôi",
        "page.workExp": "Kinh nghiệm làm việc",
        "page.certificate": "Chứng chỉ",
        "page.skills": "Kỹ năng của tôi",
        "page.greeting": "Lời chào",
        "page.contact": "Kết nối với tôi",
        "contact.title": "Thông tin liên hệ",
        "contact.name": "Tên của bạn",
        "contact.email": "Email của bạn",
        "contact.phone": "Số điện thoại của bạn",
        "contact.message": "Tin nhắn của bạn",
        "contact.subtitle": "Vui lòng điền thông tin vào mẫu dưới đây để liên hệ với tôi.",
        "contact.namePlaceholder": "Nhập họ và tên của bạn",
        "contact.emailPlaceholder": "Nhập địa chỉ email của bạn",
        "contact.phonePlaceholder": "Nhập số điện thoại của bạn",
        "contact.messagePlaceholder": "Nhập nội dung tin nhắn",
        "contact.send": "Gửi tin nhắn",
        "contact.sending": "Đang gửi...",
        "contact.successMessage": "Gửi tin nhắn thành công! Tôi sẽ phản hồi sớm nhất có thể.",
        "contact.errorMessage": "Gửi tin nhắn thất bại. Vui lòng thử lại sau.",
        "validation.nameMin": "Tên phải có ít nhất 2 ký tự",
        "validation.nameRequired": "Họ và tên là bắt buộc",
        "validation.emailInvalid": "Địa chỉ email không hợp lệ",
        "validation.emailRequired": "Email là bắt buộc",
        "validation.phoneInvalid": "Số điện thoại không hợp lệ (chỉ nhập số)",
        "validation.phoneMin": "Số điện thoại phải có ít nhất 10 chữ số",
        "validation.phoneRequired": "Số điện thoại là bắt buộc",
        "validation.messageMin": "Tin nhắn phải chứa ít nhất 10 ký tự",
        "validation.messageRequired": "Nội dung tin nhắn là bắt buộc",
        "page.certificates": "Chứng chỉ",
        "page.projects": "Dự án",
        "footer.description": "Nhà phát triển đam mê xây dựng ứng dụng web và các giải pháp hệ thống SMM Panel hiện đại.",
        "footer.rights": "© 2026 Võ Hữu Trí. Bảo lưu mọi quyền.",
        "footer.madeWith": "Được tạo với 🤍 tại Sài Gòn",
        "footer.by": "bởi",
        certiDetail: "Xem chi tiết",
        greeting: "Xin chào! Chào mừng bạn đến với portfolio cá nhân của mình. Đây là nơi mình chia sẻ hành trình học tập, các sản phẩm web thực tế, hệ thống SMM Panel tiện ích và các định hướng công nghệ trên con đường trở thành lập trình viên chuyên nghiệp.",
        bio: "Mình tên là Võ Hữu Trí. Hiện tại mình là sinh viên IT tại TP. Hồ Chí Minh, quê quán ở Vĩnh Long. Mình có niềm đam mê lớn với phát triển web fullstack (PHP, MySQL, JavaScript) và thiết kế giao diện UI/UX. Mình thích xây dựng các giải pháp kỹ thuật số có khả năng tương tác tốt và mang lại giá trị thực tế.",
        title: "Lập trình viên Fullstack",
        name: "Võ Hữu Trí",
        "hero.privacy": "bảo mật mọi nơi",
        "hero.title": "bảo vệ\\ndữ liệu của bạn\\nvới securify",
        "hero.desc": "Chúng tôi bảo vệ dữ liệu của bạn với sự cẩn trọng tối đa, mang đến quyền riêng tư tuyệt đối ở bất cứ đâu.",
        "stat.users": "Người dùng",
        "stat.downloads": "Lượt tải",
        "stat.uptime": "Thời gian uptime",
        "stat.leaks": "Rò rỉ dữ liệu",
        "about.scrub": "Mình là một lập trình viên đam mê kết nối giữa thiết kế tinh tế và kiến trúc backend phức tạp. Mình xây dựng các trải nghiệm kỹ thuật số an toàn, tốc độ cao và đậm chất điện ảnh.",
        "about.bioTitle": "Tiểu sử & Nền tảng",
        "about.commitment": "Cam kết",
        "career.title": "Biên niên sử\\nSự nghiệp.",
        "career.desc": "Dòng thời gian hành trình làm việc chuyên nghiệp của mình, tập trung vào xây dựng các hệ thống quy mô lớn và giao diện mượt mà.",
        projects: [
          {
            id: 2,
            name: "Võ Hữu Trí SMM Panel",
            image: "project_smmpanel.png",
            description: "Hệ thống dịch vụ mạng xã hội (SMM) tự động giá rẻ. Cho phép người dùng đặt mua các gói tương tác (like, follow, view) tự động trên Facebook, TikTok, Instagram thông qua tích hợp API thông minh.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
            demoLink: "index.html",
            repoLink: "#",
            featured: true
          },
          {
            id: 3,
            name: "Võ Hữu Trí Blogs",
            image: "project_blog.png",
            description: "Hệ thống blog cá nhân hiện đại, tối giản được xây dựng bằng HTML, CSS, JavaScript và Tailwind CSS. Nổi bật với khả năng hiển thị nội dung động, chế độ tối, ước tính thời gian đọc và bố cục masonry.",
            technologies: ["HTML5", "CSS3", "JavaScript", "TailwindCSS"],
            demoLink: "index.html",
            repoLink: "#",
            featured: true
          }
        ],
        workExperience: [
          {
            id: 1,
            company: "Dự án Freelance",
            position: "Lập trình viên Web Fullstack",
            duration: "2024 - Hiện tại",
            location: "Thành phố Hồ Chí Minh, Việt Nam",
            description: "Nhận thiết kế và lập trình website, trang giới thiệu sản phẩm và các phần mềm bán hàng nhỏ cho chủ shop và khách hàng tự do.",
            responsibilities: [
              "Xác định nhu cầu nghiệp vụ của khách hàng để xây dựng bố cục UI/UX",
              "Phát triển APIs lưu trữ, kết xuất cơ sở dữ liệu nhanh chóng",
              "Tối ưu giao diện hiển thị di động hoàn hảo chuẩn responsive"
            ],
            achievements: [
              "Bàn giao thành công hơn 5 website thực tế hoạt động mượt mà",
              "Áp dụng cấu trúc thư viện CSS và JS tối giản, giảm dung lượng tải trang"
            ]
          },
          {
            id: 2,
            company: "Vận hành SMM Panel",
            position: "Quản trị viên Hệ thống",
            duration: "2023 - Hiện tại",
            location: "Thành phố Hồ Chí Minh, Việt Nam",
            description: "Quản trị nền tảng cung cấp dịch vụ mạng xã hội, tích hợp luồng xử lý tự động, theo dõi doanh thu và cấu hình API nhà phân phối.",
            responsibilities: [
              "Đồng bộ hóa kết nối API trung gian phân phối dịch vụ tự động",
              "Xử lý và gỡ rối lỗi nghẽn giao dịch dữ liệu trên cơ sở dữ liệu",
              "Chăm sóc và giải quyết yêu cầu kỹ thuật trực tiếp cho người dùng"
            ],
            achievements: [
              "Tự động hóa hoàn toàn trên 95% đơn hàng và dòng tiền nạp vào hệ thống",
              "Duy trì tính ổn định của máy chủ và đảm bảo thời gian xử lý siêu tốc"
            ]
          }
        ],
        certificates: [
          {
            id: 1,
            title: "Chứng chỉ Hỗ trợ CNTT Chuyên nghiệp Google",
            issuer: "Coursera / Google",
            date: "Tháng 11, 2025",
            id_code: "Google-ITS-8GX6S"
          },
          {
            id: 2,
            title: "Chứng chỉ Thiết kế Giao diện Responsive",
            issuer: "freeCodeCamp",
            date: "Tháng 6, 2025",
            id_code: "fcc-RWD-BX4MR"
          },
          {
            id: 3,
            title: "Chứng nhận Lập trình JavaScript Nâng cao",
            issuer: "Udemy",
            date: "Tháng 2, 2025",
            id_code: "UC-5e648c3b-724d"
          }
        ]
      }`;
    
    // We just find where W2 ends
    let functionRenderIdx = html.indexOf('function createSkillStars(level) {');
    if (functionRenderIdx !== -1) {
        let beforeVi = html.substring(0, viIndex);
        let afterEnd = html.substring(functionRenderIdx);
        // We know W2 ends just before createSkillStars
        html = beforeVi + newViText + '\\n    };\n\\n    ' + afterEnd;
    }
}

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Fixed VI object fully.');
