<?php
require_once 'app/config/database.php';

$db = new Database();
$conn = $db->getConnection();

$uploadDir = __DIR__ . '/public/uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$query = "SELECT id, image FROM product WHERE image LIKE 'http%';";
$stmt = $conn->prepare($query);
$stmt->execute();
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($products as $product) {
    $url = $product['image'];
    $pathInfo = pathinfo(parse_url($url, PHP_URL_PATH));
    $ext = isset($pathInfo['extension']) ? $pathInfo['extension'] : 'jpg';
    $filename = 'product_' . $product['id'] . '.' . $ext;
    $localPath = $uploadDir . $filename;

    // Download image
    $imageData = @file_get_contents($url);
    if ($imageData === false) {
        echo "Failed to download {$url}\n";
        continue;
    }
    file_put_contents($localPath, $imageData);

    // Update DB to point to local file (relative to web root)
    $relativePath = 'uploads/' . $filename;
    $upd = $conn->prepare('UPDATE product SET image = :img WHERE id = :id');
    $upd->execute([':img' => $relativePath, ':id' => $product['id']]);
    echo "Updated product {$product['id']} with {$relativePath}\n";
}
?>
