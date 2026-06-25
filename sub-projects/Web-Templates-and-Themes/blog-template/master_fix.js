const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html.bak', 'utf8');

// 1. Shaders fixes (Remove duplicate attribute color and attribute pRadius)
html = html.replace(/attribute vec3 color;\n\s*varying vec3 vColor;/g, 'varying vec3 vColor;');
html = html.replace(/attribute vec3 color;\s*varying vec3 vColor;/g, 'varying vec3 vColor;');

// Replace pRadius duplicate
html = html.replace(/attribute float pRadius;\n\s*varying float vRadius;/g, 'varying float vRadius;');
html = html.replace(/attribute float pRadius;\s*varying float vRadius;/g, 'varying float vRadius;');

// 2. Control characters & Vite literal newline errors
html = html.replace(/\/\* â”€â”€â”€ Dá»® LIá»†U Ä A NGÃ”N NGá»®.*?â”€â”€â”€ \*\//, '/* DỮ LIỆU ĐA NGÔN NGỮ (VI/EN) */');
html = html.replace(/â”€â”€â”€/g, '---');
html = html.replace(/â€¢/g, '•');

// Fix the literal newlines inside JS strings in W2
html = html.replace(/"protect\r?\nyour data\r?\nwith securify"/g, '"protect\\\\nyour data\\\\nwith securify"');
html = html.replace(/"Career\r?\nChronicles\."/g, '"Career\\\\nChronicles."');
html = html.replace(/"bảo vệ\r?\ndữ liệu của bạn\r?\nvới securify"/g, '"bảo vệ\\\\ndữ liệu của bạn\\\\nvới securify"');
html = html.replace(/"Biên niên sử\r?\nSự nghiệp\."/g, '"Biên niên sử\\\\nSự nghiệp."');

// 4. Mojibake Fixes
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
        "hero.title": "bảo vệ\\\\ndữ liệu của bạn\\\\nvới securify",
        "hero.desc": "Chúng tôi bảo vệ dữ liệu của bạn với sự cẩn trọng tối đa, mang đến quyền riêng tư tuyệt đối ở bất cứ đâu.",
        "stat.users": "Người dùng",
        "stat.downloads": "Lượt tải",
        "stat.uptime": "Thời gian uptime",
        "stat.leaks": "Rò rỉ dữ liệu",
        "about.scrub": "Mình là một lập trình viên đam mê kết nối giữa thiết kế tinh tế và kiến trúc backend phức tạp. Mình xây dựng các trải nghiệm kỹ thuật số an toàn, tốc độ cao và đậm chất điện ảnh.",
        "about.bioTitle": "Tiểu sử & Nền tảng",
        "about.commitment": "Cam kết",
        "career.title": "Biên niên sử\\\\nSự nghiệp.",
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

let viStart = html.indexOf('vi: {');
let enStart = html.indexOf('en: {', viStart);
if (viStart !== -1 && enStart !== -1) {
    html = html.substring(0, viStart) + newViText + ',\n      ' + html.substring(enStart);
}

// 5. Hardcoded HUD text replacement
html = html.replace(/Name: V\w*\s+H\w*\s+Tr\w*/g, 'Name: Võ Hữu Trí');
html = html.replace(/Vinh Long/ig, 'Vĩnh Long');
html = html.replace(/VÄ©nh Long/ig, 'Vĩnh Long');
html = html.replace(/Name: VÃµ Há»¯u TrÃ­/g, 'Name: Võ Hữu Trí');
html = html.replace(/Name: Vo H\?u Tr/g, 'Name: Võ Hữu Trí');
html = html.replace(/VÃµ Há»¯u TrÃ­â€¦/g, 'Võ Hữu Trí');
html = html.replace(/VÃµ Há»¯u TrÃ­/g, 'Võ Hữu Trí');
html = html.replace(/Vo H\?u Tr/g, 'Võ Hữu Trí');

// Remove email/location from Contact section and add social links
let contactMatch = html.match(/HUUTRI\.USER/);
if (!contactMatch) {
  let emailBlockRegex = /<div class="flex items-start gap-4">[\s\S]*?<p class="text-sm font-semibold text-zinc-400 ">Email<\/p>[\s\S]*?<\/div>\s*<\/div>/;
  let locBlockRegex = /<div class="flex items-start gap-4">[\s\S]*?<p class="text-sm font-semibold text-zinc-400 ">Location<\/p>[\s\S]*?<\/div>\s*<\/div>/;
  
  html = html.replace(emailBlockRegex, '');
  html = html.replace(locBlockRegex, '');

  let phoneBlockRegex = /<div class="flex items-start gap-4">[\s\S]*?<p class="text-sm font-semibold text-zinc-400 ">Phone<\/p>[\s\S]*?<\/div>\s*<\/div>/;
  
  let newContactHtml = `            <div class="flex items-start gap-4">
              <div class="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-cyan-400 text-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div>
                <p class="text-sm font-semibold text-zinc-400 ">Phone</p>
                <a href="tel:0979324949" class="text-sm font-semibold hover:underline">0979 324 949</a>
              </div>
            </div>

            <!-- Social Links -->
            <div class="pt-6 mt-4 border-t border-zinc-200/50 dark:border-white/10">
              <p class="text-[11px] font-bold text-zinc-400 mb-5 tracking-[0.2em] uppercase">Connect</p>
              <div class="flex gap-3 flex-wrap">
                <!-- Facebook -->
                <a href="https://www.facebook.com/HUUTRI.USER" target="_blank" title="Facebook" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-blue-600/20 hover:border-blue-500/40 hover:text-blue-400 hover:shadow-[0_8px_32px_rgba(37,99,235,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <i class="fab fa-facebook-f text-lg relative z-10 transition-transform duration-500 group-hover:scale-110"></i>
                </a>
                
                <!-- GitHub -->
                <a href="https://github.com/Mercy222222" target="_blank" title="GitHub" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-[#333]/90 hover:border-[#333]/40 hover:text-white hover:shadow-[0_8px_32px_rgba(51,51,51,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#333]/0 via-[#333]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <i class="fab fa-github text-lg relative z-10 transition-transform duration-500 group-hover:scale-110"></i>
                </a>
                
                <!-- Zalo -->
                <a href="https://zalo.me/0979324949" target="_blank" title="Zalo" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-[#0068FF]/20 hover:border-[#0068FF]/40 hover:text-[#0068FF] hover:shadow-[0_8px_32px_rgba(0,104,255,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#0068FF]/0 via-[#0068FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span class="text-[10px] font-bold relative z-10 transition-transform duration-500 group-hover:scale-110">ZALO</span>
                </a>
                
                <!-- Spotify -->
                <a href="https://open.spotify.com/user/mercy222222" target="_blank" title="Spotify" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-[#1DB954]/20 hover:border-[#1DB954]/40 hover:text-[#1DB954] hover:shadow-[0_8px_32px_rgba(29,185,84,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#1DB954]/0 via-[#1DB954]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <i class="fab fa-spotify text-lg relative z-10 transition-transform duration-500 group-hover:scale-110"></i>
                </a>
              </div>
            </div>`;
  html = html.replace(phoneBlockRegex, newContactHtml);
}

// 6. Finally, strip all non-printable bytes to prevent Vite crashes
let cleanHtml = '';
for (let i = 0; i < html.length; i++) {
    let code = html.charCodeAt(i);
    // Allow tabs, newlines, carriage returns
    if (code === 9 || code === 10 || code === 13) {
        cleanHtml += html[i];
    } else if (code >= 32) { // Allow all printables including unicode > 127
        cleanHtml += html[i];
    }
}

fs.writeFileSync('index-portfolio.html', cleanHtml, 'utf8');
console.log('Master fix completed.');
