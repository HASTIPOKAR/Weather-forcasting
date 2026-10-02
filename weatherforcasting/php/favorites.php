<?php
/**
 * WeatherCast - Favourite Cities
 * Handles: add, remove, and list favourite cities for logged-in users
 */

require_once 'db.php';

header('Content-Type: application/json');

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id'];
$method = $_SERVER['REQUEST_METHOD'];

// GET — list favourites
if ($method === 'GET') {
    try {
        $stmt = $pdo->prepare('SELECT id, city, created_at FROM favorites WHERE user_id = ? ORDER BY created_at DESC');
        $stmt->execute([$user_id]);
        $favorites = $stmt->fetchAll();

        echo json_encode(['success' => true, 'favorites' => $favorites]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to load favourites.']);
    }
    exit;
}

// POST — add or remove favourite
if ($method === 'POST') {
    $action = $_POST['action'] ?? 'add';
    $city = trim($_POST['city'] ?? '');

    if (empty($city)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'City is required.']);
        exit;
    }

    try {
        if ($action === 'remove') {
            $stmt = $pdo->prepare('DELETE FROM favorites WHERE user_id = ? AND city = ?');
            $stmt->execute([$user_id, $city]);
            echo json_encode(['success' => true, 'message' => 'City removed from favourites.']);
        } else {
            // Check if already exists
            $stmt = $pdo->prepare('SELECT id FROM favorites WHERE user_id = ? AND city = ?');
            $stmt->execute([$user_id, $city]);

            if ($stmt->fetch()) {
                echo json_encode(['success' => false, 'message' => 'City is already in your favourites.']);
                exit;
            }

            $stmt = $pdo->prepare('INSERT INTO favorites (user_id, city) VALUES (?, ?)');
            $stmt->execute([$user_id, $city]);
            echo json_encode(['success' => true, 'message' => 'City added to favourites!']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Failed to update favourites.']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
