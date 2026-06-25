<?php
require_once 'app/middleware/Jwt.php';

class JwtMiddleware
{
    public static function authenticate()
    {
        $headers = apache_request_headers();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (!$authHeader && isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
        }

        if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
            $decoded = Jwt::decode($token);
            
            if ($decoded) {
                return $decoded; // Return user data from payload
            }
        }

        http_response_code(401);
        echo json_encode([
            "success" => false,
            "message" => "Unauthorized. Vui lòng đăng nhập để thực hiện hành động này."
        ]);
        exit();
    }

    public static function requireAdmin()
    {
        $user = self::authenticate();
        if (!isset($user['role']) || $user['role'] !== 'admin') {
            http_response_code(403);
            echo json_encode([
                "success" => false,
                "message" => "Forbidden. Yêu cầu quyền Admin."
            ]);
            exit();
        }
        return $user;
    }
}
?>
