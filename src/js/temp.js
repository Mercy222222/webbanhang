
    /* ─── Web Owner Configuration Block (Telegram Fulfill Integration) ─── */
    const CONFIG = {
      TELEGRAM_BOT_TOKEN: "7820468940:AAGYqfFv7QG9M2p98d6j4g5h7k8", // Replace with your actual bot token to make it fully automatic
      TELEGRAM_CHAT_ID: "5086884022", // Replace with your chat/channel ID
      BANK_ID: "BIDV",
      BANK_ACCOUNT: "0979324949",
      ACCOUNT_NAME: "VO HUU TRI",
      TELEGRAM_BOT_URL: "https://t.me/viesmmbot",
      TELEGRAM_ADMIN_URL: "https://t.me/thanhbinhdev"
    };

    /* ─── Mock Data for SMM Services ─── */
    const smmData = {
      instagram: {
        name: "Instagram",
        categories: {
          like: {
            name: "Tăng Like Instagram",
            services: [
              { id: 101, name: "Like Instagram [Giá Rẻ] [Max 50K] [Tốc độ nhanh]", rate: 1200, min: 100, max: 50000, comment: false },
              { id: 102, name: "Like Instagram [Chất Lượng Cao] [Không tụt] [Bảo hành 30 ngày]", rate: 2500, min: 100, max: 20000, comment: false }
            ]
          },
          follow: {
            name: "Tăng Follow Instagram",
            services: [
              { id: 103, name: "Follow Instagram [Tài khoản hoạt động] [Tốc độ trung bình]", rate: 15000, min: 100, max: 10000, comment: false },
              { id: 104, name: "Follow Instagram [Bảo hành vĩnh viễn] [Avatar + Đăng bài]", rate: 28000, min: 200, max: 50000, comment: false }
            ]
          }
        }
      },
      tiktok: {
        name: "TikTok",
        categories: {
          like: {
            name: "Tăng Tim / Like TikTok",
            services: [
              { id: 201, name: "Tim TikTok [Ổn định] [Lên ngay lập tức]", rate: 3500, min: 100, max: 100000, comment: false },
              { id: 202, name: "Tim TikTok [Tài khoản thật VN] [An toàn cho kênh]", rate: 5800, min: 100, max: 20000, comment: false }
            ]
          },
          follow: {
            name: "Tăng Follow TikTok",
            services: [
              { id: 203, name: "Follow TikTok [Hỗ trợ bật Live] [Nhanh chóng]", rate: 18000, min: 100, max: 10000, comment: false },
              { id: 204, name: "Follow TikTok [Bảo hành 30 ngày] [Giảm tụt]", rate: 25000, min: 200, max: 30000, comment: false }
            ]
          },
          view: {
            name: "Tăng View TikTok",
            services: [
              { id: 205, name: "View TikTok [Siêu Tốc] [Hỗ trợ lên xu hướng]", rate: 150, min: 1000, max: 1000000, comment: false },
              { id: 206, name: "View TikTok [Tự động lặp lại] [Xem hết clip]", rate: 290, min: 1000, max: 500000, comment: false }
            ]
          },
          comment: {
            name: "Tăng Bình Luận TikTok",
            services: [
              { id: 207, name: "Bình luận TikTok [Nội dung tùy chỉnh]", rate: 25000, min: 5, max: 1000, comment: true }
            ]
          }
        }
      },
      youtube: {
        name: "Youtube",
        categories: {
          view: {
            name: "Tăng View Youtube",
            services: [
              { id: 301, name: "View Youtube [Hợp lệ AdSense] [Thời gian giữ chân cao]", rate: 35000, min: 500, max: 100000, comment: false },
              { id: 302, name: "View Youtube Shorts [Siêu Rẻ] [Max 10M]", rate: 12000, min: 1000, max: 1000000, comment: false }
            ]
          },
          sub: {
            name: "Tăng Subscribe Youtube",
            services: [
              { id: 303, name: "Subscribe Youtube [Bảo hành trọn đời] [Tài khoản thật]", rate: 280000, min: 50, max: 5000, comment: false }
            ]
          }
        }
      },
      facebook: {
        name: "Facebook",
        categories: {
          like: {
            name: "Tăng Like Bài Viết",
            services: [
              { id: 401, name: "Like Bài Viết Facebook [Giá rẻ] [Lên nhanh]", rate: 2500, min: 100, max: 10000, comment: false },
              { id: 402, name: "Cảm xúc Facebook (Thả tim, Haha, Wow) [Lựa chọn]", rate: 3800, min: 100, max: 10000, comment: false }
            ]
          },
          follow: {
            name: "Tăng Theo Dõi Profile / Fanpage",
            services: [
              { id: 403, name: "Sub Cá Nhân Facebook [Nick Thật VN]", rate: 32000, min: 500, max: 50000, comment: false },
              { id: 404, name: "Follow Fanpage [Có nút Thích + Theo dõi]", rate: 45000, min: 500, max: 100000, comment: false }
            ]
          }
        }
      },
      telegram: {
        name: "Telegram",
        categories: {
          member: {
            name: "Tăng Member Channel / Group",
            services: [
              { id: 501, name: "Telegram Member [Tài khoản quốc tế] [Giá tốt]", rate: 15000, min: 100, max: 50000, comment: false },
              { id: 502, name: "Telegram Member [Bảo hành 30 ngày] [Nick Việt]", rate: 39000, min: 100, max: 20000, comment: false }
            ]
          },
          view: {
            name: "Tăng View Bài Viết Telegram",
            services: [
              { id: 503, name: "View Telegram [5 bài viết gần nhất]", rate: 800, min: 100, max: 10000, comment: false }
            ]
          }
        }
      }
    };

    /* ─── DOM Elements ─── */
    const platformSelect = document.getElementById('platform-select');
    const categorySelect = document.getElementById('category-select');
    const serviceSelect = document.getElementById('service-select');
    const linkInput = document.getElementById('link-input');
    const quantityInput = document.getElementById('quantity-input');
    const commentGroup = document.getElementById('comment-group');
    const commentInput = document.getElementById('comment-input');
    const ratePriceEl = document.getElementById('rate-price');
    const totalPriceEl = document.getElementById('total-price');
    const quantityLimitsEl = document.getElementById('quantity-limits');
    const servicesTableBody = document.querySelector('#services-table-el tbody');

    // Header State Elements
    const guestNav = document.getElementById('guest-nav');
    const userNav = document.getElementById('user-nav');
    const displayBalance = document.getElementById('display-balance');
    const displayAvatar = document.getElementById('display-avatar');
    const displayUsername = document.getElementById('display-username');
    const userDropdown = document.getElementById('user-dropdown');

    // Auth Overlay Elements
    const authModalOverlay = document.getElementById('auth-modal-overlay');
    const loginTabBtn = document.getElementById('login-tab-btn');
    const registerTabBtn = document.getElementById('register-tab-btn');
    const loginPanel = document.getElementById('login-panel');
    const registerPanel = document.getElementById('register-panel');

    // Deposit Overlay Elements
    const depositModalOverlay = document.getElementById('deposit-modal-overlay');
    const depositAmountInput = document.getElementById('deposit-amount-input');
    const vietqrImageEl = document.getElementById('vietqr-image-el');
    const vietqrMemoText = document.getElementById('vietqr-memo-text');

    /* ─── State Management ─── */
    let currentUser = null;
    let tempCost = 0;

    /* ─── Initialize Application ─── */
    function init() {
      // 1. Populate Platforms
      platformSelect.innerHTML = Object.entries(smmData).map(([key, value]) => 
        `<option value="${key}">${value.name}</option>`
      ).join('');

      updateCategories();
      populateServicesTable();
      initTheme();
      initAuth();
      
      // Initialize Three.js 3D Background
      initThreeJS();
      animateThree();
      
      // 3D Tilt Card Effects initialization
      init3DTilt();

      // Initialize 3D Scroll Reveal
      initScrollReveal3D();

      // Start typewriter
      setTimeout(typeText, newTextDelay);
    }

    function init3DTilt() {
      const cards = document.querySelectorAll('.stat-card, .order-card, .platform-card');
      
      cards.forEach(card => {
        const parent = card.parentElement;
        if (parent) {
          parent.style.perspective = '1500px';
        }
        
        card.style.transformStyle = 'preserve-3d';
        
        let glare = card.querySelector('.card-glare');
        if (!glare) {
          glare = document.createElement('div');
          glare.className = 'card-glare';
          card.appendChild(glare);
        }

        let rect = card.getBoundingClientRect();
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let isHovered = false;
        let animFrameId = null;

        function updateCardPosition() {
          if (!isHovered) {
            currentX += (0 - currentX) * 0.1;
            currentY += (0 - currentY) * 0.1;
            
            // Fade out glare
            let glareOpacity = parseFloat(glare.style.opacity) || 0;
            glareOpacity += (0 - glareOpacity) * 0.1;
            glare.style.opacity = glareOpacity;
            
            if (Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
              card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
              glare.style.opacity = '0';
              animFrameId = null;
              return;
            }
          } else {
            currentX += (targetX - currentX) * 0.15;
            currentY += (targetY - currentY) * 0.15;
            glare.style.opacity = '1';
          }

          card.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg) scale3d(1.03, 1.03, 1.03)`;
          animFrameId = requestAnimationFrame(updateCardPosition);
        }

        card.addEventListener('mouseenter', () => {
          isHovered = true;
          rect = card.getBoundingClientRect();
          if (!animFrameId) {
            animFrameId = requestAnimationFrame(updateCardPosition);
          }
        });

        card.addEventListener('mousemove', (e) => {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const w = rect.width;
          const h = rect.height;
          
          targetY = ((x / w) - 0.5) * 20; 
          targetX = (0.5 - (y / h)) * 20;
          
          const glareX = (x / w) * 100;
          const glareY = (y / h) * 100;
          glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`;
        });
        
        card.addEventListener('mouseleave', () => {
          isHovered = false;
        });

        window.addEventListener('resize', () => { rect = card.getBoundingClientRect(); });
        window.addEventListener('scroll', () => { rect = card.getBoundingClientRect(); });
      });
    }

    function initScrollReveal3D() {
      const revealElements = document.querySelectorAll('.reveal-3d');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    }

    /* ─── Dynamic Dropdown Cascading ─── */
    function updateCategories() {
      const selectedPlatform = platformSelect.value;
      const categories = smmData[selectedPlatform].categories;
      
      categorySelect.innerHTML = Object.entries(categories).map(([key, value]) => 
        `<option value="${key}">${value.name}</option>`
      ).join('');

      updateServices();
    }

    function updateServices() {
      const selectedPlatform = platformSelect.value;
      const selectedCategory = categorySelect.value;
      const services = smmData[selectedPlatform].categories[selectedCategory].services;

      serviceSelect.innerHTML = services.map(service => 
        `<option value="${service.id}">${service.name}</option>`
      ).join('');

      calculatePrice();
    }

    /* ─── Form Math Calculations ─── */
    function calculatePrice() {
      const selectedPlatform = platformSelect.value;
      const selectedCategory = categorySelect.value;
      const selectedServiceId = parseInt(serviceSelect.value);
      const services = smmData[selectedPlatform].categories[selectedCategory].services;
      const service = services.find(s => s.id === selectedServiceId);

      if (!service) return;

      // Handle Comment mode inputs
      if (service.comment) {
        commentGroup.style.display = 'block';
        quantityInput.disabled = true;
        updateCommentQuantity();
      } else {
        commentGroup.style.display = 'none';
        quantityInput.disabled = false;
      }

      // Update limits help text
      quantityLimitsEl.innerText = `Tối thiểu: ${service.min.toLocaleString('vi-VN')} - Tối đa: ${service.max.toLocaleString('vi-VN')}`;
      quantityInput.min = service.min;
      quantityInput.max = service.max;

      // Display Rate
      ratePriceEl.innerText = `${service.rate.toLocaleString('vi-VN')} đ`;

      // Calculate Total
      const qty = parseInt(quantityInput.value) || 0;
      tempCost = Math.ceil((qty / 1000) * service.rate);
      totalPriceEl.innerText = `${tempCost.toLocaleString('vi-VN')} đ`;
    }

    function updateCommentQuantity() {
      const text = commentInput.value;
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const count = Math.max(1, lines.length);
      quantityInput.value = count;
      
      // Calculate Price again based on new count
      const selectedPlatform = platformSelect.value;
      const selectedCategory = categorySelect.value;
      const selectedServiceId = parseInt(serviceSelect.value);
      const service = smmData[selectedPlatform].categories[selectedCategory].services.find(s => s.id === selectedServiceId);
      
      if (service) {
        tempCost = Math.ceil((count / 1000) * service.rate);
        totalPriceEl.innerText = `${tempCost.toLocaleString('vi-VN')} đ`;
      }
    }

    /* ─── Quick Buttons ─── */
    function selectPlatformDirectly(platformKey) {
      if (smmData[platformKey]) {
        platformSelect.value = platformKey;
        updateCategories();
        document.querySelector('.order-card').scrollIntoView({ behavior: 'smooth' });
      }
    }

    async function pasteLink() {
      try {
        const text = await navigator.clipboard.readText();
        linkInput.value = text;
        Swal.fire({
          icon: 'success',
          title: 'Đã dán!',
          text: 'Đã dán link từ clipboard thành công.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Không thể truy cập clipboard',
          text: 'Vui lòng tự paste thủ công hoặc cấp quyền cho trình duyệt.',
          confirmButtonText: 'Đồng ý'
        });
      }
    }

    /* ─── Table Populator ─── */
    function populateServicesTable() {
      let html = '';
      Object.entries(smmData).forEach(([platformKey, platform]) => {
        Object.entries(platform.categories).forEach(([catKey, category]) => {
          category.services.forEach(service => {
            html += `
              <tr data-name="${platform.name.toLowerCase()} ${service.name.toLowerCase()}">
                <td>#${service.id}</td>
                <td><span class="service-badge ${platformKey}">${platform.name}</span></td>
                <td>${service.name}</td>
                <td><strong style="color:var(--primary)">${service.rate.toLocaleString('vi-VN')} đ</strong></td>
                <td>
                  <button class="btn-order-direct" onclick="quickOrder(${service.id}, '${platformKey}', '${catKey}')">Đặt mua</button>
                </td>
              </tr>
            `;
          });
        });
      });
      servicesTableBody.innerHTML = html;
    }

    function quickOrder(serviceId, platformKey, categoryKey) {
      platformSelect.value = platformKey;
      updateCategories();
      categorySelect.value = categoryKey;
      updateServices();
      serviceSelect.value = serviceId;
      calculatePrice();
      document.querySelector('.order-card').scrollIntoView({ behavior: 'smooth' });
    }

    function filterServicesTable() {
      const q = document.getElementById('search-service').value.toLowerCase();
      const rows = servicesTableBody.querySelectorAll('tr');
      rows.forEach(row => {
        const name = row.getAttribute('data-name');
        if (name.includes(q)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    }

    /* ─── Authentic Auth Logic (Simulated Backend) ─── */
    function initAuth() {
      let users = JSON.parse(localStorage.getItem('smm_users'));
      if (!users) {
        users = [
          { username: 'admin', email: 'admin@tristar.vn', password: '123', balance: 500000 },
          { username: 'huutri', email: 'huutri@gmail.com', password: '123', balance: 150000 }
        ];
        localStorage.setItem('smm_users', JSON.stringify(users));
      }

      const loggedUser = JSON.parse(localStorage.getItem('smm_current_user'));
      if (loggedUser) {
        currentUser = loggedUser;
        updateUIForLogin();
      } else {
        updateUIForLogout();
      }
    }

    function openAuthModal(tab = 'login') {
      authModalOverlay.classList.add('open');
      switchAuthTab(tab);
    }

    function closeAuthModal() {
      authModalOverlay.classList.remove('open');
    }

    function closeAuthModalOnOverlay(e) {
      if (e.target === authModalOverlay) {
        closeAuthModal();
      }
    }

    function switchAuthTab(tab) {
      if (tab === 'login') {
        loginTabBtn.classList.add('active');
        registerTabBtn.classList.remove('active');
        loginPanel.classList.add('active');
        registerPanel.classList.remove('active');
      } else {
        loginTabBtn.classList.remove('active');
        registerTabBtn.classList.add('active');
        loginPanel.classList.remove('active');
        registerPanel.classList.add('active');
      }
    }

    function handleRegisterSubmit(e) {
      e.preventDefault();
      const usernameInput = document.getElementById('reg-username').value.trim();
      const emailInput = document.getElementById('reg-email').value.trim();
      const passwordInput = document.getElementById('reg-password').value.trim();

      let users = JSON.parse(localStorage.getItem('smm_users')) || [];

      if (users.find(u => u.username.toLowerCase() === usernameInput.toLowerCase())) {
        Swal.fire({
          icon: 'error',
          title: 'Tài khoản tồn tại',
          text: 'Tên tài khoản này đã được sử dụng. Vui lòng chọn tên khác!'
        });
        return;
      }

      const newUser = {
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
        balance: 100000
      };
      
      users.push(newUser);
      localStorage.setItem('smm_users', JSON.stringify(users));

      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công!',
        html: 'Chào mừng bạn! Hệ thống đã <strong>tặng bạn 100.000 đ</strong> làm số dư dùng thử.',
        confirmButtonText: 'Đăng nhập ngay'
      }).then(() => {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
        currentUser = newUser;
        localStorage.setItem('smm_current_user', JSON.stringify(currentUser));
        updateUIForLogin();
        closeAuthModal();
      });
    }

    function handleLoginSubmit(e) {
      e.preventDefault();
      const usernameInput = document.getElementById('login-username').value.trim().toLowerCase();
      const passwordInput = document.getElementById('login-password').value;

      let users = JSON.parse(localStorage.getItem('smm_users')) || [];
      const matched = users.find(u => u.username.toLowerCase() === usernameInput || u.email.toLowerCase() === usernameInput);

      if (matched && matched.password === passwordInput) {
        currentUser = matched;
        localStorage.setItem('smm_current_user', JSON.stringify(currentUser));
        
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: `Chào mừng bạn quay lại, ${currentUser.username}!`,
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          confetti({ particleCount: 50, spread: 40, origin: { y: 0.8 } });
          updateUIForLogin();
          closeAuthModal();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại',
          text: 'Tên tài khoản hoặc mật khẩu không chính xác!'
        });
      }
    }

    function handleLogout() {
      currentUser = null;
      localStorage.removeItem('smm_current_user');
      updateUIForLogout();
      Swal.fire({
        icon: 'success',
        title: 'Đã đăng xuất',
        text: 'Bạn đã đăng xuất tài khoản thành công.',
        timer: 1200,
        showConfirmButton: false
      });
    }

    function updateUIForLogin() {
      guestNav.style.display = 'none';
      userNav.style.display = 'flex';
      displayBalance.innerText = `${currentUser.balance.toLocaleString('vi-VN')} đ`;
      displayUsername.innerText = currentUser.username;
      displayAvatar.innerText = currentUser.username.charAt(0).toUpperCase();
    }

    function updateUIForLogout() {
      guestNav.style.display = 'flex';
      userNav.style.display = 'none';
      userDropdown.style.display = 'none';
    }

    function toggleUserDropdown() {
      userDropdown.style.display = userDropdown.style.display === 'flex' ? 'none' : 'flex';
    }

    document.addEventListener('click', (e) => {
      const btn = document.querySelector('.user-dropdown-btn');
      if (btn && !btn.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.style.display = 'none';
      }
    });

    /* ─── Deposit/QR Modal Logic ─── */
    function openDepositModal() {
      if (!currentUser) {
        Swal.fire({
          icon: 'warning',
          title: 'Yêu cầu đăng nhập',
          text: 'Vui lòng đăng nhập trước khi thực hiện nạp tiền!'
        });
        return;
      }
      userDropdown.style.display = 'none';
      depositModalOverlay.classList.add('open');
      updateVietQR();
    }

    function closeDepositModal() {
      depositModalOverlay.classList.remove('open');
    }

    function closeDepositModalOnOverlay(e) {
      if (e.target === depositModalOverlay) {
        closeDepositModal();
      }
    }

    function selectDepositAmount(amount) {
      depositAmountInput.value = amount;
      
      // Update active button styling
      const buttons = document.querySelectorAll('.qr-amount-selectors button');
      buttons.forEach(btn => {
        if (btn.innerText.replace(/\./g, '') === amount.toString()) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      updateVietQR();
    }

    function updateVietQR() {
      const amount = parseInt(depositAmountInput.value) || 10000;
      const memo = `SMM ${currentUser ? currentUser.username.toUpperCase() : 'KHACH'}`;
      
      vietqrMemoText.innerText = memo;

      // Construct dynamic VietQR image link via Official VietQR generator API
      const qrUrl = `https://img.vietqr.io/image/${CONFIG.BANK_ID}-${CONFIG.BANK_ACCOUNT}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(memo)}&accountName=${encodeURIComponent(CONFIG.ACCOUNT_NAME)}`;
      vietqrImageEl.src = qrUrl;
    }

    function playDepositSound() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const playTone = (freq, duration, startTime, type = 'sine') => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = type;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(0.15, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(startTime);
          osc.stop(startTime + duration);
        };
        const now = audioCtx.currentTime;
        playTone(523.25, 0.15, now, 'sine'); // C5
        playTone(659.25, 0.15, now + 0.1, 'sine'); // E5
        playTone(783.99, 0.3, now + 0.2, 'sine'); // G5
      } catch (e) {
        console.error("Audio failed to play:", e);
      }
    }

    function speakNotification(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    }

    let isScanning = false;
    function triggerDepositSimulation() {
      if (isScanning) return;
      if (!currentUser) {
        Swal.fire({
          icon: 'warning',
          title: 'Yêu cầu đăng nhập',
          text: 'Vui lòng đăng nhập trước khi thực hiện nạp tiền!'
        });
        return;
      }
      
      const amount = parseInt(depositAmountInput.value) || 50000;
      const username = currentUser.username;
      
      isScanning = true;
      
      // UI feedback: disable buttons and interactive elements in modal
      const submitBtn = document.querySelector('.auth-modal.deposit-modal .btn-submit');
      const amountBtns = document.querySelectorAll('.qr-amount-selectors button');
      const closeBtn = document.querySelector('.auth-modal.deposit-modal .btn-close-modal');
      
      if (submitBtn) {
        submitBtn.style.opacity = '0.5';
        submitBtn.style.pointerEvents = 'none';
      }
      amountBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.5';
      });
      if (closeBtn) {
        closeBtn.style.pointerEvents = 'none';
        closeBtn.style.opacity = '0.5';
      }
      
      // Get console elements
      const consoleEl = document.getElementById('banking-console');
      const logsContainer = document.getElementById('console-logs');
      const statusText = consoleEl.querySelector('.console-status');
      
      consoleEl.style.display = 'block';
      logsContainer.innerHTML = '';
      
      // Helper to append log rows
      const addLogRow = (text, type = 'info') => {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        
        let typeClass = 'log-info';
        let typeLabel = '[INFO]';
        if (type === 'success') {
          typeClass = 'log-success';
          typeLabel = '[SUCCESS]';
        } else if (type === 'warn') {
          typeClass = 'log-warning';
          typeLabel = '[WARN]';
        }
        
        const row = document.createElement('div');
        row.className = 'console-log-row ' + typeClass;
        row.innerHTML = `<span class="log-time">${timeStr}</span> ${typeLabel} ${text}`;
        logsContainer.appendChild(row);
        logsContainer.scrollTop = logsContainer.scrollHeight;
      };
      
      // Update console status
      statusText.innerHTML = '<span class="status-dot" style="background-color:#fbbf24; animation: pulse-dot 1s infinite;"></span> CONNECTING';
      statusText.style.color = '#fbbf24';
      
      // Logs Timeline Sequence
      setTimeout(() => {
        addLogRow('Đang khởi tạo kết nối bảo mật tới cổng thanh toán BIDV API...', 'info');
      }, 0);
      
      setTimeout(() => {
        addLogRow('Kết nối thành công! Đang xác thực chứng chỉ API token [BIDV-LIVE-0979324949-SECURE]...', 'info');
      }, 800);
      
      setTimeout(() => {
        statusText.innerHTML = '<span class="status-dot" style="background-color:#34d399; animation: pulse-dot 1.5s infinite;"></span> SCANNING';
        statusText.style.color = '#34d399';
        addLogRow('Đang quét lịch sử biến động số dư tài khoản thụ hưởng: 0979324949 (VO HUU TRI)...', 'info');
      }, 1600);
      
      setTimeout(() => {
        addLogRow(`Đang kiểm tra giao dịch chuyển khoản trị giá ${amount.toLocaleString('vi-VN')} đ với nội dung khớp cú pháp: SMM ${username.toUpperCase()}`, 'warn');
      }, 2400);
      
      setTimeout(() => {
        addLogRow('PHÁT HIỆN GIAO DỊCH KHỚP LỆNH HOÀN TOÀN!', 'success');
        addLogRow(`Nhận thành công +${amount.toLocaleString('vi-VN')} đ từ tài khoản đối tác liên kết.`, 'success');
      }, 3200);
      
      setTimeout(() => {
        addLogRow('Tiến hành ghi nhận số dư mới vào cơ sở dữ liệu hệ thống...', 'info');
        
        // Play retro chime sound
        playDepositSound();
        
        // Play synthesized voice message
        speakNotification(`Nạp tiền thành công! Đã cộng thêm ${amount} đồng vào tài khoản của bạn.`);
        
        // Credit SMM user balance in localstorage
        let users = JSON.parse(localStorage.getItem('smm_users')) || [];
        const idx = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
        if (idx !== -1) {
          users[idx].balance += amount;
          currentUser.balance = users[idx].balance;
          localStorage.setItem('smm_users', JSON.stringify(users));
          localStorage.setItem('smm_current_user', JSON.stringify(currentUser));
          updateUIForLogin();
        }
        
        // Fireworks!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#06b6d4', '#10b981', '#ec4899']
        });
      }, 4000);
      
      setTimeout(() => {
        addLogRow(`Đồng bộ dữ liệu thành công! Số dư tài khoản hiện tại: ${currentUser.balance.toLocaleString('vi-VN')} đ.`, 'success');
      }, 4800);
      
      setTimeout(() => {
        statusText.innerHTML = '<span class="status-dot" style="background-color:#64748b;"></span> DISCONNECTED';
        statusText.style.color = '#64748b';
        addLogRow('Cổng kết nối BIDV API đã đóng an toàn.', 'info');
      }, 5400);
      
      setTimeout(() => {
        // Reset console state and hide it
        consoleEl.style.display = 'none';
        
        // Restore buttons
        if (submitBtn) {
          submitBtn.style.opacity = '1';
          submitBtn.style.pointerEvents = 'auto';
        }
        amountBtns.forEach(btn => {
          btn.style.pointerEvents = 'auto';
          btn.style.opacity = '1';
        });
        if (closeBtn) {
          closeBtn.style.pointerEvents = 'auto';
          closeBtn.style.opacity = '1';
        }
        
        isScanning = false;
        closeDepositModal();
        
        Swal.fire({
          icon: 'success',
          title: 'Nạp tiền thành công!',
          html: `Hệ thống VietQR nhận diện thành công giao dịch.<br>Đã cộng thêm <strong>+${amount.toLocaleString('vi-VN')} đ</strong> vào số dư tài khoản của bạn!`,
          confirmButtonText: 'Tuyệt vời',
          confirmButtonColor: '#10b981'
        });
      }, 6200);
    }

    function addBalanceSim(amount) {
      if (!currentUser) return;
      
      let users = JSON.parse(localStorage.getItem('smm_users')) || [];
      const idx = users.findIndex(u => u.username.toLowerCase() === currentUser.username.toLowerCase());
      if (idx !== -1) {
        users[idx].balance += amount;
        currentUser.balance = users[idx].balance;
        localStorage.setItem('smm_users', JSON.stringify(users));
        localStorage.setItem('smm_current_user', JSON.stringify(currentUser));
        updateUIForLogin();

        Swal.fire({
          icon: 'success',
          title: 'Nạp tiền thành công!',
          text: `Hệ thống VietQR nhận diện thành công giao dịch. Đã cộng thêm +${amount.toLocaleString('vi-VN')} đ vào tài khoản của bạn!`,
          confirmButtonText: 'Tuyệt vời'
        });
      }
    }

    function resetSimBalance() {
      userDropdown.style.display = 'none';
      if (!currentUser) return;
      addBalanceSim(50000);
    }

    /* ─── Form Submission Handling (with Telegram API Integration) ─── */
    function handleFormSubmit(e) {
      e.preventDefault();
      
      if (!currentUser) {
        Swal.fire({
          icon: 'warning',
          title: 'Yêu cầu đăng nhập',
          text: 'Vui lòng đăng nhập hoặc đăng ký tài khoản dùng thử để thực hiện đặt hàng!',
          showCancelButton: true,
          confirmButtonText: 'Đăng nhập ngay',
          cancelButtonText: 'Đóng'
        }).then((result) => {
          if (result.isConfirmed) {
            openAuthModal('login');
          }
        });
        return;
      }

      const link = linkInput.value.trim();
      const qty = parseInt(quantityInput.value);
      const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
      
      if (!link) {
        Swal.fire({
          icon: 'warning',
          title: 'Thiếu thông tin',
          text: 'Vui lòng nhập liên kết cần chạy dịch vụ!'
        });
        return;
      }

      // Check balance
      if (currentUser.balance < tempCost) {
        Swal.fire({
          icon: 'error',
          title: 'Số dư không đủ',
          html: `
            Số dư tài khoản: <strong>${currentUser.balance.toLocaleString('vi-VN')} đ</strong><br>
            Tổng thanh toán: <strong style="color:var(--primary)">${tempCost.toLocaleString('vi-VN')} đ</strong><br><br>
            Vui lòng nạp thêm tiền để tiếp tục đặt hàng!
          `,
          showCancelButton: true,
          confirmButtonText: 'Nạp thêm tiền',
          cancelButtonText: 'Đóng',
          confirmButtonColor: '#10b981'
        }).then((result) => {
          if (result.isConfirmed) {
            openDepositModal();
          }
        });
        return;
      }

      // Deduct balance and update local database
      let users = JSON.parse(localStorage.getItem('smm_users')) || [];
      const idx = users.findIndex(u => u.username.toLowerCase() === currentUser.username.toLowerCase());
      if (idx !== -1) {
        users[idx].balance -= tempCost;
        currentUser.balance = users[idx].balance;
        localStorage.setItem('smm_users', JSON.stringify(users));
        localStorage.setItem('smm_current_user', JSON.stringify(currentUser));
        updateUIForLogin();

        // ─── Instant Telegram Webhook Dispatcher ───
        const telegramMessage = `
🔔 ĐƠN HÀNG SMM MỚI:
👤 Người mua: ${currentUser.username} (${currentUser.email})
📦 Dịch vụ: ${serviceText}
🔗 Link chạy: ${link}
🔢 Số lượng: ${qty.toLocaleString('vi-VN')}
💰 Tổng tiền: ${tempCost.toLocaleString('vi-VN')} đ
💵 Số dư còn lại: ${currentUser.balance.toLocaleString('vi-VN')} đ
⏱ Thời gian: ${new Date().toLocaleString('vi-VN')}
        `.trim();

        // Send actual HTTP POST directly to the owner's Telegram channel/bot chat!
        fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: CONFIG.TELEGRAM_CHAT_ID,
            text: telegramMessage
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log('Telegram dispatch success:', data);
        })
        .catch(err => {
          console.error('Telegram dispatch error:', err);
        });

        // Trigger a gorgeous confetti burst!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#06b6d4', '#10b981', '#ec4899']
        });

        // Show elegant order success Alert
        Swal.fire({
          icon: 'success',
          title: '🎉 Đặt hàng thành công!',
          html: `
            <div style="text-align: left;">
              <p>Đơn hàng đã được ghi nhận trên hệ thống và gửi thông tin trực tiếp tới Admin để kích hoạt chạy:</p>
              <hr style="margin: 8px 0; border:0; border-top:1px solid var(--border)">
              <ul>
                <li><strong>Dịch vụ:</strong> ${serviceText}</li>
                <li><strong>Số lượng:</strong> ${qty.toLocaleString('vi-VN')}</li>
                <li><strong>Đã trừ:</strong> -${tempCost.toLocaleString('vi-VN')} đ</li>
                <li><strong>Số dư còn lại:</strong> ${currentUser.balance.toLocaleString('vi-VN')} đ</li>
              </ul>
              <br>
              <p style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 10px; font-size: 0.85rem;">
                ⚡ <strong>Thông báo:</strong> Đơn hàng đã được báo cáo qua Telegram. Bạn có thể kiểm tra hoặc liên hệ hỗ trợ trực tiếp tại Telegram: <a href="${CONFIG.TELEGRAM_ADMIN_URL}" target="_blank">@thanhbinhdev</a>.
              </p>
            </div>
          `,
          confirmButtonText: 'Đồng ý'
        });
      }
    }

    /* ─── Light / Dark Theme Toggle ─── */
    const themeBtn = document.getElementById('theme-btn');
    function initTheme() {
      const stored = localStorage.getItem('smm-theme') || 'dark';
      document.documentElement.setAttribute('data-theme', stored);
      updateThemeIcon(stored);
    }

    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const target = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', target);
      localStorage.setItem('smm-theme', target);
      updateThemeIcon(target);
    });

    function updateThemeIcon(theme) {
      if (theme === 'dark') {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
    }

    /* ─── Interactive Mouse Follow Glow ─── */
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });

    /* ─── Dynamic 3D Three.js Background ─── */
    let scene, camera, renderer, particles;
    let targetX = 0, targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function initThreeJS() {
      const container = document.getElementById('three-bg-container');
      if (!container) return;

      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
      camera.position.z = 1000;

      // Geometry
      const geometry = new THREE.BufferGeometry();
      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 150 : 400;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorPalette = [
        new THREE.Color('#8b5cf6'), // Primary violet
        new THREE.Color('#06b6d4'), // Secondary cyan
        new THREE.Color('#4f46e5'), // Indigo
        new THREE.Color('#a78bfa'), // Light violet
        new THREE.Color('#22d3ee')  // Light cyan
      ];

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

        const clr = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = clr.r;
        colors[i * 3 + 1] = clr.g;
        colors[i * 3 + 2] = clr.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Circular glow texture
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.2)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
      const texture = new THREE.CanvasTexture(canvas);

      const material = new THREE.PointsMaterial({
        size: 8,
        map: texture,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      particles = new THREE.Points(geometry, material);
      
      // Create constellation lines connecting close particles
      const linePositions = [];
      const lineColors = [];
      const threshold = isMobile ? 220 : 180; // Distance threshold for connection
      
      for (let i = 0; i < particleCount; i++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];
        const r1 = colors[i * 3];
        const g1 = colors[i * 3 + 1];
        const b1 = colors[i * 3 + 2];
        
        for (let j = i + 1; j < particleCount; j++) {
          const x2 = positions[j * 3];
          const y2 = positions[j * 3 + 1];
          const z2 = positions[j * 3 + 2];
          
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < threshold) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
            
            const r2 = colors[j * 3];
            const g2 = colors[j * 3 + 1];
            const b2 = colors[j * 3 + 2];
            
            const alpha = (1.0 - (dist / threshold)) * 0.45; // opacity based on distance
            lineColors.push(r1 * alpha, g1 * alpha, b1 * alpha);
            lineColors.push(r2 * alpha, g2 * alpha, b2 * alpha);
          }
        }
      }
      
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      particles.add(lineSegments);
      
      scene.add(particles);

      // WebGL Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // Event listeners
      document.addEventListener('mousemove', onThreeMouseMove);
      window.addEventListener('resize', onThreeWindowResize);
    }

    function onThreeMouseMove(event) {
      targetX = (event.clientX - windowHalfX) * 0.25;
      targetY = (event.clientY - windowHalfY) * 0.25;
    }

    function onThreeWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let lastTime = 0;
    function animateThree(time = 0) {
      requestAnimationFrame(animateThree);

      const delta = time - lastTime;
      const speedMultiplier = lastTime === 0 ? 1 : Math.min(delta / 16.67, 4);
      lastTime = time;

      if (particles) {
        particles.rotation.y += 0.0008 * speedMultiplier;
        particles.rotation.x += 0.0004 * speedMultiplier;
      }

      camera.position.x += (targetX - camera.position.x) * 0.05 * speedMultiplier;
      camera.position.y += (-targetY - camera.position.y) * 0.05 * speedMultiplier;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    /* ─── Dynamic Typewriter Effect for Hero Description ─── */
    const typedTextSpan = document.getElementById("typed-text");
    const textArray = [
      "tăng like Facebook tự động, an toàn.",
      "tăng follow TikTok siêu tốc, giá rẻ.",
      "tăng view Youtube chất lượng cao.",
      "tăng thành viên Telegram nhanh chóng.",
      "tăng lượt nghe Spotify uy tín."
    ];
    let arrayIndex = 0;
    let charIndex = 0;
    const typingSpeed = 75;
    const erasingSpeed = 40;
    const newTextDelay = 2000;

    function typeText() {
      if (charIndex < textArray[arrayIndex].length) {
        typedTextSpan.textContent += textArray[arrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setTimeout(eraseText, newTextDelay);
      }
    }

    function eraseText() {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[arrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, erasingSpeed);
      } else {
        arrayIndex++;
        if (arrayIndex >= textArray.length) arrayIndex = 0;
        setTimeout(typeText, typingSpeed + 100);
      }
    }

    /* ─── Social Proof Live Purchase Toasts ─── */
    const purchaseToast = document.getElementById("purchase-toast");
    const purchaseToastText = document.getElementById("purchase-toast-text");
    
    const randomPurchases = [
      { name: "hieu_tri***", item: "1.000 Follow TikTok", price: "25.000đ" },
      { name: "nguyen_an***", item: "200 Like Instagram", price: "400đ" },
      { name: "quang_huy***", item: "nạp thành công 100.000đ", price: "" },
      { name: "minh_thu***", item: "500 Member Telegram", price: "19.500đ" },
      { name: "thanh_binh***", item: "2.000 View Youtube Shorts", price: "24.000đ" },
      { name: "user_test***", item: "nạp thành công 50.000đ", price: "" },
      { name: "tran_dat***", item: "5.000 View TikTok [Siêu Tốc]", price: "750đ" }
    ];

    function showRandomPurchaseToast() {
      const item = randomPurchases[Math.floor(Math.random() * randomPurchases.length)];
      if (item.price) {
        purchaseToastText.innerHTML = `Khách hàng <strong>${item.name}</strong> vừa mua <strong>${item.item}</strong> (${item.price})`;
      } else {
        purchaseToastText.innerHTML = `Khách hàng <strong>${item.name}</strong> vừa <strong>${item.item}</strong>`;
      }
      
      purchaseToast.classList.add("show");
      
      setTimeout(() => {
        purchaseToast.classList.remove("show");
      }, 4000);
    }

    // Loop toasts every 12 to 18 seconds
    setInterval(showRandomPurchaseToast, 14000);
    setTimeout(showRandomPurchaseToast, 3000); // Initial delay

    // Launch!
    window.addEventListener('DOMContentLoaded', init);
  