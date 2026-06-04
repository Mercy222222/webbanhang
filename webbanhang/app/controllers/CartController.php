<?php
require_once 'app/models/ProductModel.php';
require_once 'app/config/database.php';

class CartController
{
    private $productModel;

    public function __construct()
    {
        $db = new Database();
        $this->productModel = new ProductModel($db->getConnection());
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }
    }

    public function index()
    {
        $cart = $_SESSION['cart'];
        $total = 0;
        foreach ($cart as $item) {
            $total += $item['price'] * $item['quantity'];
        }
        require_once 'app/views/cart/index.php';
    }

    public function add($id)
    {
        if (empty($id)) {
            header('Location: /webbanhang/index.php');
            exit;
        }

        $product = $this->productModel->getProductById($id);
        if ($product) {
            if (isset($_SESSION['cart'][$id])) {
                $_SESSION['cart'][$id]['quantity']++;
            } else {
                $_SESSION['cart'][$id] = [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $product->image,
                    'quantity' => 1
                ];
            }
        }
        header('Location: /webbanhang/index.php?url=cart');
        exit();
    }

    public function update()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['quantities'])) {
            foreach ($_POST['quantities'] as $id => $quantity) {
                if ($quantity > 0) {
                    $_SESSION['cart'][$id]['quantity'] = $quantity;
                } else {
                    unset($_SESSION['cart'][$id]);
                }
            }
        }
        header('Location: /webbanhang/index.php?url=cart');
        exit();
    }

    public function remove($id)
    {
        if (isset($_SESSION['cart'][$id])) {
            unset($_SESSION['cart'][$id]);
        }
        header('Location: /webbanhang/index.php?url=cart');
        exit();
    }
}
?>
