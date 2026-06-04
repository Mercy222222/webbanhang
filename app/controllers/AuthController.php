<?php
require_once 'app/models/UserModel.php';
require_once 'app/config/database.php';

class AuthController
{
    private $userModel;

    public function __construct()
    {
        $db = new Database();
        $this->userModel = new UserModel($db->getConnection());
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            $user = $this->userModel->login($email, $password);
            if ($user) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['name'];
                $_SESSION['user_role'] = $user['role'];

                if ($user['role'] == 'admin') {
                    header('Location: index.php?url=admin');
                } else {
                    header('Location: index.php');
                }
                exit();
            } else {
                $error = "Email hoặc mật khẩu không chính xác.";
                require_once 'app/views/auth/login.php';
            }
        } else {
            require_once 'app/views/auth/login.php';
        }
    }

    public function register()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            if (empty($name) || empty($email) || empty($password)) {
                $error = "Vui lòng nhập đầy đủ thông tin.";
                require_once 'app/views/auth/register.php';
                return;
            }

            if ($this->userModel->register($name, $email, $password)) {
                header('Location: index.php?url=auth/login');
                exit();
            } else {
                $error = "Email đã tồn tại hoặc có lỗi xảy ra.";
                require_once 'app/views/auth/register.php';
            }
        } else {
            require_once 'app/views/auth/register.php';
        }
    }

    public function logout()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        session_destroy();
        header('Location: index.php');
        exit();
    }

    public function profile()
    {
        if (!isset($_SESSION['user_id'])) {
            header('Location: index.php?url=auth/login');
            exit();
        }

        // Get user details
        $user = $this->userModel->getUserById($_SESSION['user_id']);

        // Load OrderModel
        require_once 'app/models/OrderModel.php';
        $orderModel = new OrderModel((new Database())->getConnection());

        // Get user orders
        $orders_raw = $orderModel->getOrdersByUser($_SESSION['user_id']);
        
        $orders = [];
        foreach ($orders_raw as $o) {
            $o['items'] = $orderModel->getOrderDetails($o['id']);
            $orders[] = $o;
        }

        require_once 'app/views/auth/profile.php';
    }
}
?>

