<?php
require_once 'app/config/database.php';
require_once 'app/models/ReviewModel.php';
require_once 'app/middleware/JwtMiddleware.php';

class ReviewApiController
{
    private $db;
    private $reviewModel;

    public function __construct()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $database = new Database();
        $this->db = $database->getConnection();
        $this->reviewModel = new ReviewModel($this->db);
    }

    // Lấy danh sách review theo sản phẩm
    public function index($product_id)
    {
        if (!$product_id) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Thiếu product_id"]);
            return;
        }

        $reviews = $this->reviewModel->getReviewsByProductId($product_id);
        echo json_encode(["success" => true, "data" => $reviews]);
    }

    // Đăng review mới (yêu cầu login)
    public function store()
    {
        try {
            $user = JwtMiddleware::authenticate();

            $input = json_decode(file_get_contents("php://input"), true);
            $product_id = $input['product_id'] ?? $_POST['product_id'] ?? null;
            $rating = $input['rating'] ?? $_POST['rating'] ?? 5;
            $comment = $input['comment'] ?? $_POST['comment'] ?? '';

            if (!$product_id) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Vui lòng chọn sản phẩm"]);
                return;
            }

            if ($this->reviewModel->addReview($product_id, $user['id'], $rating, $comment)) {
                http_response_code(201);
                echo json_encode(["success" => true, "message" => "Đánh giá thành công"]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Không thể lưu đánh giá"]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Lỗi: " . $e->getMessage()]);
        }
    }
}
?>
