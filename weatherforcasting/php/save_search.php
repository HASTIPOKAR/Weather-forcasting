<?php
/**
 * WeatherCast - Save Search History
 * Saves weather search data for logged-in users
 */

require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id'];
$city = trim($_POST['city'] ?? '');
$temperature = $_POST['temperature'] ?? null;
$weather_condition = trim($_POST['weather_condition'] ?? '');

if (empty($city)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'City is required.']);
    exit;
}

try {
    $stmt = $pdo->prepare(
        'INSERT INTO search_history (user_id, city, temperature, weather_condition) VALUES (?, ?, ?, ?)'
    );
    $stmt->execute([$user_id, $city, $temperature, $weather_condition]);

    echo json_encode(['success' => true, 'message' => 'Search saved.']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save search history.']);
}
