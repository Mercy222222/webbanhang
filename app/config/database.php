<?php
class Database {
    private $host = "localhost";
    private $db_name = "my_store";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            // Sử dụng dấu chấm (.) để nối các biến vào chuỗi kết nối
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            
            // Thiết lập mã hóa utf8 để không bị lỗi font tiếng Việt
            $this->conn->exec("set names utf8");
            
            // Auto migration to fix missing columns/tables
            $this->conn->exec("CREATE TABLE IF NOT EXISTS `coupons` (
              `id` int(11) NOT NULL AUTO_INCREMENT,
              `code` varchar(50) NOT NULL UNIQUE,
              `discount_type` enum('fixed', 'percentage') NOT NULL,
              `discount_value` decimal(15,2) NOT NULL,
              `expiry_date` date DEFAULT NULL,
              PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

            // Check and add missing columns in orders table
            $stmt = $this->conn->query("SHOW COLUMNS FROM `orders` LIKE 'payment_method'");
            if ($stmt->rowCount() == 0) {
                $this->conn->exec("ALTER TABLE `orders` ADD COLUMN `payment_method` varchar(50) DEFAULT 'cod'");
            }
            $stmt = $this->conn->query("SHOW COLUMNS FROM `orders` LIKE 'coupon_code'");
            if ($stmt->rowCount() == 0) {
                $this->conn->exec("ALTER TABLE `orders` ADD COLUMN `coupon_code` varchar(50) DEFAULT NULL");
            }
            $stmt = $this->conn->query("SHOW COLUMNS FROM `orders` LIKE 'discount_amount'");
            if ($stmt->rowCount() == 0) {
                $this->conn->exec("ALTER TABLE `orders` ADD COLUMN `discount_amount` decimal(15,2) DEFAULT 0.00");
            }

            // Ensure status column supports confirmed and shipping
            $this->conn->exec("ALTER TABLE `orders` MODIFY COLUMN `status` enum('pending','confirmed','shipping','completed','cancelled') DEFAULT 'pending'");
            
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>