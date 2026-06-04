<?php
require_once 'app/models/OrderModel.php';
require_once 'app/config/database.php';

class CheckoutController
{
    private $orderModel;

    public function __construct()
    {
        $db = new Database();
        $this->orderModel = new OrderModel($db->getConnection());
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function index()
    {
        if (!isset($_SESSION['user_id'])) {
            header('Location: /webbanhang/index.php?url=auth/login');
            exit();
        }

        if (empty($_SESSION['cart'])) {
            header('Location: /webbanhang/index.php');
            exit();
        }

        $cart = $_SESSION['cart'];
        $total = 0;
        foreach ($cart as $item) {
            $total += $item['price'] * $item['quantity'];
        }

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $phone = $_POST['phone'] ?? '';
            $address = $_POST['address'] ?? '';

            if (empty($phone) || empty($address)) {
                $error = "Vui lòng nhập đầy đủ thông tin giao hàng.";
                require_once 'app/views/checkout/index.php';
                return;
            }

            if ($this->orderModel->createOrder($_SESSION['user_id'], $total, $phone, $address, $cart)) {
                // Clear cart after successful order
                $_SESSION['cart'] = [];
                require_once 'app/views/checkout/success.php';
            } else {
                $error = "Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.";
                require_once 'app/views/checkout/index.php';
            }
        } else {
            require_once 'app/views/checkout/index.php';
        }
    }
}
?>
