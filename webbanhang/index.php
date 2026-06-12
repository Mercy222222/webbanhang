<?php
require_once 'app/models/ProductModel.php';
$url = $_GET['url'] ?? '';
$url = rtrim($url, '/');
$url = filter_var($url, FILTER_SANITIZE_URL);
$url = explode('/', $url);
// Route API requests RESTfully
if (isset($url[0]) && $url[0] === 'api') {
    $resource = $url[1] ?? '';
    
    // Support OPTIONS preflight requests globally for API
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
        exit(0);
    }
    
    if ($resource === 'products' || $resource === 'categories') {
        $id = $url[2] ?? null;
        if ($id === '') {
            $id = null;
        }
        $method = $_SERVER['REQUEST_METHOD'];
        
        $controllerName = ($resource === 'products') ? 'ProductApiController' : 'CategoryApiController';
        
        // Map HTTP method to controller actions
        if ($method === 'GET') {
            $action = $id ? 'show' : 'index';
        } elseif ($method === 'POST') {
            // Check if it's a simulated PUT/DELETE via POST parameter
            $simulatedMethod = strtoupper($_POST['_method'] ?? $_GET['_method'] ?? '');
            if ($simulatedMethod === 'PUT' || $simulatedMethod === 'PATCH') {
                $method = 'PUT';
                $action = 'update';
            } elseif ($simulatedMethod === 'DELETE') {
                $method = 'DELETE';
                $action = 'delete';
            } else {
                $action = 'store';
            }
        } elseif ($method === 'PUT' || $method === 'PATCH') {
            $action = 'update';
        } elseif ($method === 'DELETE') {
            $action = 'delete';
        } else {
            http_response_code(405);
            header("Content-Type: application/json; charset=UTF-8");
            echo json_encode(["success" => false, "message" => "Method Not Allowed"]);
            exit();
        }

        // Validate that $id is provided for actions that require it
        if (($action === 'update' || $action === 'delete' || $action === 'show') && $id === null) {
            http_response_code(400);
            header("Content-Type: application/json; charset=UTF-8");
            echo json_encode(["success" => false, "message" => "ID is required for this action"]);
            exit();
        }

        if (file_exists('app/controllers/' . $controllerName . '.php')) {
            require_once 'app/controllers/' . $controllerName . '.php';
            $controller = new $controllerName();
            if (method_exists($controller, $action)) {
                if ($id !== null) {
                    $controller->$action($id);
                } else {
                    $controller->$action();
                }
                exit();
            }
        }
        
        http_response_code(404);
        header("Content-Type: application/json; charset=UTF-8");
        echo json_encode(["success" => false, "message" => "API Action Not Found"]);
        exit();
    }
}

// Kiểm tra phần đầu tiên của URL để xác định controller
$controllerName = isset($url[0]) && $url[0] != '' ? ucfirst($url[0]) . 'Controller' :
    'DefaultController';
// Kiểm tra phần thứ hai của URL để xác định action
$action = isset($url[1]) && $url[1] != '' ? $url[1] : 'index';
// die ("controller=$controllerName - action=$action");
// Kiểm tra xem controller và action có tồn tại không
if (!file_exists('app/controllers/' . $controllerName . '.php')) {
    // Xử lý không tìm thấy controller
    die('Controller not found');
}
require_once 'app/controllers/' . $controllerName . '.php';
$controller = new $controllerName();
if (!method_exists($controller, $action)) {
    // Xử lý không tìm thấy action
    die('Action not found');
}
// Gọi action với các tham số còn lại (nếu có)
call_user_func_array([$controller, $action], array_slice($url, 2));