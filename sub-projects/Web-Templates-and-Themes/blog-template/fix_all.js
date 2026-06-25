const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// Fix shader color duplicate attribute
html = html.replace(/attribute vec3 color;\s*varying vec3 vColor;/g, 'varying vec3 vColor;');

// Fix logo text
html = html.replace(/<a href="#home" class="cyber-glitch-logo text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 transition hover:opacity-80">\s*[^<]*?<span class="text-cyan-400">[^<]*?<\/span>\s*<\/a>/, `<a href="#home" class="cyber-glitch-logo text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 transition hover:opacity-80">
        Võ Hữu Trí <span class="text-cyan-400">⚡</span>
      </a>`);

// Fix pseudo element content
html = html.replace(/content:\s*'[^']*';(\s*\n?\s*position:\s*absolute;\s*\n?\s*top:\s*0;\s*\n?\s*left:\s*0;\s*\n?\s*width:\s*100%;\s*\n?\s*height:\s*100%;\s*\n?\s*background:\s*#10b981;)/g, "content: 'Võ Hữu Trí ⚡';$1");

// Fix footer and translations
// Let's just find the translation object and rewrite the whole block
let startIdx = html.indexOf('const W2 = {');
let endIdx = html.indexOf('function renderI18n() {');
if (startIdx !== -1 && endIdx !== -1) {
    let before = html.substring(0, startIdx);
    let after = html.substring(endIdx);
    
    let dict = `const W2 = {
      en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.skills": "Skills",
        "nav.certificates": "Certificates",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "nav.workExp": "Experience",
        "page.aboutme": "About Me",
        "page.workExp": "Work Experience",
        "page.certificate": "Certificate",
        "page.skills": "My Skills",
        "page.greeting": "Greeting",
        "page.contact": "Get In Touch",
        "contact.title": "Contact Details",
        "contact.name": "Your Name",
        "contact.email": "Your Email",
        "contact.phone": "Your Phone Number",
        "contact.message": "Your Message",
        "contact.subtitle": "Please fill out the form below to reach out to me.",
        "contact.namePlaceholder": "Enter your full name",
        "contact.emailPlaceholder": "Enter your email address",
        "contact.phonePlaceholder": "Enter your phone number",
        "contact.messagePlaceholder": "Enter your message",
        "contact.send": "Send Message",
        "contact.sending": "Sending...",
        "contact.successMessage": "Message sent successfully! I'll get back to you soon.",
        "contact.errorMessage": "Failed to send message. Please try again later.",
        "validation.nameMin": "Name must be at least 2 characters",
        "validation.nameRequired": "Name is required",
        "validation.emailInvalid": "Invalid email address",
        "validation.emailRequired": "Email is required",
        "validation.phoneInvalid": "Invalid phone number (must be digits)",
        "validation.phoneMin": "Phone number must be at least 10 digits",
        "validation.phoneRequired": "Phone number is required",
        "validation.messageMin": "Message must be at least 10 characters",
        "validation.messageRequired": "Message is required",
        "page.certificates": "Certificates",
        "page.projects": "Projects",
        "footer.description": "Passionate developer creating web services and social media utilities with modern technologies.",
        "footer.rights": "© 2026 Vo Huu Tri. All rights reserved.",
        "footer.madeWith": "Made with 🤍 in Saigon",
        "footer.by": "by",
        certiDetail: "View Detail",
        greeting: "Hello! Welcome to my portfolio. This is where I share my learning journey, web development products, SMM panel utilities, and technology goals on the path to becoming a professional software engineer.",
        bio: "My name is Vo Huu Tri. I am currently an IT student in Ho Chi Minh City, originally from Vinh Long, Vietnam. I have a deep passion for fullstack web development (PHP, MySQL, JavaScript) and UI/UX design. I enjoy building responsive digital solutions that add real value to users.",
        title: "Fullstack Web Developer",
        name: "Vo Huu Tri",
        "hero.privacy": "privacy everywhere",
        "hero.title": "protect\\nyour data\\nwith securify",
        "hero.desc": "We safeguard your data with utmost care, empowering you with absolute privacy everywhere.",
        "stat.users": "Active Users",
        "stat.downloads": "Downloads",
        "stat.uptime": "Uptime",
        "stat.leaks": "Data Leaks",
        "about.scrub": "I'm a developer passionate about bridging the gap between elegant design and complex backend architecture. I build secure, high-speed, and cinematic digital experiences.",
        "about.bioTitle": "Biography & Background",
        "about.commitment": "Commitment",
        "career.title": "Career\\nChronicles.",
        "career.desc": "A timeline of my professional journey, focused on building large-scale systems and buttery-smooth interfaces.",
        projects: [
          
          {
            id: 2,
            name: "Vo Huu Tri SMM Panel",
            image: "project_smmpanel.png",
            description: "An automated and affordable Social Media Marketing (SMM) system. Allows users to purchase interaction packages (likes, followers, views) automatically on Facebook, TikTok, Instagram via smart API integration.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
            demoLink: "index.html",
            repoLink: "#",
            featured: true
          },
          {
            id: 3,
            name: "Vo Huu Tri Blogs",
            image: "project_blog.png",
            description: "A modern, minimalist personal blog system built with HTML, CSS, JavaScript, and Tailwind CSS. Features dynamic content rendering, dark mode, reading time estimation, and a responsive masonry layout.",
            technologies: ["HTML5", "CSS3", "JavaScript", "TailwindCSS"],
            demoLink: "index.html",
            repoLink: "#",
            featured: true
          }
        ]
      },
      vi: {
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
        ]
      }
    };
    
    `;
    html = before + dict + after;
}

// Fix direct HTML in footer
html = html.replace(/<span class="font-mono opacity-60">.*?<\/span>/g, '<span class="font-mono opacity-60">v3.0 · Powered by HTML5 & Tailwind</span>');

// Remove trailing control chars
html = html.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Fixed everything properly.');
