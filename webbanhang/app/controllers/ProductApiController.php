<?php
require_once 'app/config/database.php';
require_once 'app/models/ProductModel.php';
require_once 'app/models/CategoryModel.php';

class ProductApiController
{
    private $db;
    private $productModel;

    public function __construct()
    {
        // Set CORS and JSON Headers
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        header("Content-Type: application/json; charset=UTF-8");

        $database = new Database();
        $this->db = $database->getConnection();
        $this->productModel = new ProductModel($this->db);
    }

    // GET /api/products
    public function index()
    {
        try {
            $category_id = isset($_GET['category_id']) ? intval($_GET['category_id']) : null;
            if ($category_id) {
                $products = $this->productModel->getProductsByCategory($category_id);
            } else {
                $products = $this->productModel->getProducts();
            }
            
            echo json_encode([
                "success" => true,
                "data" => $products
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Lỗi server: " . $e->getMessage()
            ]);
        }
    }

    // GET /api/products/{id}
    public function show($id)
    {
        try {
            $product = $this->productModel->getProductById($id);
            if (!$product) {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "message" => "Sản phẩm không tồn tại"
                ]);
                return;
            }

            echo json_encode([
                "success" => true,
                "data" => $product
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Lỗi server: " . $e->getMessage()
            ]);
        }
    }

    // POST /api/products
    public function store()
    {
        try {
            // Determine if request is JSON or Form-Data
            $input = json_decode(file_get_contents("php://input"), true);
            
            $name = $input['name'] ?? $_POST['name'] ?? '';
            $description = $input['description'] ?? $_POST['description'] ?? '';
            $price = $input['price'] ?? $_POST['price'] ?? 0;
            $category_id = $input['category_id'] ?? $_POST['category_id'] ?? null;
            $image = $input['image'] ?? $_POST['image'] ?? '';

            // Handle file upload if present
            if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $image = $this->uploadImage($_FILES['image']);
            }

            // Simple validation
            $errors = [];
            if (empty($name)) $errors['name'] = 'Tên sản phẩm không được để trống';
            if (empty($description)) $errors['description'] = 'Mô tả không được để trống';
            if (!is_numeric($price) || $price < 0) $errors['price'] = 'Giá sản phẩm không hợp lệ';
            if (empty($category_id)) $errors['category_id'] = 'Danh mục không được để trống';

            if (count($errors) > 0) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "errors" => $errors
                ]);
                return;
            }

            $result = $this->productModel->addProduct($name, $description, $price, $category_id, $image);

            if (is_array($result)) {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "errors" => $result
                ]);
            } elseif ($result) {
                http_response_code(201);
                echo json_encode([
                    "success" => true,
                    "message" => "Thêm sản phẩm thành công",
                    "data" => [
                        "id" => $result,
                        "name" => $name,
                        "description" => $description,
                        "price" => floatval($price),
                        "category_id" => intval($category_id),
                        "image" => $image
                    ]
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Không thể thêm sản phẩm"
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

    // PUT /api/products/{id}
    public function update($id)
    {
        try {
            $product = $this->productModel->getProductById($id);
            if (!$product) {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "message" => "Sản phẩm không tồn tại"
                ]);
                return;
            }

            // Parse PUT/PATCH body (usually JSON)
            $input = json_decode(file_get_contents("php://input"), true);
            
            // Supporting standard POST with _method=PUT too
            $name = $input['name'] ?? $_POST['name'] ?? $product->name;
            $description = $input['description'] ?? $_POST['description'] ?? $product->description;
            $price = $input['price'] ?? $_POST['price'] ?? $product->price;
            $category_id = $input['category_id'] ?? $_POST['category_id'] ?? $product->category_id;
            $image = $input['image'] ?? $_POST['image'] ?? $product->image;

            // Handle file upload if present (useful if POST with _method=PUT is used)
            if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $image = $this->uploadImage($_FILES['image']);
            }

            $result = $this->productModel->updateProduct($id, $name, $description, $price, $category_id, $image);

            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "Cập nhật sản phẩm thành công",
                    "data" => [
                        "id" => $id,
                        "name" => $name,
                        "description" => $description,
                        "price" => floatval($price),
                        "category_id" => intval($category_id),
                        "image" => $image
                    ]
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Không thể cập nhật sản phẩm"
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

    // DELETE /api/products/{id}
    public function delete($id)
    {
        try {
            $product = $this->productModel->getProductById($id);
            if (!$product) {
                http_response_code(404);
                echo json_encode([
                    "success" => false,
                    "message" => "Sản phẩm không tồn tại"
                ]);
                return;
            }

            $result = $this->productModel->deleteProduct($id);

            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "Xóa sản phẩm thành công"
                ]);
            } else {
                http_response_code(500);
                echo json_encode([
                    "success" => false,
                    "message" => "Không thể xóa sản phẩm"
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

    private function uploadImage($file)
    {
        $target_dir = "uploads/";

        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $target_file = $target_dir . time() . '_' . basename($file["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        $check = getimagesize($file["tmp_name"]);
        if ($check === false) {
            throw new Exception("File không phải là hình ảnh");
        }

        if ($file["size"] > 10 * 1024 * 1024) {
            throw new Exception("Hình ảnh có kích thước quá lớn");
        }

        $allowed = ["jpg", "png", "jpeg", "gif"];
        if (!in_array($imageFileType, $allowed)) {
            throw new Exception("Chỉ cho phép định dạng JPG, JPEG, PNG và GIF");
        }

        if (!move_uploaded_file($file["tmp_name"], $target_file)) {
            throw new Exception("Lỗi khi lưu tệp tin hình ảnh tải lên");
        }

        return $target_file;
    }
}
