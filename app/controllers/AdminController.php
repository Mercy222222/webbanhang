<?php
require_once 'app/models/OrderModel.php';
require_once 'app/models/ProductModel.php';
require_once 'app/models/CategoryModel.php';
require_once 'app/config/database.php';

class AdminController
{
    private $orderModel;
    private $productModel;
    private $categoryModel;

    public function __construct()
    {
        $db = new Database();
        $this->orderModel = new OrderModel($db->getConnection());
        $this->productModel = new ProductModel($db->getConnection());
        $this->categoryModel = new CategoryModel($db->getConnection());
        
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        
        // Ensure user is admin
        if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'admin') {
            header('Location: index.php?url=auth/login');
            exit();
        }
    }

    public function index()
    {
        require_once 'app/views/admin/dashboard.php';
    }

    public function orders()
    {
        $orders = $this->orderModel->getAllOrders();
        require_once 'app/views/admin/orders.php';
    }

    public function products()
    {
        $products = $this->productModel->getProducts();
        require_once 'app/views/admin/products.php';
    }

    public function categories()
    {
        $categories = $this->categoryModel->getCategories();
        require_once 'app/views/admin/categories.php';
    }

    public function updateOrderStatus($id)
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $status = $_POST['status'] ?? 'pending';
            $this->orderModel->updateOrderStatus($id, $status);
            header('Location: index.php?url=admin/orders');
            exit();
        }
    }
}
?>

