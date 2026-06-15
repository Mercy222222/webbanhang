<?php
// Require SessionHelper và các tệp cần thiết khác
require_once 'app/config/database.php';
require_once 'app/models/CategoryModel.php';

class CategoryController
{
    private $categoryModel;
    private $db;

    public function __construct()
    {
        // Khởi tạo kết nối database và model
        $this->db = (new Database())->getConnection();
        $this->categoryModel = new CategoryModel($this->db);
    }

    public function list()
    {
        // Lấy danh sách danh mục từ model
        $categories = $this->categoryModel->getCategories();
        
        // Hiển thị giao diện danh sách danh mục
        include 'app/views/category/list.php';
    }
}
?>