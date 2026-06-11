<?php
require_once 'app/models/OrderModel.php';
require_once 'app/models/CouponModel.php';
require_once 'app/config/database.php';

class CheckoutController
{
    private $orderModel;
    private $couponModel;
    private $db;

    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->orderModel = new OrderModel($this->db);
        $this->couponModel = new CouponModel($this->db);
        
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function index()
    {
        if (!isset($_SESSION['user_id'])) {
            header('Location: index.php?url=auth/login');
            exit();
        }

        if (empty($_SESSION['cart'])) {
            header('Location: index.php');
            exit();
        }

        // If POSTed from cart, update selection
        if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['selected_items']) && is_array($_POST['selected_items'])) {
            $_SESSION['checkout_selected'] = $_POST['selected_items'];
        }

        // If selection is empty or not set, default to all items in cart
        if (empty($_SESSION['checkout_selected'])) {
            $_SESSION['checkout_selected'] = array_keys($_SESSION['cart']);
        }

        $cart = $_SESSION['cart'];
        $checkout_items = [];
        $total = 0;
        foreach ($cart as $item) {
            if (in_array($item['id'], $_SESSION['checkout_selected'])) {
                $checkout_items[] = $item;
                $total += $item['price'] * $item['quantity'];
            }
        }

        // If no items selected, redirect back to cart
        if (empty($checkout_items)) {
            header('Location: index.php?url=cart');
            exit();
        }

        // Calculate discount
        $discount = 0;
        $coupon_code = null;
        if (isset($_SESSION['coupon'])) {
            $coupon = $_SESSION['coupon'];
            $coupon_code = $coupon['code'];
            if ($coupon['discount_type'] == 'percentage') {
                $discount = $total * ($coupon['discount_value'] / 100);
            } else {
                $discount = $coupon['discount_value'];
            }
            if ($discount > $total) {
                $discount = $total;
            }
        }
        $final_total = $total - $discount;

        if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['phone'])) {
            $phone = $_POST['phone'] ?? '';
            $address = $_POST['address'] ?? '';
            $payment_method = $_POST['payment_method'] ?? 'cod';

            if (empty($phone) || empty($address)) {
                $error = "Vui lòng nhập đầy đủ thông tin giao hàng.";
                require_once 'app/views/checkout/index.php';
                return;
            }

            // Create order with payment method and coupon details
            if ($this->orderModel->createOrder(
                $_SESSION['user_id'], 
                $final_total, 
                $phone, 
                $address, 
                $checkout_items, 
                $payment_method, 
                $coupon_code, 
                $discount
            )) {
                // Clear purchased items from the cart
                foreach ($_SESSION['checkout_selected'] as $id) {
                    unset($_SESSION['cart'][$id]);
                }
                unset($_SESSION['checkout_selected']);
                unset($_SESSION['coupon']);
                unset($_SESSION['coupon_success']);
                unset($_SESSION['coupon_error']);
                
                require_once 'app/views/checkout/success.php';
            } else {
                $error = "Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.";
                require_once 'app/views/checkout/index.php';
            }
        } else {
            require_once 'app/views/checkout/index.php';
        }
    }

    public function applyCoupon()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $coupon_code = trim($_POST['coupon_code'] ?? '');
            if (!empty($coupon_code)) {
                $coupon = $this->couponModel->getCouponByCode($coupon_code);
                if ($coupon) {
                    $_SESSION['coupon'] = $coupon;
                    $_SESSION['coupon_success'] = "Áp dụng mã giảm giá thành công!";
                    unset($_SESSION['coupon_error']);
                } else {
                    unset($_SESSION['coupon']);
                    $_SESSION['coupon_error'] = "Mã giảm giá không hợp lệ hoặc đã hết hạn.";
                    unset($_SESSION['coupon_success']);
                }
            } else {
                unset($_SESSION['coupon']);
                unset($_SESSION['coupon_error']);
                unset($_SESSION['coupon_success']);
            }
        }
        header('Location: index.php?url=checkout');
        exit();
    }
}
?>
