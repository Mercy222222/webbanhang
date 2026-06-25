<?php
class OrderModel
{
    private $conn;
    private $table_orders = "orders";
    private $table_details = "order_details";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function createOrder($user_id, $total_price, $phone, $address, $cart_items, $payment_method = 'cod', $coupon_code = null, $discount_amount = 0)
    {
        try {
            $this->conn->beginTransaction();

            // Insert into orders table (matching database.sql)
            $query = "INSERT INTO " . $this->table_orders . " (user_id, total_price, status, shipping_address, phone, payment_method, coupon_code, discount_amount) 
                      VALUES (:user_id, :total_price, 'pending', :address, :phone, :payment_method, :coupon_code, :discount_amount)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':total_price', $total_price);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':payment_method', $payment_method);
            $stmt->bindParam(':coupon_code', $coupon_code);
            $stmt->bindParam(':discount_amount', $discount_amount);
            $stmt->execute();

            $order_id = $this->conn->lastInsertId();

            // Insert into order_details table
            $query_detail = "INSERT INTO " . $this->table_details . " (order_id, product_id, quantity, price) 
                             VALUES (:order_id, :product_id, :quantity, :price)";
            $stmt_detail = $this->conn->prepare($query_detail);

            foreach ($cart_items as $item) {
                // Ensure item has 'id', use $item['id'] or whatever key you have in session
                $pid = isset($item['id']) ? $item['id'] : 0; 
                $stmt_detail->bindParam(':order_id', $order_id);
                $stmt_detail->bindParam(':product_id', $pid);
                $stmt_detail->bindParam(':quantity', $item['quantity']);
                $stmt_detail->bindParam(':price', $item['price']);
                $stmt_detail->execute();
            }

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack();
            error_log($e->getMessage());
            return false;
        }
    }

    public function getOrdersByUser($user_id)
    {
        $query = "SELECT * FROM " . $this->table_orders . " WHERE user_id = :user_id ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAllOrders()
    {
        $query = "SELECT o.*, u.name as user_name FROM " . $this->table_orders . " o 
                  LEFT JOIN users u ON o.user_id = u.id ORDER BY o.created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getOrderDetails($order_id)
    {
        $query = "SELECT d.*, p.name as product_name, p.image 
                  FROM " . $this->table_details . " d 
                  LEFT JOIN product p ON d.product_id = p.id 
                  WHERE d.order_id = :order_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':order_id', $order_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function updateOrderStatus($order_id, $status)
    {
        $query = "UPDATE " . $this->table_orders . " SET status = :status WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':id', $order_id);
        return $stmt->execute();
    }
}
?>

