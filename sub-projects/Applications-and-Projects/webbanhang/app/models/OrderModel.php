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

    public function createOrder($user_id, $total_price, $phone, $address, $cart_items)
    {
        try {
            $this->conn->beginTransaction();

            // Get user info for the order
            $userQuery = "SELECT fullname, email FROM users WHERE id = :uid";
            $userStmt = $this->conn->prepare($userQuery);
            $userStmt->bindParam(':uid', $user_id);
            $userStmt->execute();
            $userInfo = $userStmt->fetch(PDO::FETCH_ASSOC);

            $fullname = $userInfo ? $userInfo['fullname'] : '';
            $email = $userInfo ? $userInfo['email'] : '';

            // Insert into orders table (matching actual DB schema: fullname, email, phone, address)
            $query = "INSERT INTO " . $this->table_orders . " (user_id, fullname, email, phone, address, total_price, status) 
                      VALUES (:user_id, :fullname, :email, :phone, :address, :total_price, 'Pending')";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':fullname', $fullname);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':phone', $phone);
            $stmt->bindParam(':address', $address);
            $stmt->bindParam(':total_price', $total_price);
            $stmt->execute();

            $order_id = $this->conn->lastInsertId();

            // Insert into order_details table
            $query_detail = "INSERT INTO " . $this->table_details . " (order_id, product_id, quantity, price) 
                             VALUES (:order_id, :product_id, :quantity, :price)";
            $stmt_detail = $this->conn->prepare($query_detail);

            foreach ($cart_items as $item) {
                $stmt_detail->bindParam(':order_id', $order_id);
                $stmt_detail->bindParam(':product_id', $item['id']);
                $stmt_detail->bindParam(':quantity', $item['quantity']);
                $stmt_detail->bindParam(':price', $item['price']);
                $stmt_detail->execute();
            }

            $this->conn->commit();
            return true;
        } catch (Exception $e) {
            $this->conn->rollBack();
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
        $query = "SELECT o.*, u.fullname as user_name FROM " . $this->table_orders . " o 
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
