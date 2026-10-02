<?php
/**
 * WeatherCast - Database Connection
 * Connects PHP to MySQL using PDO with error handling
 */

// Database configuration
$db_host = 'localhost';
$db_name = 'weathercast';
$db_user = 'root';
$db_pass = ''; // Default XAMPP MySQL password is empty

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

try {
    $pdo = new PDO(
        "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
        $db_user,
        $db_pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to connect to the database.'
    ]);
    exit;
}
