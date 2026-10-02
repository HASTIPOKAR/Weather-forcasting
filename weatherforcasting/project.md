# WeatherCast -- Weather Forecasting Website

## 1. Project Overview

**Project Name:** WeatherCast\
**Project Type:** Full-Stack Web Application\
**Project Topic:** Weather Forecasting Website\
**Purpose:** To provide users with current weather information and
short-term forecasts for a searched city through a simple, responsive
web interface.

WeatherCast is a web-based weather application that allows users to
search for a city and view weather information such as temperature,
weather condition, humidity, wind speed, pressure, weather icons, and a
multi-day forecast.

The project uses frontend technologies for the user interface,
JavaScript for dynamic weather data, PHP for server-side/backend
functionality, MySQL for database management, and a weather API for live
weather information.

------------------------------------------------------------------------

## 2. Problem Statement

People need quick and accessible weather information for planning daily
activities, travel, education, work, and other outdoor activities.
Weather information can be difficult to understand when it is presented
across different sources.

The proposed WeatherCast system provides a simple interface where a user
can search for a city and view its current weather and forecast in one
place.

------------------------------------------------------------------------

## 3. Objectives

-   To develop a user-friendly weather forecasting website.
-   To allow users to search for weather by city name.
-   To display real-time/current weather information.
-   To display temperature, humidity, wind speed, pressure, and weather
    conditions.
-   To display appropriate weather icons.
-   To provide a multi-day weather forecast.
-   To use PHP for backend processing.
-   To use MySQL for storing application data.
-   To implement user registration and login.
-   To maintain search history for users.
-   To provide a favourite-city feature.
-   To create a responsive website that works on desktop and mobile
    screens.
-   To demonstrate integration of HTML, CSS, JavaScript, PHP, MySQL, and
    an external weather API.

------------------------------------------------------------------------

# 4. Technology Stack

## Frontend

### HTML5

Used to create the structure of the website.

Main uses: - Navigation bar - Search form - Weather cards - Forecast
cards - Login and registration forms - About and Contact sections

### CSS3

Used for: - Website design - Colors - Layout - Cards - Buttons -
Navigation - Responsive design - Hover effects - Mobile compatibility

### JavaScript

Used for: - Reading the city entered by the user - Handling the Search
button - Calling the weather API - Processing JSON weather data -
Updating the webpage dynamically - Displaying weather icons - Displaying
forecast information - Input validation - Error handling

------------------------------------------------------------------------

## Backend

### PHP

Used for server-side operations.

Planned uses: - Database connection - User registration - Login
authentication - Logout - Saving search history - Managing favourite
cities - Retrieving stored user information

------------------------------------------------------------------------

## Database

### MySQL

Used to store application data.

Planned database information: - User accounts - Search history -
Favourite cities

------------------------------------------------------------------------

## External API

### OpenWeather API

Used to retrieve live weather information.

Possible information: - City name - Temperature - Weather condition -
Weather description - Humidity - Wind speed - Atmospheric pressure -
Weather icon - Forecast information

------------------------------------------------------------------------

## Development Tools

-   Visual Studio Code
-   XAMPP
-   Apache
-   MySQL
-   phpMyAdmin
-   Web Browser
-   Git/GitHub (optional)

------------------------------------------------------------------------

# 5. System Architecture

The application can be represented as:

``` text
                  USER
                    |
                    v
             HTML + CSS Interface
                    |
                    v
               JavaScript
              /          \
             /            \
            v              v
     OpenWeather API      PHP Backend
                           |
                           v
                        MySQL
```

### Data Flow

``` text
User enters city
       |
       v
JavaScript receives city
       |
       v
Weather API request
       |
       v
API returns JSON data
       |
       v
JavaScript processes data
       |
       v
Weather information displayed
```

For backend features:

``` text
User
 |
 v
HTML Form
 |
 v
PHP
 |
 v
MySQL Database
 |
 v
Response to User
```

------------------------------------------------------------------------

# 6. Project Phases

## Phase 1 -- Requirement Analysis

### Activities

-   Identify the project topic.
-   Identify the target users.
-   Define the required weather information.
-   Decide frontend and backend technologies.
-   Decide database requirements.
-   Select a weather API.

### Expected Output

A complete project requirement list.

------------------------------------------------------------------------

# Phase 2 -- Project Planning

### Activities

-   Define project modules.
-   Design folder structure.
-   Decide database tables.
-   Decide website pages.
-   Plan API integration.
-   Plan testing.

### Main Modules

1.  Home
2.  Weather Search
3.  Current Weather
4.  Forecast
5.  User Registration
6.  User Login
7.  Search History
8.  Favourite Cities
9.  About
10. Contact

------------------------------------------------------------------------

# Phase 3 -- UI/UX Design

### Website Pages

### Home Page

Contains: - WeatherCast logo/name - Navigation - City search box -
Current weather - Weather details - Forecast

### Forecast Page

Contains: - City search - Multi-day forecast - Temperature - Weather
condition - Weather icons

### Login Page

Contains: - Email - Password - Login button

### Registration Page

Contains: - Name - Email - Password - Confirm password - Register button

### About Page

Contains: - Project description - Project objectives - Technology
information

### Contact Page

Contains: - Name - Email - Message - Submit button

------------------------------------------------------------------------

# Phase 4 -- HTML Development

### Main HTML File

``` text
html/weather.html
```

### HTML responsibilities

-   Create webpage structure
-   Create navigation
-   Create search input
-   Create buttons
-   Create weather section
-   Create forecast section
-   Create footer
-   Provide IDs/classes for JavaScript and CSS

### Example

``` html
<input type="text" id="cityInput" placeholder="Enter city name">
<button id="searchBtn">Search</button>
```

------------------------------------------------------------------------

# Phase 5 -- CSS Development

### Main CSS File

``` text
css/weather.css
```

### CSS responsibilities

-   Website layout
-   Navigation design
-   Weather cards
-   Forecast cards
-   Buttons
-   Search box
-   Responsive design
-   Hover effects

### Responsive Design

The website should work on: - Laptop - Desktop - Tablet - Mobile

------------------------------------------------------------------------

# Phase 6 -- JavaScript Development

### Main JavaScript File

``` text
js/weather.js
```

### JavaScript responsibilities

1.  Get city name from input.
2.  Validate the input.
3.  Send request to weather API.
4.  Receive API response.
5.  Convert/process JSON data.
6.  Display temperature.
7.  Display city name.
8.  Display weather condition.
9.  Display humidity.
10. Display wind speed.
11. Display pressure.
12. Display weather icon.
13. Display forecast.
14. Handle invalid city/API errors.

### Basic Flow

``` text
Search Button
     |
     v
Get City
     |
     v
Validate Input
     |
     v
Call API
     |
     v
Receive JSON
     |
     v
Display Weather
```

------------------------------------------------------------------------

# Phase 7 -- Weather API Integration

### API Purpose

The API provides real weather data instead of fixed/sample values.

### Example Request Concept

``` text
City → API → JSON Response → JavaScript → Webpage
```

### Current Weather Data

The application can use: - Temperature - Humidity - Wind speed -
Pressure - Weather description - Weather icon

### API Key

The API key must be kept private.

Recommended practice for a production application: - Do not publish the
API key in a public GitHub repository. - Prefer routing API requests
through a backend service when appropriate. - Use environment variables
or server-side configuration for secrets.

------------------------------------------------------------------------

# Phase 8 -- PHP Backend Development

Create:

``` text
php/
```

Main PHP files:

``` text
php/
├── db.php               ← Database connection (PDO)
├── register.php         ← User registration
├── login.php            ← User login & authentication
├── logout.php           ← Session destroy & logout
├── session_check.php    ← Check if user is logged in
├── weather_api.php      ← Weather API proxy (protects API key)
├── save_search.php      ← Save search to history
├── get_history.php      ← Retrieve search history
├── favorites.php        ← Add/remove/list favourite cities
└── contact.php          ← Contact form handler
```

### db.php -- Database Connection

Responsible for: - Connecting PHP to MySQL using PDO - Starting PHP sessions - Handling database connection errors

``` php
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
```

**Key Concepts:**
- **PDO** (PHP Data Objects) is a secure, database-agnostic way to connect to MySQL
- `ERRMODE_EXCEPTION` throws exceptions on errors instead of silent failures
- `FETCH_ASSOC` returns results as associative arrays
- `EMULATE_PREPARES => false` uses real prepared statements for SQL injection protection
- `session_start()` starts PHP sessions for user login tracking

### register.php -- User Registration

Responsible for: - Receiving registration form data - Validating input - Checking duplicate email - Hashing passwords using bcrypt - Saving users in MySQL

``` php
<?php
/**
 * WeatherCast - User Registration
 * Handles: validation, duplicate email check, password hashing, saving to MySQL
 */

require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Get POST data
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

// Validate inputs
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required.';
} elseif (strlen($name) > 100) {
    $errors[] = 'Name must be under 100 characters.';
}

if (empty($email)) {
    $errors[] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if (empty($password)) {
    $errors[] = 'Password is required.';
} elseif (strlen($password) < 6) {
    $errors[] = 'Password must be at least 6 characters.';
}

if ($password !== $confirm_password) {
    $errors[] = 'Passwords do not match.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

try {
    // Check for duplicate email
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);

    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'An account with this email already exists.']);
        exit;
    }

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insert user
    $stmt = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
    $stmt->execute([$name, $email, $hashed_password]);

    echo json_encode(['success' => true, 'message' => 'Registration successful! You can now log in.']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again later.']);
}
```

**Key Concepts:**
- `password_hash(PASSWORD_BCRYPT)` securely hashes the password (never stores plain text)
- `prepare()` + `execute()` uses prepared statements to prevent SQL injection
- `filter_var(FILTER_VALIDATE_EMAIL)` validates email format
- HTTP 409 indicates conflict (email already exists)

### login.php -- User Login

Responsible for: - Checking email and password - Verifying hashed password - Creating a user session - Returning user data as JSON

``` php
<?php
/**
 * WeatherCast - User Login
 * Handles: email/password validation, session creation, authentication
 */

require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';

// Validate inputs
if (empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

try {
    // Look up user
    $stmt = $pdo->prepare('SELECT id, name, email, password FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid email or password.']);
        exit;
    }

    // Create session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['user_email'] = $user['email'];

    echo json_encode([
        'success' => true,
        'message' => 'Login successful!',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ]
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Login failed. Please try again later.']);
}
```

**Key Concepts:**
- `password_verify()` compares plain-text password with the stored bcrypt hash
- `$_SESSION` stores user data server-side across page requests
- Same error message for wrong email/password (security best practice)

### logout.php -- User Logout

Responsible for: - Clearing session variables - Expiring session cookie - Destroying the PHP session

``` php
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
```

### session_check.php -- Session Status Check

Responsible for: - Checking if user is currently logged in - Returning user data if logged in - Used by frontend JavaScript on page load

``` php
<?php
/**
 * WeatherCast - Session Check
 * Returns current user session status
 */

require_once 'db.php';

header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    echo json_encode([
        'logged_in' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'name' => $_SESSION['user_name'],
            'email' => $_SESSION['user_email']
        ]
    ]);
} else {
    echo json_encode(['logged_in' => false]);
}
```

### weather_api.php -- Weather API Proxy

Responsible for: - Hiding the API key on the server side - Building API URL for current weather or forecast - Making HTTP request to OpenWeatherMap - Forwarding response to frontend

``` php
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
```

**Key Concepts:**
- API key stays on the server (never exposed to the browser)
- `urlencode()` safely encodes city names with spaces/special characters
- `file_get_contents()` makes HTTP requests from PHP to the external API

### save_search.php -- Save Search History

Responsible for: - Saving weather search data for logged-in users - Storing city, temperature, and weather condition in MySQL

``` php
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
```

### get_history.php -- Get Search History

Responsible for: - Retrieving the last 50 weather searches for the logged-in user - Returning data as JSON

``` php
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
```

### favorites.php -- Favourite Cities

Responsible for: - Adding a city to favourites - Removing a city from favourites - Listing all favourite cities for a user - Preventing duplicate entries

``` php
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
```

### contact.php -- Contact Form Handler

Responsible for: - Receiving contact form data - Validating name, email, and message - Saving messages to MySQL

``` php
<?php
/**
 * WeatherCast - Contact Form Handler
 * Saves contact form messages to database
 */

require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid email is required.';
}
if (empty($message)) {
    $errors[] = 'Message is required.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)');
    $stmt->execute([$name, $email, $message]);

    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent successfully.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
}
```

------------------------------------------------------------------------

# Phase 9 -- MySQL Database Development

## Database Name

``` text
weathercast
```

## Complete SQL Schema (weathercast.sql)

``` sql
-- WeatherCast Database Setup
-- Run this script in phpMyAdmin or MySQL command line

CREATE DATABASE IF NOT EXISTS weathercast;
USE weathercast;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Search history table
CREATE TABLE IF NOT EXISTS search_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    city VARCHAR(100) NOT NULL,
    temperature DECIMAL(5,2) DEFAULT NULL,
    weather_condition VARCHAR(100) DEFAULT NULL,
    searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_city (user_id, city),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contact messages table (for the contact form)
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## Table 1 -- users

  Field        | Type           | Purpose
  ------------ | -------------- | -------------------
  id           | INT            | Primary key (AUTO_INCREMENT)
  name         | VARCHAR(100)   | User name
  email        | VARCHAR(100)   | User email (UNIQUE)
  password     | VARCHAR(255)   | Hashed password (bcrypt)
  created_at   | TIMESTAMP      | Registration time

## Table 2 -- search_history

  Field               | Type           | Purpose
  ------------------- | -------------- | -------------------
  id                  | INT            | Primary key
  user_id             | INT            | Foreign key → users(id)
  city                | VARCHAR(100)   | Searched city
  temperature         | DECIMAL(5,2)   | Temperature in °C
  weather_condition   | VARCHAR(100)   | Weather description
  searched_at         | TIMESTAMP      | Search time

## Table 3 -- favorites

  Field        | Type           | Purpose
  ------------ | -------------- | ----------------
  id           | INT            | Primary key
  user_id      | INT            | Foreign key → users(id)
  city         | VARCHAR(100)   | Favourite city
  created_at   | TIMESTAMP      | Added time

## Table 4 -- contact_messages

  Field        | Type           | Purpose
  ------------ | -------------- | ----------------
  id           | INT            | Primary key
  name         | VARCHAR(100)   | Sender name
  email        | VARCHAR(100)   | Sender email
  message      | TEXT           | Message content
  created_at   | TIMESTAMP      | Sent time

## Key Database Concepts Used

- **AUTO_INCREMENT** -- Automatically generates unique IDs
- **FOREIGN KEY ... ON DELETE CASCADE** -- Deleting a user removes their history and favorites
- **UNIQUE KEY** -- Prevents duplicate city entries per user in favorites
- **ENGINE=InnoDB** -- Supports transactions and foreign keys
- **utf8mb4** -- Supports all Unicode characters including emojis

------------------------------------------------------------------------

# Phase 10 -- Authentication

The application can provide:

### Registration

``` text
Name
Email
Password
Confirm Password
        |
        v
     Register
        |
        v
      MySQL
```

### Login

``` text
Email
Password
   |
   v
PHP Validation
   |
   v
MySQL
   |
   v
User Session
```

### Security

-   Use password hashing.
-   Use prepared SQL statements.
-   Validate user input.
-   Use sessions for authentication.
-   Do not store plain-text passwords.
-   Do not expose database credentials publicly.

------------------------------------------------------------------------

# Phase 11 -- Search History

After a logged-in user searches for a city:

``` text
City Search
    |
    v
Weather API
    |
    v
Weather Result
    |
    v
PHP
    |
    v
MySQL
    |
    v
Search History
```

Example:

``` text
Ahmedabad - 30°C - Clear
Surat - 29°C - Clouds
Mumbai - 28°C - Rain
```

------------------------------------------------------------------------

# Phase 12 -- Favourite Cities

Users can save frequently searched cities.

Example:

``` text
My Favourite Cities

⭐ Ahmedabad
⭐ Surat
⭐ Mumbai
⭐ Delhi
```

The favourite cities are stored in MySQL and linked to the logged-in
user.

------------------------------------------------------------------------

# Phase 13 -- Error Handling

The application should handle:

### Empty Search

``` text
Please enter a city name.
```

### Invalid City

``` text
City not found. Please check the city name.
```

### API Error

``` text
Unable to retrieve weather information.
Please try again later.
```

### Database Error

``` text
Unable to connect to the database.
```

### Network Error

``` text
Please check your internet connection.
```

------------------------------------------------------------------------

# Phase 14 -- Testing

## Functional Testing

  Test                         Expected Result
  ---------------------------- -----------------------------
  Enter valid city             Weather displayed
  Enter invalid city           Error displayed
  Empty search                 Validation message
  Search Ahmedabad             Ahmedabad weather displayed
  Search Surat                 Surat weather displayed
  Register user                User stored in database
  Login with correct details   Login successful
  Login with wrong details     Error message
  Add favourite                City saved
  View history                 Previous searches displayed

------------------------------------------------------------------------

# Phase 15 -- Security Testing

Check: - Password hashing - SQL injection protection - Input
validation - Session security - API key protection - Unauthorized
access - Database permissions

------------------------------------------------------------------------

# Phase 16 -- Responsive Testing

Test the website on:

-   Desktop
-   Laptop
-   Tablet
-   Mobile

Check: - Navigation - Search box - Weather card - Forecast cards - Login
form - Registration form

------------------------------------------------------------------------

# Phase 17 -- Final Project Structure

Recommended final structure:

``` text
WeatherCast/
│
├── html/
│   ├── weather.html
│   ├── login.html
│   ├── register.html
│   ├── forecast.html
│   ├── about.html
│   └── contact.html
│
├── css/
│   ├── weather.css
│   ├── login.css
│   └── responsive.css
│
├── js/
│   ├── weather.js
│   ├── login.js
│   └── validation.js
│
├── php/
│   ├── db.php
│   ├── register.php
│   ├── login.php
│   ├── logout.php
│   ├── save_search.php
│   └── favorites.php
│
├── database/
│   └── weathercast.sql
│
├── images/
│   └── logo.png
│
└── README.md
```

------------------------------------------------------------------------

# 7. Required Software

Before development, install/configure:

``` text
Visual Studio Code
XAMPP
Google Chrome / Microsoft Edge
OpenWeather API account
```

XAMPP services:

``` text
Apache → PHP server
MySQL → Database server
phpMyAdmin → Database management
```

------------------------------------------------------------------------

# 8. Deployment Environment

## Local Development

Project location:

``` text
C:\xampp\htdocs\WeatherCast
```

Website:

``` text
http://localhost/WeatherCast/
```

PHP files are accessed through Apache rather than opening them directly
from File Explorer.

------------------------------------------------------------------------

# 9. Future Enhancements

Possible future features:

-   Automatic location/weather detection
-   Celsius/Fahrenheit switch
-   Dark mode
-   Weather alerts
-   Air-quality information
-   Sunrise/sunset information
-   Hourly forecast
-   More detailed charts
-   Weather map
-   User profile
-   Password reset
-   Progressive Web App (PWA)
-   Deployment to a public hosting service

------------------------------------------------------------------------

# 10. Project Deliverables

The final project can contain:

1.  Working WeatherCast website
2.  HTML source code
3.  CSS source code
4.  JavaScript source code
5.  PHP backend
6.  MySQL database
7.  SQL database export
8.  Project documentation
9.  Screenshots of working modules
10. Testing report
11. Presentation/PPT
12. Project demonstration

------------------------------------------------------------------------

# 11. Current Development Status

### Completed

-   [x] Project topic selected
-   [x] HTML structure
-   [x] CSS design
-   [x] JavaScript interaction
-   [x] Weather API integration
-   [x] Current weather display
-   [x] Weather icon
-   [x] Forecast section

### Remaining

-   [ ] XAMPP setup
-   [ ] PHP folder
-   [ ] MySQL database
-   [ ] Database connection
-   [ ] Registration
-   [ ] Login
-   [ ] Logout
-   [ ] Search history
-   [ ] Favourite cities
-   [ ] Backend validation
-   [ ] Security testing
-   [ ] Final testing
-   [ ] Documentation
-   [ ] PPT
-   [ ] Final project demonstration

------------------------------------------------------------------------

# 12. Development Roadmap

``` text
PHASE 1
Requirements
     ↓
PHASE 2
Planning
     ↓
PHASE 3
UI/UX Design
     ↓
PHASE 4
HTML
     ↓
PHASE 5
CSS
     ↓
PHASE 6
JavaScript
     ↓
PHASE 7
Weather API
     ↓
PHASE 8
PHP Backend
     ↓
PHASE 9
MySQL Database
     ↓
PHASE 10
Login/Register
     ↓
PHASE 11
Search History
     ↓
PHASE 12
Favourite Cities
     ↓
PHASE 13
Testing
     ↓
PHASE 14
Security
     ↓
PHASE 15
Documentation
     ↓
FINAL WEATHERCAST PROJECT
```

------------------------------------------------------------------------

# 13. Project Summary

WeatherCast is a full-stack weather forecasting web application
developed using HTML5, CSS3, JavaScript, PHP, MySQL, and a weather API.

The frontend provides an interactive and responsive interface for
searching cities and viewing weather information. JavaScript
communicates with the weather API and dynamically displays current
weather and forecast information. PHP provides backend functionality,
while MySQL stores user and application data.

The project demonstrates concepts of: - Web development - Frontend
development - Backend development - API integration - Database
management - Authentication - Data validation - Responsive design -
Basic web security

**Project Name:** WeatherCast\
**Project Type:** Full-Stack Weather Forecasting Website\
**Frontend:** HTML5, CSS3, JavaScript\
**Backend:** PHP\
**Database:** MySQL\
**API:** OpenWeather API\
**Server:** Apache through XAMPP\
**Database Tool:** phpMyAdmin\
**IDE:** Visual Studio Code
