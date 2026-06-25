// auth.js - Basic authentication using localStorage
// Users are stored as an array of objects: {username, password, name}
// Admin default account: admin / admin123

const AUTH_KEY = 'gearvn_users';
const SESSION_KEY = 'gearvn_current_user';

function loadUsers() {
  const data = localStorage.getItem(AUTH_KEY);
  if (data) return JSON.parse(data);
  // Initialize with admin account if not present
  const admin = [{ username: 'admin', password: 'admin123', name: 'Administrator' }];
  localStorage.setItem(AUTH_KEY, JSON.stringify(admin));
  return admin;
}

function saveUsers(users) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

function getCurrentUser() {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

function setCurrentUser(user) {
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  else localStorage.removeItem(SESSION_KEY);
}

function register(username, password, name) {
  const users = loadUsers();
  if (users.find(u => u.username === username)) return { success: false, msg: 'Username already exists' };
  users.push({ username, password, name });
  saveUsers(users);
  return { success: true };
}

function login(username, password) {
  const users = loadUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { success: false, msg: 'Invalid credentials' };
  setCurrentUser({ username: user.username, name: user.name });
  return { success: true, user: { username: user.username, name: user.name } };
}

function logout() {
  setCurrentUser(null);
}

// UI helpers – called from HTML
function showAuthModal(mode = 'login') {
  const modal = document.getElementById('auth-modal');
  const title = document.getElementById('auth-modal-title');
  const submitBtn = document.getElementById('auth-submit-btn');
  const toggleLink = document.getElementById('auth-toggle-link');
  document.getElementById('auth-username').value = '';
  document.getElementById('auth-password').value = '';
  document.getElementById('auth-name').value = '';
  if (mode === 'login') {
    title.innerText = 'Đăng nhập';
    submitBtn.innerText = 'Đăng nhập';
    document.getElementById('auth-name-group').classList.add('hidden');
    toggleLink.innerText = "Chưa có tài khoản? Đăng ký";
    toggleLink.dataset.mode = 'register';
  } else {
    title.innerText = 'Đăng ký';
    submitBtn.innerText = 'Đăng ký';
    document.getElementById('auth-name-group').classList.remove('hidden');
    toggleLink.innerText = "Đã có tài khoản? Đăng nhập";
    toggleLink.dataset.mode = 'login';
  }
  modal.classList.remove('hidden');
}

function hideAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.classList.add('hidden');
}

function handleAuthSubmit() {
  const mode = document.getElementById('auth-submit-btn').innerText.toLowerCase();
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value.trim();
  const name = document.getElementById('auth-name').value.trim();
  if (mode === 'đăng nhập') {
    const res = login(username, password);
    if (res.success) {
      updateNavbarAuth();
      hideAuthModal();
      Swal.fire({ icon: 'success', title: 'Đăng nhập thành công', timer: 1500, showConfirmButton: false });
      if (username === 'admin' && typeof switchTab === 'function') {
        switchTab('admin');
      } else if (typeof switchTab === 'function') {
        switchTab('store');
      }
    } else {
      Swal.fire({ icon: 'error', title: 'Lỗi', text: res.msg });
    }
  } else {
    if (!name) { Swal.fire({ icon: 'warning', title: 'Vui lòng nhập họ tên' }); return; }
    const res = register(username, password, name);
    if (res.success) {
      Swal.fire({ icon: 'success', title: 'Đăng ký thành công, vui lòng đăng nhập', timer: 1500, showConfirmButton: false });
      showAuthModal('login');
    } else {
      Swal.fire({ icon: 'error', title: 'Lỗi', text: res.msg });
    }
  }
}

function handleLogout() {
  logout();
  updateNavbarAuth();
  if (typeof switchTab === 'function') {
    switchTab('store');
  }
  if (typeof Swal !== 'undefined') {
    Swal.fire({ icon: 'success', title: 'Đã đăng xuất', timer: 1500, showConfirmButton: false });
  }
}

function updateNavbarAuth() {
  const user = getCurrentUser();
  const nav = document.getElementById('nav-auth-section');
  const adminBtn = document.getElementById('admin-nav-btn');
  if (user) {
    nav.innerHTML = `
      <span class="text-sm font-medium mr-2">Xin chào, ${user.name}</span>
      <button onclick="handleLogout()" class="px-3 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 transition">Đăng xuất</button>
    `;
    if (user.username === 'admin') {
      if (adminBtn) adminBtn.classList.remove('hidden');
    } else {
      if (adminBtn) adminBtn.classList.add('hidden');
    }
  } else {
    nav.innerHTML = `<button onclick="showAuthModal('login');" class="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Đăng nhập / Đăng ký</button>`;
    if (adminBtn) adminBtn.classList.add('hidden');
  }
}

// Initialize auth UI on page load
document.addEventListener('DOMContentLoaded', updateNavbarAuth);

