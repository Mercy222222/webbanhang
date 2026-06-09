<?php
require_once 'app/models/OrderModel.php';
require_once 'app/models/ProductModel.php';
require_once 'app/config/database.php';

class ApiController
{
    private $db;
    private $orderModel;

    public function __construct()
    {
        // Set CORS headers
        header("Access-Control-Allow-Origin: http://localhost:3000");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");
        header("Content-Type: application/json; charset=UTF-8");

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            exit(0);
        }

        $database = new Database();
        $this->db = $database->getConnection();
        $this->orderModel = new OrderModel($this->db);
    }

    // GET index.php?url=api/stats
    public function stats()
    {
        try {
            // Total Revenue
            $queryRev = "SELECT SUM(total_price) as total_revenue FROM orders WHERE status != 'cancelled'";
            $stmtRev = $this->db->prepare($queryRev);
            $stmtRev->execute();
            $revRow = $stmtRev->fetch(PDO::FETCH_ASSOC);
            $total_revenue = floatval($revRow['total_revenue'] ?? 0);

            // Total Orders
            $queryCount = "SELECT COUNT(*) as total_orders FROM orders";
            $stmtCount = $this->db->prepare($queryCount);
            $stmtCount->execute();
            $countRow = $stmtCount->fetch(PDO::FETCH_ASSOC);
            $total_orders = intval($countRow['total_orders'] ?? 0);

            // Average Order Value
            $average_value = $total_orders > 0 ? ($total_revenue / $total_orders) : 0;

            // Status Breakdown
            $queryStatus = "SELECT status, COUNT(*) as count FROM orders GROUP BY status";
            $stmtStatus = $this->db->prepare($queryStatus);
            $stmtStatus->execute();
            $status_list = $stmtStatus->fetchAll(PDO::FETCH_ASSOC);

            $status_breakdown = [];
            foreach ($status_list as $row) {
                $status_breakdown[$row['status']] = intval($row['count']);
            }

            echo json_encode([
                "success" => true,
                "data" => [
                    "total_revenue" => $total_revenue,
                    "total_orders" => $total_orders,
                    "average_order_value" => $average_value,
                    "status_breakdown" => $status_breakdown
                ]
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    }

    // GET index.php?url=api/orders
    public function orders()
    {
        try {
            $orders = $this->orderModel->getAllOrders();
            echo json_encode([
                "success" => true,
                "data" => $orders
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    }

    // GET index.php?url=api/orderDetail/[id]
    public function orderDetail($id)
    {
        try {
            $details = $this->orderModel->getOrderDetails($id);
            
            // Get order general info
            $queryOrder = "SELECT o.*, u.name as user_name, u.email as user_email FROM orders o 
                           LEFT JOIN users u ON o.user_id = u.id 
                           WHERE o.id = :id";
            $stmtOrder = $this->db->prepare($queryOrder);
            $stmtOrder->bindParam(':id', $id);
            $stmtOrder->execute();
            $order = $stmtOrder->fetch(PDO::FETCH_ASSOC);

            if (!$order) {
                http_response_code(404);
                echo json_encode(["success" => false, "message" => "Order not found"]);
                return;
            }

            echo json_encode([
                "success" => true,
                "data" => [
                    "order" => $order,
                    "items" => $details
                ]
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    }

    // POST index.php?url=api/updateOrderStatus/[id]
    public function updateOrderStatus($id)
    {
        try {
            $input = json_decode(file_get_contents("php://input"), true);
            $status = $input['status'] ?? '';

            if (empty($status)) {
                // Check standard POST if JSON is empty
                $status = $_POST['status'] ?? '';
            }

            $valid_statuses = ['pending', 'confirmed', 'shipping', 'completed', 'cancelled'];
            if (!in_array($status, $valid_statuses)) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Invalid status value: " . $status]);
                return;
            }

            $result = $this->orderModel->updateOrderStatus($id, $status);
            if ($result) {
                echo json_encode([
                    "success" => true,
                    "message" => "Order status updated to " . $status
                ]);
            } else {
                http_response_code(500);
                echo json_encode(["success" => false, "message" => "Failed to update order status"]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
        }
    }
}
?>
