<?php
/**
 * WeatherCast - Logout
 * Destroys user session and logs out
 */

require_once 'db.php';

header('Content-Type: application/json');

// Destroy session
$_SESSION = [];

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

session_destroy();

echo json_encode(['success' => true, 'message' => 'Logged out successfully.']);
