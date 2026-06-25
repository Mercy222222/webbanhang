<?php include 'app/views/shares/header.php'; ?>

<h2 class="section-title">Hồ sơ cá nhân & Lịch sử đơn hàng</h2>

<div style="display: grid; grid-template-columns: 320px 1fr; gap: 4rem; align-items: flex-start; margin-bottom: 5rem;">
    <!-- Left Panel: User Profile Info -->
    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2.5rem; text-align: center;">
        <i class="fa-solid fa-circle-user" style="font-size: 5rem; color: var(--primary-light); margin-bottom: 1.5rem;"></i>
        <h3 style="color: white; margin: 0 0 0.5rem 0; font-size: 1.5rem; font-weight: 700;"><?= htmlspecialchars($user['name']) ?></h3>
        <span class="status-badge" style="background: rgba(99, 102, 241, 0.1); color: var(--primary-light); margin-bottom: 2rem; display: inline-block;">
            <?= $user['role'] == 'admin' ? 'Quản trị viên' : 'Khách hàng' ?>
        </span>
        
        <div style="border-top: 1px solid var(--border); padding-top: 2rem; text-align: left; display: flex; flex-direction: column; gap: 1.25rem;">
            <div>
                <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Email đăng ký</div>
                <div style="color: white; font-weight: 500; margin-top: 0.25rem; font-size: 0.95rem; word-break: break-all;"><?= htmlspecialchars($user['email']) ?></div>
            </div>
            <div>
                <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Thành viên từ</div>
                <div style="color: white; font-weight: 500; margin-top: 0.25rem; font-size: 0.95rem;"><?= date('d/m/Y', strtotime($user['created_at'])) ?></div>
            </div>
        </div>
    </div>

    <!-- Right Panel: Order History -->
    <div>
        <h3 style="color: white; font-size: 1.5rem; margin-top: 0; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-clock-rotate-left" style="color: var(--primary-light);"></i> Lịch sử đặt hàng (<?= count($orders) ?>)
        </h3>

        <?php if (empty($orders)): ?>
            <div style="text-align: center; padding: 5rem 0; background: var(--surface); border-radius: var(--radius-lg); border: 1px solid var(--border);">
                <i class="fa-solid fa-cart-shopping" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 2rem;"></i>
                <h4 style="color: var(--text-muted); margin: 0;">Bạn chưa đặt đơn hàng nào tại TechStore.</h4>
                <a href="index.php" class="btn btn-primary" style="display: inline-block; margin-top: 2rem; padding: 0.75rem 2rem;">Mua sắm ngay</a>
            </div>
        <?php else: ?>
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <?php foreach ($orders as $order): ?>
                    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden;">
                        <!-- Order Header -->
                        <div style="padding: 1.5rem 2rem; background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                            <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                                <div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Mã đơn hàng</div>
                                    <div style="font-weight: 700; color: var(--primary-light); margin-top: 0.25rem;">#<?= $order['id'] ?></div>
                                </div>
                                <div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Ngày đặt</div>
                                    <div style="color: white; font-weight: 600; margin-top: 0.25rem;"><?= date('d/m/Y H:i', strtotime($order['created_at'])) ?></div>
                                </div>
                                <div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Thanh toán</div>
                                    <div style="color: white; font-weight: 600; margin-top: 0.25rem; font-size: 0.85rem;">
                                        <?php 
                                            if ($order['payment_method'] == 'cod') echo 'COD (Tiền mặt)';
                                            elseif ($order['payment_method'] == 'bank') echo 'Chuyển khoản';
                                            else echo 'Ví điện tử';
                                        ?>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <?php
                                    $statusInfo = [
                                        'pending' => ['text' => 'Chờ xử lý', 'color' => '#f59e0b', 'bg' => 'rgba(245, 158, 11, 0.1)', 'step' => 1],
                                        'confirmed' => ['text' => 'Đã xác nhận', 'color' => '#3b82f6', 'bg' => 'rgba(59, 130, 246, 0.1)', 'step' => 2],
                                        'shipping' => ['text' => 'Đang giao hàng', 'color' => '#8b5cf6', 'bg' => 'rgba(139, 92, 246, 0.1)', 'step' => 3],
                                        'completed' => ['text' => 'Hoàn thành', 'color' => '#10b981', 'bg' => 'rgba(16, 185, 129, 0.1)', 'step' => 4],
                                        'cancelled' => ['text' => 'Đã hủy', 'color' => '#ef4444', 'bg' => 'rgba(239, 68, 68, 0.1)', 'step' => 0]
                                    ];
                                    $st = strtolower($order['status']);
                                    $info = $statusInfo[$st] ?? $statusInfo['pending'];
                                    $stepActive = $info['step'];
                                    $isCancelled = ($st === 'cancelled');

                                    // Width of progress line
                                    $progressWidths = [
                                        1 => '0%',
                                        2 => '33.33%',
                                        3 => '66.66%',
                                        4 => '100%'
                                    ];
                                    $progressWidth = $progressWidths[$stepActive] ?? '0%';
                                ?>
                                <span class="status-badge" style="padding: 0.5rem 1rem; font-size: 0.85rem; background: <?= $info['bg'] ?>; color: <?= $info['color'] ?>;">
                                    <?= $info['text'] ?>
                                </span>
                            </div>
                        </div>

                        <!-- Visual Progress Timeline -->
                        <?php if ($isCancelled): ?>
                            <div style="margin: 1.5rem 2rem 0; padding: 1rem 1.5rem; background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: var(--radius-md); display: flex; align-items: center; gap: 0.75rem;">
                                <i class="fa-solid fa-circle-xmark" style="color: #ef4444; font-size: 1.25rem;"></i>
                                <div>
                                    <div style="font-weight: 700; color: white; font-size: 0.9rem;">Đơn hàng đã bị hủy</div>
                                    <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">Đơn hàng này đã bị hủy bỏ và không thể tiếp tục giao nhận.</div>
                                </div>
                            </div>
                        <?php else: ?>
                            <div style="margin: 2rem 2.5rem 0.5rem; padding: 0 1rem;">
                                <div style="display: flex; justify-content: space-between; position: relative; width: 100%;">
                                    <!-- Progress Line Background -->
                                    <div style="position: absolute; top: 15px; left: 0; right: 0; height: 4px; background: var(--border); z-index: 1; border-radius: 2px;"></div>
                                    <!-- Active Progress Line -->
                                    <div style="position: absolute; top: 15px; left: 0; width: <?= $progressWidth ?>; height: 4px; background: var(--secondary); z-index: 1; transition: width 0.3s ease; border-radius: 2px;"></div>
                                    
                                    <!-- Step 1: Chờ xử lý -->
                                    <div style="z-index: 2; text-align: center; width: 85px;">
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: <?= $stepActive >= 1 ? 'var(--secondary)' : 'var(--surface)' ?>; border: 2px solid <?= $stepActive >= 1 ? 'var(--secondary)' : 'var(--border)' ?>; color: <?= $stepActive >= 1 ? '#0f172a' : 'var(--text-muted)' ?>; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 0.9rem; transition: all 0.3s ease;">
                                            <i class="fa-solid fa-file-invoice"></i>
                                        </div>
                                        <div style="font-size: 0.75rem; font-weight: 700; margin-top: 0.5rem; color: <?= $stepActive >= 1 ? 'white' : 'var(--text-muted)' ?>;">Chờ xử lý</div>
                                    </div>
                                    
                                    <!-- Step 2: Xác nhận -->
                                    <div style="z-index: 2; text-align: center; width: 85px;">
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: <?= $stepActive >= 2 ? 'var(--secondary)' : 'var(--surface)' ?>; border: 2px solid <?= $stepActive >= 2 ? 'var(--secondary)' : 'var(--border)' ?>; color: <?= $stepActive >= 2 ? '#0f172a' : 'var(--text-muted)' ?>; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 0.9rem; transition: all 0.3s ease;">
                                            <i class="fa-solid fa-clipboard-check"></i>
                                        </div>
                                        <div style="font-size: 0.75rem; font-weight: 700; margin-top: 0.5rem; color: <?= $stepActive >= 2 ? 'white' : 'var(--text-muted)' ?>;">Xác nhận</div>
                                    </div>
                                    
                                    <!-- Step 3: Đang giao -->
                                    <div style="z-index: 2; text-align: center; width: 85px;">
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: <?= $stepActive >= 3 ? 'var(--secondary)' : 'var(--surface)' ?>; border: 2px solid <?= $stepActive >= 3 ? 'var(--secondary)' : 'var(--border)' ?>; color: <?= $stepActive >= 3 ? '#0f172a' : 'var(--text-muted)' ?>; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 0.9rem; transition: all 0.3s ease;">
                                            <i class="fa-solid fa-truck"></i>
                                        </div>
                                        <div style="font-size: 0.75rem; font-weight: 700; margin-top: 0.5rem; color: <?= $stepActive >= 3 ? 'white' : 'var(--text-muted)' ?>;">Đang giao</div>
                                    </div>

                                    <!-- Step 4: Hoàn thành -->
                                    <div style="z-index: 2; text-align: center; width: 85px;">
                                        <div style="width: 32px; height: 32px; border-radius: 50%; background: <?= $stepActive >= 4 ? 'var(--secondary)' : 'var(--surface)' ?>; border: 2px solid <?= $stepActive >= 4 ? 'var(--secondary)' : 'var(--border)' ?>; color: <?= $stepActive >= 4 ? '#0f172a' : 'var(--text-muted)' ?>; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 0.9rem; transition: all 0.3s ease;">
                                            <i class="fa-solid fa-circle-check"></i>
                                        </div>
                                        <div style="font-size: 0.75rem; font-weight: 700; margin-top: 0.5rem; color: <?= $stepActive >= 4 ? 'white' : 'var(--text-muted)' ?>;">Hoàn thành</div>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?>

                        <!-- Order Items -->
                        <div style="padding: 2rem;">
                            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 1.5rem;">
                                <?php foreach ($order['items'] as $item): ?>
                                    <li style="display: flex; gap: 1.5rem; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.03); padding-bottom: 1.5rem;">
                                        <img src="<?= !empty($item['image']) ? htmlspecialchars($item['image']) : 'https://placehold.co/600x400/1e293b/white?text=TechStore' ?>" alt="" style="width: 60px; height: 60px; object-fit: contain; background: white; border-radius: 6px; padding: 2px;">
                                        <div style="flex: 1;">
                                            <h4 style="margin: 0; color: white; font-size: 1.05rem; font-weight: 600;"><?= htmlspecialchars($item['product_name']) ?></h4>
                                            <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">Số lượng: <?= $item['quantity'] ?> &times; <?= number_format($item['price'], 0, ',', '.') ?> ₫</div>
                                        </div>
                                        <div style="color: white; font-weight: 700; font-size: 1.1rem;"><?= number_format($item['price'] * $item['quantity'], 0, ',', '.') ?> ₫</div>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>

                        <!-- Order Summary -->
                        <div style="padding: 1.5rem 2rem; background: rgba(255,255,255,0.01); border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
                            <div style="color: var(--text-muted); font-size: 0.9rem;">
                                <div><i class="fa-solid fa-location-dot" style="margin-right: 0.5rem; color: var(--primary-light);"></i> Địa chỉ: <?= htmlspecialchars($order['shipping_address']) ?></div>
                                <div style="margin-top: 0.25rem;"><i class="fa-solid fa-phone" style="margin-right: 0.5rem; color: var(--primary-light);"></i> SĐT: <?= htmlspecialchars($order['phone']) ?></div>
                                <?php if (!empty($order['coupon_code'])): ?>
                                    <div style="margin-top: 0.25rem; display: inline-block; background: rgba(239, 68, 68, 0.1); color: var(--secondary); padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: 600;"><i class="fa-solid fa-tag"></i> Đã áp dụng mã: <?= htmlspecialchars($order['coupon_code']) ?> (-<?= number_format($order['discount_amount'], 0, ',', '.') ?> ₫)</div>
                                <?php endif; ?>
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 0.8rem; color: var(--text-muted);">Tổng thanh toán</div>
                                <div style="font-size: 1.6rem; font-weight: 800; color: var(--secondary); margin-top: 0.25rem;"><?= number_format($order['total_price'], 0, ',', '.') ?> ₫</div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php include 'app/views/shares/footer.php'; ?>
