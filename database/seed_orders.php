<?php
/**
 * seed_orders.php - Tạo dữ liệu mẫu đơn hàng cho GearVN
 * Chạy: php seed_orders.php  hoặc  http://localhost:8080/seed_orders.php
 */
header('Content-Type: text/html; charset=utf-8');
require_once 'app/config/database.php';

$db = (new Database())->getConnection();

echo "<pre style='font-family:monospace; padding:20px; background:#111; color:#0f0;'>\n";
echo "=== GearVN - Seed Orders & Users ===\n\n";

try {
    $db->beginTransaction();

    // ─── 1. Tạo users mẫu ──────────────────────────────────────────
    $users = [
        ['Nguyen Van An',    'an.nguyen@email.com',   'pass123'],
        ['Tran Thi Bich',    'bich.tran@email.com',   'pass123'],
        ['Le Van Cuong',     'cuong.le@email.com',    'pass123'],
        ['Pham Thi Dung',    'dung.pham@email.com',   'pass123'],
    ];

    $userIds = [];
    $stmtUser = $db->prepare("INSERT IGNORE INTO users (name, email, password) VALUES (:name, :email, :pass)");
    foreach ($users as $u) {
        $hashed = password_hash($u[2], PASSWORD_BCRYPT);
        $stmtUser->execute([':name' => $u[0], ':email' => $u[1], ':pass' => $hashed]);
    }

    // Lấy IDs của users vừa tạo (hoặc đã tồn tại)
    $stmtGetUsers = $db->prepare("SELECT id FROM users WHERE email IN (?,?,?,?) ORDER BY id");
    $stmtGetUsers->execute(array_column($users, 1));
    $userIds = $stmtGetUsers->fetchAll(PDO::FETCH_COLUMN);

    echo "✅ Users: " . count($userIds) . " tài khoản sẵn sàng\n";

    // ─── 2. Lấy danh sách sản phẩm ────────────────────────────────
    $products = $db->query("SELECT id, name, price FROM product LIMIT 9")->fetchAll(PDO::FETCH_ASSOC);
    if (empty($products)) {
        echo "❌ Không có sản phẩm trong DB! Chạy setup_db.php trước.\n";
        exit;
    }
    echo "📦 Sản phẩm: " . count($products) . " sản phẩm trong DB\n\n";

    // ─── 3. Dữ liệu đơn hàng mẫu ──────────────────────────────────
    $orders_data = [
        [
            'user_idx'   => 0,
            'phone'      => '0901234567',
            'address'    => '123 Nguyen Hue, Q1, TP.HCM',
            'status'     => 'completed',
            'payment'    => 'banking',
            'items'      => [[0, 1], [1, 2]], // [product_index, quantity]
        ],
        [
            'user_idx'   => 1,
            'phone'      => '0912345678',
            'address'    => '456 Le Loi, Q3, TP.HCM',
            'status'     => 'shipping',
            'payment'    => 'cod',
            'items'      => [[2, 1], [4, 1]],
        ],
        [
            'user_idx'   => 2,
            'phone'      => '0923456789',
            'address'    => '789 Tran Hung Dao, Q5, TP.HCM',
            'status'     => 'confirmed',
            'payment'    => 'banking',
            'items'      => [[5, 2], [6, 1], [7, 3]],
        ],
        [
            'user_idx'   => 3,
            'phone'      => '0934567890',
            'address'    => '321 Hoang Dieu, Q4, TP.HCM',
            'status'     => 'pending',
            'payment'    => 'cod',
            'items'      => [[3, 1]],
        ],
        [
            'user_idx'   => 0,
            'phone'      => '0901234567',
            'address'    => '123 Nguyen Hue, Q1, TP.HCM',
            'status'     => 'cancelled',
            'payment'    => 'cod',
            'items'      => [[8, 1], [0, 2]],
        ],
        [
            'user_idx'   => 1,
            'phone'      => '0912345678',
            'address'    => '456 Le Loi, Q3, TP.HCM',
            'status'     => 'completed',
            'payment'    => 'banking',
            'items'      => [[1, 1], [2, 1], [3, 1]],
        ],
    ];

    $stmtOrder = $db->prepare("
        INSERT INTO orders (user_id, total_price, status, shipping_address, phone, payment_method, discount_amount)
        VALUES (:uid, :total, :status, :addr, :phone, :payment, 0)
    ");
    $stmtDetail = $db->prepare("
        INSERT INTO order_details (order_id, product_id, quantity, price)
        VALUES (:oid, :pid, :qty, :price)
    ");

    $seeded = 0;
    foreach ($orders_data as $od) {
        $uid = $userIds[$od['user_idx'] % count($userIds)];

        // Tính tổng tiền
        $total = 0;
        $validItems = [];
        foreach ($od['items'] as [$pidx, $qty]) {
            if (isset($products[$pidx])) {
                $price  = floatval($products[$pidx]['price']);
                $total += $price * $qty;
                $validItems[] = ['pid' => $products[$pidx]['id'], 'qty' => $qty, 'price' => $price];
            }
        }

        $stmtOrder->execute([
            ':uid'     => $uid,
            ':total'   => $total,
            ':status'  => $od['status'],
            ':addr'    => $od['address'],
            ':phone'   => $od['phone'],
            ':payment' => $od['payment'],
        ]);
        $orderId = $db->lastInsertId();

        foreach ($validItems as $item) {
            $stmtDetail->execute([
                ':oid'   => $orderId,
                ':pid'   => $item['pid'],
                ':qty'   => $item['qty'],
                ':price' => $item['price'],
            ]);
        }

        $formatted = number_format($total, 0, ',', '.');
        echo "  ✅ Đơn hàng #{$orderId} | {$od['status']} | {$od['payment']} | {$formatted} VNĐ\n";
        $seeded++;
    }

    $db->commit();

    echo "\n=== ✅ Hoàn thành! Đã seed {$seeded} đơn hàng ===\n";
    echo "\n📌 Kiểm tra tại:\n";
    echo "   http://localhost:8080/index.php?url=api/orders\n";
    echo "   http://localhost:8080/index.php?url=api/orderDetail/1\n";
    echo "   http://localhost:8080/index.php?url=api/stats\n";

} catch (Exception $e) {
    $db->rollBack();
    echo "❌ Lỗi: " . $e->getMessage() . "\n";
}

echo "\n</pre>";
