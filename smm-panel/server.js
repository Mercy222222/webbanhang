const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

// Helper đọc Ghi CSDL
function readDB() {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
    // 1. CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // 2. API Routes
    if (req.url.startsWith('/api/')) {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const db = readDB();
            let responseData = null;
            let statusCode = 200;

            try {
                const parsedBody = body ? JSON.parse(body) : {};

                // Đăng nhập
                if (req.url === '/api/login' && req.method === 'POST') {
                    const { username, password } = parsedBody;
                    const user = db.users.find(u => u.username === username && u.password === password);
                    if (user) {
                        responseData = { success: true, user: { id: user.id, username: user.username, balance: user.balance } };
                    } else {
                        // Tự động tạo tài khoản nếu chưa có (Demo)
                        const newUser = { id: Date.now(), username, password, balance: 500000, role: 'member' };
                        db.users.push(newUser);
                        writeDB(db);
                        responseData = { success: true, user: { id: newUser.id, username, balance: newUser.balance }, message: "Auto-registered" };
                    }
                }
                
                // Lấy thông tin user (Nâng cấp thêm Thống kê)
                else if (req.url.startsWith('/api/user/') && req.method === 'GET') {
                    const userId = parseInt(req.url.split('/').pop());
                    const user = db.users.find(u => u.id === userId);
                    if (user) {
                        const userOrders = db.orders.filter(o => o.userId === userId);
                        const totalSpent = userOrders.reduce((sum, o) => sum + o.charge, 0);
                        responseData = { 
                            success: true, 
                            user: { id: user.id, username: user.username, balance: user.balance, role: user.role },
                            stats: { totalOrders: userOrders.length, totalSpent }
                        };
                    } else {
                        responseData = { success: false };
                    }
                }

                // Lấy danh sách dịch vụ
                else if (req.url === '/api/services' && req.method === 'GET') {
                    responseData = { success: true, services: db.services };
                }

                // Lấy danh sách đơn hàng User
                else if (req.url.startsWith('/api/orders/') && req.method === 'GET') {
                    const userId = parseInt(req.url.split('/').pop());
                    const orders = db.orders.filter(o => o.userId === userId).reverse();
                    responseData = { success: true, orders };
                }
                
                // --- ADMIN API ---
                // Lấy Thống kê Hệ thống
                else if (req.url === '/api/admin/stats' && req.method === 'GET') {
                    const totalUsers = db.users.length;
                    const totalRevenue = db.orders.reduce((sum, o) => sum + (o.charge || 0), 0);
                    const totalProfit = db.orders.reduce((sum, o) => sum + (o.profit || 0), 0);
                    const pendingOrders = db.orders.filter(o => o.status === 'Processing').length;
                    
                    responseData = { 
                        success: true, 
                        stats: { totalUsers, totalRevenue, totalProfit, pendingOrders } 
                    };
                }
                // Lấy tất cả Đơn hàng
                else if (req.url === '/api/admin/orders' && req.method === 'GET') {
                    responseData = { success: true, orders: db.orders.reverse() };
                }
                // Đổi trạng thái Đơn hàng
                else if (req.url === '/api/admin/order/status' && req.method === 'POST') {
                    const { orderId, newStatus } = parsedBody;
                    const order = db.orders.find(o => o.id === orderId);
                    if (order) {
                        order.status = newStatus;
                        writeDB(db);
                        responseData = { success: true, message: "Cập nhật thành công!" };
                    } else {
                        statusCode = 404;
                        responseData = { success: false, message: "Order not found" };
                    }
                }

                // Đặt đơn hàng
                else if (req.url === '/api/order' && req.method === 'POST') {
                    const { userId, serviceName, link, quantity, charge } = parsedBody;
                    const userIndex = db.users.findIndex(u => u.id === userId);
                    
                    if (userIndex !== -1 && db.users[userIndex].balance >= charge) {
                        
                        // Tìm giá gốc của dịch vụ để tính lợi nhuận
                        let originalPrice = 0;
                        for (const cat in db.services) {
                            const srv = db.services[cat].find(s => s.name === serviceName);
                            if (srv) {
                                originalPrice = srv.originalPrice;
                                break;
                            }
                        }
                        
                        const totalOriginalCost = (originalPrice / 1000) * quantity;
                        const profit = charge - totalOriginalCost;
                        
                        // Trừ tiền nội bộ
                        db.users[userIndex].balance -= charge;
                        
                        // ===== TÍCH HỢP GỌI API ĐẾN NHÀ CUNG CẤP GỐC (MAIN PROVIDER) =====
                        const PROVIDER_API_URL = 'https://example-smm-provider.com/api/v2';
                        const API_KEY = 'YOUR_SECRET_API_KEY';
                        
                        // Thông thường các panel dùng chuẩn API v2 chung:
                        const apiPayload = JSON.stringify({
                            key: API_KEY,
                            action: 'add',
                            service: 1, 
                            link: link,
                            quantity: quantity
                        });

                        // Sếp yêu cầu "thứ free": Cắm tạm vào Free Mock API (reqres.in)
                        // API này sẽ trả về 201 Created để giả lập việc gọi Main Provider thành công.
                        const options = {
                            hostname: 'reqres.in',
                            port: 443,
                            path: '/api/users',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': Buffer.byteLength(apiPayload)
                            }
                        };

                        const reqProvider = https.request(options, (resProvider) => {
                            let data = '';
                            resProvider.on('data', chunk => data += chunk);
                            resProvider.on('end', () => {
                                console.log('[Server] Gửi API thành công tới nhà cung cấp! Phản hồi:', data);
                                // Trong thực tế, sếp sẽ lấy Provider Order ID ở đây.
                            });
                        });
                        reqProvider.on('error', (e) => console.error('[Server] Lỗi kết nối API Provider:', e));
                        reqProvider.write(apiPayload);
                        reqProvider.end();

                        // Tạo đơn nội bộ kèm thông tin Lợi nhuận
                        const newOrder = {
                            id: Math.floor(Math.random() * 1000000),
                            userId,
                            serviceName,
                            link,
                            quantity,
                            charge,
                            originalCost: totalOriginalCost,
                            profit: profit, // Thêm trường Profit để Admin quản lý
                            status: 'Processing',
                            createdAt: new Date().toISOString()
                        };
                        db.orders.push(newOrder);
                        writeDB(db);
                        
                        responseData = { success: true, newBalance: db.users[userIndex].balance, order: newOrder };
                    } else {
                        statusCode = 400;
                        responseData = { success: false, message: "Số dư không đủ hoặc User không tồn tại" };
                    }
                } else {
                    statusCode = 404;
                    responseData = { success: false, message: "API endpoint not found" };
                }
            } catch (err) {
                statusCode = 500;
                responseData = { success: false, message: "Internal Server Error" };
            }

            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(responseData));
        });
        return;
    }

    // 3. Static File Server (Frontend)
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf8');
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 SMM Panel Server is running at http://localhost:${PORT}`);
});
