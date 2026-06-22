// js/app.js

let currentUser = null;
let servicesData = {};

// --- TOAST NOTIFICATION SYSTEM ---
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') icon = '<i class="fa-solid fa-circle-check text-xl"></i>';
    else if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation text-xl"></i>';
    else icon = '<i class="fa-solid fa-circle-info text-xl"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Kiểm tra session
    const userData = localStorage.getItem('smm_user_auth');
    if (!userData && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
        return;
    }
    
    if (userData) {
        currentUser = JSON.parse(userData);
        await syncUser();
        updateUserUI();
    }

    if (document.getElementById('category')) {
        await fetchServices();
        document.getElementById('category').addEventListener('change', loadServicesToUI);
        document.getElementById('service').addEventListener('change', calculatePrice);
        document.getElementById('quantity').addEventListener('input', calculatePrice);
        
        document.getElementById('orderForm').addEventListener('submit', placeOrder);
        document.getElementById('logoutBtn').addEventListener('click', () => {
            localStorage.removeItem('smm_user_auth');
            window.location.href = 'index.html';
        });
        
        await fetchOrders();
        
        // Hiện Admin Menu nếu là Admin
        if (currentUser && currentUser.role === 'admin') {
            document.getElementById('adminMenu').classList.remove('hidden');
            await loadAdminData();
        }
    }
});

// Sync User Balance từ Server
async function syncUser() {
    try {
        const res = await fetch(`/api/user/${currentUser.id}`);
        const data = await res.json();
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('smm_user_auth', JSON.stringify(currentUser));
            
            // Cập nhật User Stats
            if (document.getElementById('statTotalOrders')) {
                document.getElementById('statTotalOrders').textContent = new Intl.NumberFormat('vi-VN').format(data.stats.totalOrders);
                document.getElementById('statTotalSpent').textContent = new Intl.NumberFormat('vi-VN').format(data.stats.totalSpent) + ' ₫';
            }
        }
    } catch(e) {
        console.error("Sync error", e);
    }
}

async function fetchServices() {
    try {
        const res = await fetch('/api/services');
        const data = await res.json();
        if (data.success) {
            servicesData = data.services;
            loadServicesToUI();
        }
    } catch(e) {}
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(el => {
        el.classList.remove('block');
        el.classList.add('hidden');
    });
    const target = document.getElementById(sectionId + '-section');
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('block');
    }
    
    if (sectionId === 'admin-panel') {
        loadAdminData();
    }
}

function updateUserUI() {
    const balanceEl = document.getElementById('userBalance');
    if (balanceEl) balanceEl.textContent = new Intl.NumberFormat('vi-VN').format(currentUser.balance) + ' ₫';
    
    const syntaxEl = document.getElementById('transferSyntax');
    if (syntaxEl) syntaxEl.textContent = 'NAPTIEN ' + currentUser.username.toUpperCase();
    
    const sidebarName = document.getElementById('sidebarUsername');
    if (sidebarName) sidebarName.textContent = currentUser.username;
    
    const sidebarRole = document.getElementById('sidebarRole');
    if (sidebarRole) {
        sidebarRole.textContent = currentUser.role === 'admin' ? 'Super Admin' : 'Member';
        if (currentUser.role === 'admin') sidebarRole.classList.add('text-red-400');
    }
}

function loadServicesToUI() {
    const category = document.getElementById('category').value;
    const serviceSelect = document.getElementById('service');
    serviceSelect.innerHTML = '';
    
    if(!servicesData[category]) return;

    servicesData[category].forEach(srv => {
        const option = document.createElement('option');
        option.value = srv.id;
        option.textContent = srv.name;
        option.dataset.price = srv.price;
        serviceSelect.appendChild(option);
    });
    
    calculatePrice();
}

function calculatePrice() {
    const serviceSelect = document.getElementById('service');
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    if (!selectedOption) return;
    
    const pricePer1k = parseFloat(selectedOption.dataset.price);
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
    document.getElementById('serviceDesc').textContent = `Giá: ${new Intl.NumberFormat('vi-VN').format(pricePer1k)}₫ / 1000 lượt`;
    const total = (pricePer1k / 1000) * quantity;
    document.getElementById('totalCharge').textContent = new Intl.NumberFormat('vi-VN').format(total) + ' ₫';
    document.getElementById('orderForm').dataset.currentTotal = total;
}

// Xử lý nút Đặt Hàng kèm hiệu ứng Loading
async function placeOrder(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    const link = document.getElementById('link').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalCharge = parseFloat(document.getElementById('orderForm').dataset.currentTotal);
    const serviceSelect = document.getElementById('service');
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Đang xử lý...';
    btn.disabled = true;

    try {
        const res = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser.id,
                serviceName, link, quantity, charge: totalCharge
            })
        });
        const data = await res.json();
        
        if (data.success) {
            currentUser.balance = data.newBalance;
            localStorage.setItem('smm_user_auth', JSON.stringify(currentUser));
            updateUserUI();
            
            document.getElementById('orderForm').reset();
            calculatePrice();
            
            showToast('Đặt hàng thành công! Đơn đã gửi sang hệ thống.', 'success');
            await fetchOrders();
            await syncUser();
            showSection('orders');
        } else {
            showToast('Lỗi: ' + data.message, 'error');
        }
    } catch(err) {
        showToast('Lỗi kết nối máy chủ!', 'error');
    }
    
    btn.innerHTML = originalText;
    btn.disabled = false;
}

function getStatusBadge(status) {
    switch(status) {
        case 'Pending': return '<span class="bg-yellow-900/50 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full border border-yellow-700"><i class="fa-solid fa-clock mr-1"></i>Pending</span>';
        case 'Processing': return '<span class="bg-blue-900/50 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-700"><i class="fa-solid fa-spinner fa-spin mr-1"></i>Processing</span>';
        case 'Completed': return '<span class="bg-green-900/50 text-green-300 text-xs font-bold px-3 py-1 rounded-full border border-green-700"><i class="fa-solid fa-check mr-1"></i>Completed</span>';
        case 'Canceled': return '<span class="bg-red-900/50 text-red-300 text-xs font-bold px-3 py-1 rounded-full border border-red-700"><i class="fa-solid fa-xmark mr-1"></i>Canceled</span>';
        default: return `<span class="bg-gray-700 text-white text-xs px-2 py-1 rounded">${status}</span>`;
    }
}

async function fetchOrders() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500"><i class="fa-solid fa-spinner fa-spin mr-2 text-2xl"></i></td></tr>';

    try {
        const res = await fetch(`/api/orders/${currentUser.id}`);
        const data = await res.json();
        if (data.success) {
            renderOrders(data.orders, tbody, false);
        }
    } catch (e) {
        tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-red-500">Lỗi tải dữ liệu</td></tr>';
    }
}

function renderOrders(orders, tbody, isAdmin) {
    tbody.innerHTML = '';
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">Chưa có đơn hàng nào</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-white/5 transition-colors group';
        
        if (isAdmin) {
            tr.innerHTML = `
                <td class="px-4 py-3 font-mono text-xs text-gray-400">#${order.id}</td>
                <td class="px-4 py-3 font-mono text-blue-400">UID: ${order.userId}</td>
                <td class="px-4 py-3 font-semibold text-white">${order.serviceName}</td>
                <td class="px-4 py-3 text-green-400 font-bold">+${new Intl.NumberFormat('vi-VN').format(order.charge)}₫</td>
                <td class="px-4 py-3 text-yellow-400 font-bold">+${new Intl.NumberFormat('vi-VN').format(order.profit || 0)}₫</td>
                <td class="px-4 py-3 text-center">
                    <select onchange="updateOrderStatus(${order.id}, this.value)" class="bg-gray-800 text-xs border border-gray-600 rounded p-1 outline-none cursor-pointer">
                        <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                        <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Canceled" ${order.status === 'Canceled' ? 'selected' : ''}>Canceled</option>
                    </select>
                </td>
            `;
        } else {
            tr.innerHTML = `
                <td class="px-6 py-4 font-mono text-xs text-gray-400">#${order.id}</td>
                <td class="px-6 py-4 font-semibold text-white">${order.serviceName}</td>
                <td class="px-6 py-4 truncate max-w-xs"><a href="${order.link}" target="_blank" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors">${order.link}</a></td>
                <td class="px-6 py-4 font-mono">${new Intl.NumberFormat('vi-VN').format(order.quantity)}</td>
                <td class="px-6 py-4 text-green-400 font-bold">${new Intl.NumberFormat('vi-VN').format(order.charge)}₫</td>
                <td class="px-6 py-4">${getStatusBadge(order.status)}</td>
            `;
        }
        tbody.appendChild(tr);
    });
}

// === ADMIN FUNCTIONS ===
async function loadAdminData() {
    if (currentUser.role !== 'admin') return;
    
    // Load Stats
    try {
        const resStats = await fetch('/api/admin/stats');
        const dataStats = await resStats.json();
        if (dataStats.success) {
            document.getElementById('adminTotalUsers').textContent = new Intl.NumberFormat('vi-VN').format(dataStats.stats.totalUsers);
            document.getElementById('adminTotalRevenue').textContent = new Intl.NumberFormat('vi-VN').format(dataStats.stats.totalRevenue) + ' ₫';
            document.getElementById('adminTotalProfit').textContent = new Intl.NumberFormat('vi-VN').format(dataStats.stats.totalProfit) + ' ₫';
            document.getElementById('adminPendingOrders').textContent = new Intl.NumberFormat('vi-VN').format(dataStats.stats.pendingOrders);
        }
        
        // Load Orders
        const tbody = document.getElementById('adminOrdersTableBody');
        const resOrders = await fetch('/api/admin/orders');
        const dataOrders = await resOrders.json();
        if (dataOrders.success) {
            renderOrders(dataOrders.orders, tbody, true);
        }
    } catch(e) {
        showToast('Lỗi tải dữ liệu Admin', 'error');
    }
}

async function updateOrderStatus(orderId, newStatus) {
    try {
        const res = await fetch('/api/admin/order/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId, newStatus })
        });
        const data = await res.json();
        if (data.success) {
            showToast('Đã cập nhật trạng thái đơn hàng!', 'success');
            loadAdminData(); // Refresh admin orders
            fetchOrders();   // Refresh user orders
        } else {
            showToast('Lỗi: ' + data.message, 'error');
        }
    } catch(e) {
        showToast('Lỗi kết nối máy chủ!', 'error');
    }
}

function copySyntax() {
    const text = document.getElementById('transferSyntax').innerText;
    navigator.clipboard.writeText(text);
    showToast('Đã copy nội dung chuyển khoản!', 'success');
}
