<?php
class CouponModel
{
    private $conn;
    private $table_name = "coupons";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getCouponByCode($code)
    {
        $query = "SELECT id, code, discount_type, discount_value, expiry_date 
                  FROM " . $this->table_name . " 
                  WHERE code = :code LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $code = htmlspecialchars(strip_tags($code));
        $stmt->bindParam(':code', $code);
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Check if coupon has expired
            if ($row['expiry_date'] !== null) {
                $expiry = strtotime($row['expiry_date']);
                $today = strtotime(date('Y-m-d'));
                if ($today > $expiry) {
                    return false; // Coupon expired
                }
            }
            return $row;
        }
        return false; // Coupon not found
    }
}
?>
