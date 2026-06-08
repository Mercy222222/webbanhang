<?php
require_once 'app/models/ProductModel.php';
require_once 'app/models/CategoryModel.php';
require_once 'app/config/database.php';

class DefaultController
{
    private $productModel;
    private $categoryModel;

    public function __construct()
    {
        $db = new Database();
        $this->productModel = new ProductModel($db->getConnection());
        $this->categoryModel = new CategoryModel($db->getConnection());
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function index()
    {
        $products = $this->productModel->getProducts();
        $categories = $this->categoryModel->getCategories();
        require_once 'app/views/home/index.php';
    }

    public function category($id)
    {
        $products = $this->productModel->getProductsByCategory($id);
        $categories = $this->categoryModel->getCategories();
        $current_category = $this->categoryModel->getCategoryById($id);
        require_once 'app/views/home/index.php';
    }

    public function search()
    {
        $keyword = $_GET['keyword'] ?? '';
        $products = $this->productModel->getProducts();
        if ($keyword) {
            $filtered = [];
            foreach ($products as $p) {
                if (stripos($p->name, $keyword) !== false) {
                    $filtered[] = $p;
                }
            }
            $products = $filtered;
        }

        // Search static pages
        $matching_pages = [];
        if ($keyword) {
            // Check for Explore terms
            $explore_keywords = ['khám phá', 'khuyen mai', 'khuyến mãi', 'tin tuc', 'tin tức', 'uu dai', 'ưu đãi', 'kham pha'];
            foreach ($explore_keywords as $ek) {
                if (stripos($keyword, $ek) !== false) {
                    $matching_pages[] = [
                        'title' => 'Khám phá GEARVN',
                        'desc' => 'Tin tức công nghệ mới nhất, các chương trình ưu đãi đặc quyền và khuyến mãi tại GEARVN.',
                        'url' => 'index.php?url=default/explore'
                    ];
                    break;
                }
            }

            // Check for Support terms
            $support_keywords = ['hỗ trợ', 'ho tro', 'chinh sach', 'chính sách', 'bao hanh', 'bảo hành', 'doi tra', 'đổi trả', 'huong dan', 'hướng dẫn', 'mua hang', 'mua hàng', 'lien he', 'liên hệ'];
            foreach ($support_keywords as $sk) {
                if (stripos($keyword, $sk) !== false) {
                    $matching_pages[] = [
                        'title' => 'Hỗ trợ khách hàng GEARVN',
                        'desc' => 'Hướng dẫn mua hàng trực tuyến, chính sách đổi trả hàng hóa, chính sách bảo hành chính hãng.',
                        'url' => 'index.php?url=default/support'
                    ];
                    break;
                }
            }
        }

        $categories = $this->categoryModel->getCategories();
        require_once 'app/views/home/index.php';
    }

    public function detail($id)
    {
        $product = $this->productModel->getProductById($id);
        if (!$product) {
            header('Location: index.php');
            exit();
        }
        $categories = $this->categoryModel->getCategories();
        require_once 'app/views/home/detail.php';
    }

    public function explore()
    {
        $categories = $this->categoryModel->getCategories();
        require_once 'app/views/home/explore.php';
    }

    public function explore_trend()
    {
        $categories = $this->categoryModel->getCategories();
        require_once 'app/views/home/explore_trend.php';
    }

    public function explore_setup()
    {
        $categories = $this->categoryModel->getCategories();
        require_once 'app/views/home/explore_setup.php';
    }

    public function support()
    {
        $categories = $this->categoryModel->getCategories();
        require_once 'app/views/home/support.php';
    }
}
?>
