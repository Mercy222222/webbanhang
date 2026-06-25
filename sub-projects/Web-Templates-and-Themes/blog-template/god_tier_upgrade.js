const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// 1. I18N FIXES
const tRegex = /const translations = \{[\s\S]*?\};/;
const newTranslations = `const translations = {
      en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.experience": "Experience",
        "nav.skills": "Skills",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "hero.role": "Web Developer & IT Student",
        "hero.bio": "I architect and build digital experiences that are secure, fast, and visually cinematic.",
        "hero.btn.projects": "View Projects",
        "hero.btn.contact": "Contact Me",
        "page.aboutme": "I am a passionate developer bridging the gap between elegant design and complex backend architecture. I build digital experiences that are secure, fast, and visually cinematic.",
        "about.avatar.role": "Fullstack Developer",
        "about.bio.title": "Background & Bio",
        "about.bio.text": "I am an IT student from University of Science, TP.HCM. With a deep passion for programming, I am constantly learning and adapting to new technologies to build robust and beautiful applications.",
        "about.commitment": "Commitment",
        "page.experience": "Career Chronicles",
        "page.skills": "Technical Arsenal",
        "page.projects": "Featured Missions",
        "page.contact": "Initiate Protocol",
        "contact.desc": "Ready to build something extraordinary? Drop me a message.",
        "footer.rights": "© 2024 Võ Hữu Trí. All rights reserved."
      },
      vi: {
        "nav.home": "Trang chủ",
        "nav.about": "Giới thiệu",
        "nav.experience": "Kinh nghiệm",
        "nav.skills": "Kỹ năng",
        "nav.projects": "Dự án",
        "nav.contact": "Liên hệ",
        "hero.role": "Lập Trình Viên Web & Sinh Viên CNTT",
        "hero.bio": "Tôi kiến trúc và xây dựng các trải nghiệm kỹ thuật số an toàn, tốc độ và đậm chất điện ảnh.",
        "hero.btn.projects": "Xem Dự Án",
        "hero.btn.contact": "Liên Hệ Ngay",
        "page.aboutme": "Tôi là một lập trình viên đam mê việc kết nối giữa thiết kế thanh lịch và kiến trúc hệ thống phức tạp. Tôi xây dựng những trải nghiệm kỹ thuật số an toàn, tốc độ và đậm chất điện ảnh.",
        "about.avatar.role": "Lập Trình Viên Fullstack",
        "about.bio.title": "Tiểu sử & Lý lịch",
        "about.bio.text": "Tôi là sinh viên CNTT tại trường Đại học Khoa Học Tự Nhiên TP.HCM. Với niềm đam mê lập trình mãnh liệt, tôi không ngừng học hỏi và áp dụng các công nghệ mới để xây dựng những ứng dụng mạnh mẽ và đẹp mắt.",
        "about.commitment": "Cam Kết",
        "page.experience": "Hành Trình Sự Nghiệp",
        "page.skills": "Kho Khí Tài Công Nghệ",
        "page.projects": "Nhiệm Vụ Nổi Bật",
        "page.contact": "Khởi Chạy Giao Thức Liên Hệ",
        "contact.desc": "Sẵn sàng xây dựng một thứ gì đó phi thường? Hãy gửi tin nhắn cho tôi.",
        "footer.rights": "© 2024 Võ Hữu Trí. Đã đăng ký bản quyền."
      }
    };`;
html = html.replace(tRegex, newTranslations);

// Add IDs to About elements
html = html.replace('<h3 class="text-2xl font-bold text-white">Võ Hữu Trí</h3>\n              <p class="text-cyan-400 font-mono text-sm mt-1">Fullstack Developer</p>', 
'<h3 class="text-2xl font-bold text-white">Võ Hữu Trí</h3>\n              <p id="label-avatar-role" class="text-cyan-400 font-mono text-sm mt-1">Fullstack Developer</p>');

html = html.replace('<h3 class="text-xl text-white font-bold mb-4">Background & Bio</h3>', 
'<h3 id="label-bio-title" class="text-xl text-white font-bold mb-4">Background & Bio</h3>');

html = html.replace('<span class="block text-xs uppercase text-slate-500 font-mono mt-2">Commitment</span>', 
'<span id="label-about-commitment" class="block text-xs uppercase text-slate-500 font-mono mt-2">Commitment</span>');

html = html.replace('<h2 id="about-scrub" class="text-4xl md:text-6xl font-bold leading-tight text-white scrub-text">',
'<h2 id="label-about-scrub" class="text-4xl md:text-6xl font-bold leading-tight text-white scrub-text">');

// Update safeSetText calls inside updateLanguageUI
const newLangUI = `function updateLanguageUI() {
      document.documentElement.lang = currentLang;
      // Header
      safeSetText('nav-home', t('nav.home'));
      safeSetText('nav-about', t('nav.about'));
      safeSetText('nav-experience', t('nav.experience'));
      safeSetText('nav-skills', t('nav.skills'));
      safeSetText('nav-projects', t('nav.projects'));
      safeSetText('nav-contact', t('nav.contact'));
      // Hero
      safeSetText('hero-role', t('hero.role'));
      safeSetText('hero-bio', t('hero.bio'));
      safeSetText('btn-hero-projects-text', t('hero.btn.projects'));
      safeSetText('btn-hero-contact-text', t('hero.btn.contact'));
      // About
      safeSetText('label-about-scrub', t('page.aboutme'));
      safeSetText('label-avatar-role', t('about.avatar.role'));
      safeSetText('label-bio-title', t('about.bio.title'));
      safeSetText('label-about-bio', t('about.bio.text'));
      safeSetText('label-about-commitment', t('about.commitment'));
      // Titles
      safeSetText('label-work-title', t('page.experience'));
      safeSetText('label-skills-title', t('page.skills'));
      safeSetText('label-projects-title', t('page.projects'));
      safeSetText('label-contact-title', t('page.contact'));
      safeSetText('label-contact-desc', t('contact.desc'));
      safeSetText('label-footer-rights', t('footer.rights'));
    }`;
html = html.replace(/function updateLanguageUI\(\) \{[\s\S]*?\}\s*document\.addEventListener/m, newLangUI + '\n    document.addEventListener');

// 2. GOD TIER: CSS (Custom Cursor, Magnetic, Lenis)
const godTierCss = `
  <style>
    /* Custom Blending Cursor */
    * { cursor: none !important; }
    .god-cursor {
      position: fixed; top: 0; left: 0;
      width: 20px; height: 20px;
      background: white;
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      mix-blend-mode: difference;
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s, background 0.3s;
    }
    .god-cursor.hovering {
      width: 60px; height: 60px;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(4px);
      mix-blend-mode: normal;
      border: 1px solid rgba(255,255,255,0.5);
    }
    
    /* Lenis Smooth Scroll */
    html.lenis { height: auto; }
    .lenis.lenis-smooth { scroll-behavior: auto !important; }
    .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
    .lenis.lenis-stopped { overflow: hidden; }
    .lenis.lenis-scrolling iframe { pointer-events: none; }

    /* Magnetic Elements */
    .magnetic-wrap { display: inline-block; }
  </style>
`;
if(!html.includes('god-cursor')) {
  html = html.replace('</head>', godTierCss + '\n</head>');
  html = html.replace('<body class="bg-[#0b1121]', '<div class="god-cursor"></div>\n<body class="bg-[#0b1121]');
}

// 3. GOD TIER: Inject Lenis CDN
if(!html.includes('lenis.min.js')) {
  html = html.replace('<!-- GSAP & ScrollTrigger -->', 
    `<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>\n  <!-- GSAP & ScrollTrigger -->`);
}

// 4. GOD TIER: JavaScript Engine (Lenis + Cursor + Magnetic)
const godTierJS = `
  <!-- GOD TIER ENGINE -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      // 1. Initialize Lenis
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Sync GSAP with Lenis
      if(typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time)=>{ lenis.raf(time * 1000) });
        gsap.ticker.lagSmoothing(0);
      }

      // 2. Custom Cursor
      const cursor = document.querySelector('.god-cursor');
      let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
      
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });

      // Smooth follow
      gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = \`translate(\${cursorX}px, \${cursorY}px) translate(-50%, -50%)\`;
      });

      // Hover Effects
      const interactiveEls = document.querySelectorAll('a, button, .securify-card, .magnetic');
      interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
      });

      // 3. Magnetic Physics
      const magnetics = document.querySelectorAll('.nav-link, #btn-hero-projects, #btn-hero-contact, .pill-badge');
      magnetics.forEach(el => {
        el.classList.add('magnetic-wrap');
        const xTo = gsap.quickTo(el, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
        const yTo = gsap.quickTo(el, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          xTo((e.clientX - cx) * 0.4);
          yTo((e.clientY - cy) * 0.4);
        });
        el.addEventListener("mouseleave", () => {
          xTo(0); yTo(0);
        });
      });
    });
  </script>
`;

if(!html.includes('GOD TIER ENGINE')) {
  html = html.replace('<!-- --- GSAP & 3D INTERACTION SCRIPT --- -->', godTierJS + '\n<!-- --- GSAP & 3D INTERACTION SCRIPT --- -->');
}

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Successfully injected GOD TIER engine (Lenis + Cursor + Magnetic) and fixed I18n.');
