<?php
/**
 * WeatherCast - Get Search History
 * Returns search history for logged-in users
 */

require_once 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id'];

try {
    $stmt = $pdo->prepare(
        'SELECT id, city, temperature, weather_condition, searched_at 
         FROM search_history 
         WHERE user_id = ? 
         ORDER BY searched_at DESC 
         LIMIT 50'
    );
    $stmt->execute([$user_id]);
    $history = $stmt->fetchAll();

    echo json_encode(['success' => true, 'history' => $history]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to load search history.']);
}
