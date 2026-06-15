<?php
require_once 'app/config/database.php';
require_once 'app/models/CategoryModel.php';
require_once 'app/middleware/JwtMiddleware.php';

class CategoryApiController
{
    private $db;
    private $categoryModel;

    public function __construct()
    {
        // Set CORS and JSON Headers
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $database = new Database();
        $this->db = $database->getConnection();
        $this->categoryModel = new CategoryModel($this->db);
    }

    // GET /api/categories
    public function index()
    {
        try {
            $categories = $this->categoryModel->getCategories();
            echo json_encode([
                "success" => true,
                "data" => $categories
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Lỗi server: " . $e->getMessage()
            ]);
        }
    }

    // GET /api/categories/{id}
    public function show($id)
    {
        try {
            $category = $this->categoryModel->getCategoryById($id);
            if (!$category) {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "message" => "Danh mục không tồn tại"
                ]);
                return;
            }

            echo json_encode([
                "success" => true,
                "data" => $category
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Lỗi server: " . $e->getMessage()
            ]);
        }
    }

    // POST /api/categories
    public function store()
    {
        try {
            $admin = JwtMiddleware::requireAdmin();
            $input = json_decode(file_get_contents("php://input"), true);
            
            $name = $input['name'] ?? $_POST['name'] ?? '';
            $description = $input['description'] ?? $_POST['description'] ?? '';

            $errors = [];
            if (empty($name)) {
                $errors['name'] = 'Tên danh mục không được để trống';
            }

            if (count($errors) > 0) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "errors" => $errors
                ]);
                return;
            }

            $result = $this->categoryModel->addCategory($name, $description);

            if ($result) {
                // Get the last inserted ID
                $lastId = $this->db->lastInsertId();
                http_response_code(201);
                echo json_encode([
                    "success" => true,
                    "message" => "Thêm danh mục thành công",
                    "data" => [
                        "id" => (int)$lastId,
                        "name" => $name,
                        "description" => $description
                    ]
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Không thể thêm danh mục"
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Lỗi: " . $e->getMessage()
            ]);
        }
    }

    // PUT /api/categories/{id}
    public function update($id)
    {
        try {
            $admin = JwtMiddleware::requireAdmin();
            $category = $this->categoryModel->getCategoryById($id);
            if (!$category) {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "message" => "Danh mục không tồn tại"
                ]);
                return;
            }

            $input = json_decode(file_get_contents("php://input"), true);
            
            $name = $input['name'] ?? $_POST['name'] ?? $category->name;
            $description = $input['description'] ?? $_POST['description'] ?? $category->description;

            if (empty($name)) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "errors" => ["name" => "Tên danh mục không được để trống"]
                ]);
                return;
            }

            $result = $this->categoryModel->updateCategory($id, $name, $description);

            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "Cập nhật danh mục thành công",
                    "data" => [
                        "id" => (int)$id,
                        "name" => $name,
                        "description" => $description
                    ]
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Không thể cập nhật danh mục"
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Lỗi: " . $e->getMessage()
            ]);
        }
    }

    // DELETE /api/categories/{id}
    public function delete($id)
    {
        try {
            $admin = JwtMiddleware::requireAdmin();
            $category = $this->categoryModel->getCategoryById($id);
            if (!$category) {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "message" => "Danh mục không tồn tại"
                ]);
                return;
            }

            $result = $this->categoryModel->deleteCategory($id);

            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "Xóa danh mục thành công"
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Không thể xóa danh mục"
                ]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Lỗi: " . $e->getMessage()
            ]);
        }
    }
}
