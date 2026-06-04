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
                    header('Location: /webbanhang/index.php?url=admin');
                } else {
                    header('Location: /webbanhang/index.php');
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
                header('Location: /webbanhang/index.php?url=auth/login');
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
        session_destroy();
        header('Location: /webbanhang/index.php');
        exit();
    }
}
?>
