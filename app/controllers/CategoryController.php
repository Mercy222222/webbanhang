<?php
require_once 'app/config/database.php';
require_once 'app/models/CategoryModel.php';

class CategoryController
{
    private $categoryModel;
    private $db;

    public function __construct()
    {
        $this->db = (new Database())->getConnection();
        $this->categoryModel = new CategoryModel($this->db);
        
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    // Public list for navigation or homepage
    public function list()
    {
        $categories = $this->categoryModel->getCategories();
        include 'app/views/category/list.php';
    }

    // Admin category management
    private function checkAdmin() {
        if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
            header('Location: index.php?url=auth/login');
            exit();
        }
    }

    public function admin_index()
    {
        $this->checkAdmin();
        $categories = $this->categoryModel->getCategories();
        include 'app/views/category/admin_list.php';
    }

    public function add()
    {
        $this->checkAdmin();
        include 'app/views/category/add.php';
    }

    public function save()
    {
        $this->checkAdmin();
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $name = $_POST['name'] ?? '';
            $description = $_POST['description'] ?? '';
            if ($this->categoryModel->addCategory($name, $description)) {
                header('Location: index.php?url=category/admin_index');
            } else {
                echo "Lỗi khi thêm danh mục";
            }
        }
    }

    public function edit($id)
    {
        $this->checkAdmin();
        $category = $this->categoryModel->getCategoryById($id);
        if ($category) {
            include 'app/views/category/edit.php';
        } else {
            echo "Không tìm thấy danh mục";
        }
    }

    public function update()
    {
        $this->checkAdmin();
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $id = $_POST['id'];
            $name = $_POST['name'];
            $description = $_POST['description'];
            if ($this->categoryModel->updateCategory($id, $name, $description)) {
                header('Location: index.php?url=category/admin_index');
            } else {
                echo "Lỗi khi cập nhật danh mục";
            }
        }
    }

    public function delete($id)
    {
        $this->checkAdmin();
        if ($this->categoryModel->deleteCategory($id)) {
            header('Location: index.php?url=category/admin_index');
        } else {
            echo "Lỗi khi xóa danh mục";
        }
    }
}
?>