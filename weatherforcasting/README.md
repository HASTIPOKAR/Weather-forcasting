# ⛅ WeatherCast — Weather Forecasting Website

A full-stack weather forecasting web application built with **HTML5, CSS3, JavaScript, PHP, MySQL**, and the **OpenWeather API**.

## Features

- 🔍 **City Search** — Search any city worldwide for weather data
- 🌡️ **Current Weather** — Temperature, humidity, wind speed, pressure, visibility, cloudiness, sunrise
- 📅 **5-Day Forecast** — Multi-day weather predictions with detailed info
- 👤 **User Registration & Login** — Secure authentication with password hashing
- 🕒 **Search History** — Track your past weather searches (logged-in users)
- ⭐ **Favourite Cities** — Save and manage your favourite cities
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile
- ✉️ **Contact Form** — Send messages via the contact page

## Tech Stack

| Layer     | Technology              |
|-----------|------------------------|
| Frontend  | HTML5, CSS3, JavaScript |
| Backend   | PHP 7+                  |
| Database  | MySQL                  |
| API       | OpenWeather API         |
| Server    | Apache (XAMPP)          |

## Setup Instructions

### 1. Prerequisites

- [XAMPP](https://www.apachefriends.org/) installed and running (Apache + MySQL)
- An [OpenWeather API key](https://openweathermap.org/api) (free tier works)

### 2. Installation

1. Copy the project folder to your XAMPP htdocs:
   ```
   C:\xampp\htdocs\WeatherCast\
   ```

2. Start **Apache** and **MySQL** from XAMPP Control Panel.

3. Set up the database:
   - Open [phpMyAdmin](http://localhost/phpmyadmin)
   - Import `database/weathercast.sql`
   - This creates the `weathercast` database with all required tables

4. Configure the API key:
   - Open `js/weather.js` and `js/forecast.js`
   - Replace `YOUR_OPENWEATHER_API_KEY` with your actual API key
   - For production: use the PHP proxy by setting `USE_PROXY = true` and updating the key in `php/weather_api.php`

### 3. Access the Website

```
http://localhost/WeatherCast/html/weather.html
```

## Project Structure

```
WeatherCast/
├── html/
│   ├── weather.html      # Home page (search + current weather + forecast)
│   ├── forecast.html      # Dedicated forecast page
│   ├── login.html         # Login page
│   ├── register.html      # Registration page
│   ├── about.html         # About page
│   └── contact.html       # Contact page
├── css/
│   ├── weather.css        # Main styles + design system
│   ├── login.css          # Auth & page-specific styles
│   └── responsive.css     # Responsive breakpoints
├── js/
│   ├── weather.js         # Main weather logic & API
│   ├── forecast.js        # Forecast page logic
│   ├── login.js           # Login & registration logic
│   ├── contact.js         # Contact form logic
│   └── validation.js      # Shared utilities & validation
├── php/
│   ├── db.php             # Database connection
│   ├── register.php       # User registration
│   ├── login.php          # User login
│   ├── logout.php         # User logout
│   ├── save_search.php    # Save search history
│   ├── get_history.php    # Get search history
│   ├── favorites.php      # Manage favourite cities
│   ├── session_check.php  # Check login status
│   ├── weather_api.php    # API proxy (hides API key)
│   └── contact.php        # Contact form handler
├── database/
│   └── weathercast.sql    # Database schema
├── images/
│   └── (logo if needed)
├── project.md             # Project specification
└── README.md              # This file
```

## Security

- Passwords hashed with `bcrypt`
- All SQL queries use prepared statements (PDO)
- Input validation on both client and server side
- PHP sessions for authentication
- API key protection via server-side proxy

## License

This project is for educational purposes.
