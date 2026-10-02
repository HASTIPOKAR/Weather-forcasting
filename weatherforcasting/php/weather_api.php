<?php
/**
 * WeatherCast - Weather API Proxy
 * Routes API requests through PHP to protect the API key
 */

header('Content-Type: application/json');

// OpenWeather API Key — keep this server-side only
$api_key = 'YOUR_OPENWEATHER_API_KEY';

$city = trim($_GET['city'] ?? '');
$type = trim($_GET['type'] ?? 'weather'); // 'weather' or 'forecast'

if (empty($city)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a city name.']);
    exit;
}

// Build API URL
if ($type === 'forecast') {
    $url = "https://api.openweathermap.org/data/2.5/forecast?q=" . urlencode($city) . "&appid=$api_key&units=metric";
} else {
    $url = "https://api.openweathermap.org/data/2.5/weather?q=" . urlencode($city) . "&appid=$api_key&units=metric";
}

// Make request
$context = stream_context_create([
    'http' => [
        'timeout' => 10,
        'ignore_errors' => true
    ]
]);

$response = @file_get_contents($url, false, $context);

if ($response === false) {
    http_response_code(503);
    echo json_encode(['success' => false, 'message' => 'Unable to retrieve weather information. Please try again later.']);
    exit;
}

// Pass through the API response
$http_code = 200;
if (isset($http_response_header)) {
    foreach ($http_response_header as $header) {
        if (preg_match('/^HTTP\/\S+\s+(\d+)/', $header, $matches)) {
            $http_code = (int) $matches[1];
        }
    }
}

if ($http_code === 404) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'City not found. Please check the city name.']);
    exit;
}

if ($http_code !== 200) {
    http_response_code($http_code);
    echo json_encode(['success' => false, 'message' => 'Unable to retrieve weather information. Please try again later.']);
    exit;
}

echo $response;
