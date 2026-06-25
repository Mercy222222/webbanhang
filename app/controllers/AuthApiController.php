<?php
require_once 'app/config/database.php';
require_once 'app/models/UserModel.php';
require_once 'app/middleware/Jwt.php';

class AuthApiController
{
    private $db;
    private $userModel;

    public function __construct()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $database = new Database();
        $this->db = $database->getConnection();
        $this->userModel = new UserModel($this->db);
    }

    public function login()
    {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            http_response_code(405);
            echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
            return;
        }

        $input = json_decode(file_get_contents("php://input"), true);
        $email = $input['email'] ?? $_POST['email'] ?? '';
        $password = $input['password'] ?? $_POST['password'] ?? '';

        if (empty($email) || empty($password)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Vui lòng nhập email và mật khẩu"]);
            return;
        }

        $user = $this->userModel->login($email, $password);

        if ($user) {
            $payload = [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'role' => $user['role']
            ];

            $token = Jwt::encode($payload);

            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Đăng nhập thành công",
                "token" => $token,
                "user" => $payload
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Email hoặc mật khẩu không chính xác"
            ]);
        }
    }
}
?>
