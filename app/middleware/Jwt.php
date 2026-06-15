<?php
class Jwt
{
    private static $secret = 'WebBanHang_SecretKey_2026_!@#';

    public static function encode($payload)
    {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $header = self::base64UrlEncode($header);
        
        $payload['iat'] = time();
        $payload['exp'] = time() + (86400 * 7); // Token valid for 7 days
        $payload = json_encode($payload);
        $payload = self::base64UrlEncode($payload);
        
        $signature = hash_hmac('sha256', $header . "." . $payload, self::$secret, true);
        $signature = self::base64UrlEncode($signature);
        
        return $header . "." . $payload . "." . $signature;
    }

    public static function decode($token)
    {
        $parts = explode('.', $token);
        if (count($parts) !== 3) {
            return false;
        }

        list($header, $payload, $signature) = $parts;

        $valid_signature = hash_hmac('sha256', $header . "." . $payload, self::$secret, true);
        $valid_signature = self::base64UrlEncode($valid_signature);

        if (!hash_equals($valid_signature, $signature)) {
            return false; // Invalid signature
        }

        $payload_decoded = json_decode(self::base64UrlDecode($payload), true);
        
        if (isset($payload_decoded['exp']) && $payload_decoded['exp'] < time()) {
            return false; // Token expired
        }

        return $payload_decoded;
    }

    private static function base64UrlEncode($data)
    {
        return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
    }

    private static function base64UrlDecode($data)
    {
        $remainder = strlen($data) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $data .= str_repeat('=', $padlen);
        }
        return base64_decode(str_replace(['-', '_'], ['+', '/'], $data));
    }
}
?>
