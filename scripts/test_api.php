<?php
// Script kiểm thử API tự động (Test JWT Auth & Routes)
header('Content-Type: text/plain; charset=utf-8');
echo "=== BẮT ĐẦU KIỂM THỬ API JWT ===\n\n";

$base_url = "http://" . $_SERVER['HTTP_HOST'] . "/webbanhang/index.php?url=";
if (php_sapi_name() === 'cli') {
    $base_url = "http://localhost/webbanhang/index.php?url=";
}

function curl_request($url, $method = 'GET', $data = null, $token = null) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    
    $headers = ['Content-Type: application/json'];
    if ($token) {
        $headers[] = 'Authorization: Bearer ' . $token;
    }
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    if ($data && ($method === 'POST' || $method === 'PUT')) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return ['code' => $httpCode, 'body' => json_decode($response, true)];
}

// 1. Kiểm tra API Sản phẩm không token (phải bị chặn 401 hoặc 403 nếu là POST)
echo "1. Thử tạo sản phẩm KHÔNG token...\n";
$res1 = curl_request($base_url . "products", "POST", ["name" => "Test"]);
if ($res1['code'] === 401 || $res1['code'] === 403) {
    echo "=> THÀNH CÔNG: API đã chặn truy cập trái phép (Code: {$res1['code']})\n";
} else {
    echo "=> THẤT BẠI: API không chặn (Code: {$res1['code']})\n";
}

echo "\n2. Thử gọi API Đăng nhập (với admin mặc định)...\n";
// (Tài khoản admin mặc định dựa trên cấu trúc database, có thể khác thực tế)
$res2 = curl_request($base_url . "authApi/login", "POST", ["email" => "admin@example.com", "password" => "admin123"]);
if ($res2['code'] === 200 && isset($res2['body']['token'])) {
    echo "=> THÀNH CÔNG: Đã lấy được JWT Token: " . substr($res2['body']['token'], 0, 20) . "...\n";
    $token = $res2['body']['token'];
    
    echo "\n3. Thử tạo danh mục CÓ token Admin...\n";
    $res3 = curl_request($base_url . "categories", "POST", ["name" => "Danh mục Test", "description" => "Test"], $token);
    if ($res3['code'] === 201 || $res3['code'] === 200) {
         echo "=> THÀNH CÔNG: Đã tạo danh mục thành công.\n";
    } else {
         echo "=> CÓ THỂ THẤT BẠI: Code: {$res3['code']} - " . json_encode($res3['body']) . "\n";
    }
} else {
    echo "=> KHÔNG THỂ TEST TIẾP DO LOGIN FAILED (Điều này bình thường nếu email/pass không đúng trong DB hiện tại). Code: {$res2['code']} - " . json_encode($res2['body']) . "\n";
}

echo "\n=== HOÀN TẤT KIỂM THỬ ===";
?>
