<?php
class UserModel
{
    private $conn;
    private $table_name = "users";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function register($name, $email, $password)
    {
        // Check if email exists
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return false; // Email already exists
        }

        // Check if username exists
        $query2 = "SELECT id FROM " . $this->table_name . " WHERE username = :username";
        $stmt2 = $this->conn->prepare($query2);
        $stmt2->bindParam(':username', $name);
        $stmt2->execute();

        if ($stmt2->rowCount() > 0) {
            return false; // Username already exists
        }

        // Insert new user (matching actual DB: username, password, fullname, email, role)
        $query = "INSERT INTO " . $this->table_name . " (username, email, password, fullname) VALUES (:username, :email, :password, :fullname)";
        $stmt = $this->conn->prepare($query);

        $name = htmlspecialchars(strip_tags($name));
        $email = htmlspecialchars(strip_tags($email));
        $password_hashed = password_hash($password, PASSWORD_BCRYPT);

        $stmt->bindParam(':username', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password_hashed);
        $stmt->bindParam(':fullname', $name);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function login($email, $password)
    {
        // DB has: id, username, password, fullname, email, phone, role, created_at
        $query = "SELECT id, username, fullname, email, password, role FROM " . $this->table_name . " WHERE email = :email LIMIT 0,1";
        $stmt = $this->conn->prepare($query);

        $email = htmlspecialchars(strip_tags($email));
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if (password_verify($password, $row['password'])) {
                // Return with 'name' key for backward compatibility with AuthController
                $row['name'] = $row['fullname'];
                return $row;
            }
        }
        return false;
    }

    public function getUserById($id)
    {
        $query = "SELECT id, username, fullname, email, role, created_at FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>
