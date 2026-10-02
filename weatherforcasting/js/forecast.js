/**
 * WeatherCast — Forecast Page JavaScript
 * Handles: city search and detailed multi-day forecast display
 */

const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your key
const API_BASE = 'https://api.openweathermap.org/data/2.5';
const ICON_BASE = 'https://openweathermap.org/img/wn/';

const USE_PROXY = false;
const PROXY_URL = '../php/weather_api.php';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const forecastHeader = document.getElementById('forecastHeader');
const forecastPageGrid = document.getElementById('forecastPageGrid');

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    if (searchBtn) {
        searchBtn.addEventListener('click', handleForecastSearch);
    }
    if (cityInput) {
        cityInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleForecastSearch();
            }
        });
    }
});

async function handleForecastSearch() {
    const city = cityInput.value.trim();

    if (!city) {
        showForecastError('Empty Search', 'Please enter a city name.');
        cityInput.focus();
        return;
    }

    // Show loading
    loadingSpinner.classList.add('active');
    errorMessage.classList.remove('active');
    forecastHeader.style.display = 'none';
    forecastPageGrid.innerHTML = '';

    try {
        let url;
        if (USE_PROXY) {
            url = `${PROXY_URL}?city=${encodeURIComponent(city)}&type=forecast`;
        } else {
            url = `${API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        }

        const response = await fetch(url);

        if (response.status === 404) {
            throw new Error('CITY_NOT_FOUND');
        }

        if (!response.ok) {
            throw new Error('API_ERROR');
        }

        const data = await response.json();

        if (data.cod && data.cod === '404') {
            throw new Error('CITY_NOT_FOUND');
        }

        displayDetailedForecast(data);
        loadingSpinner.classList.remove('active');

    } catch (error) {
        loadingSpinner.classList.remove('active');

        if (error.message === 'CITY_NOT_FOUND') {
            showForecastError('City Not Found', 'City not found. Please check the city name.');
        } else if (error.name === 'TypeError') {
            showForecastError('Network Error', 'Please check your internet connection.');
        } else {
            showForecastError('API Error', 'Unable to retrieve weather information. Please try again later.');
        }
    }
}

function displayDetailedForecast(data) {
    const cityName = data.city ? data.city.name : '';
    const country = data.city ? data.city.country : '';

    // Show header
    document.getElementById('forecastCity').textContent = `${cityName}, ${country}`;
    forecastHeader.style.display = 'block';

    // Process forecast data — group by day
    const dailyMap = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toISOString().split('T')[0];

        if (!dailyMap[dateKey]) {
            dailyMap[dateKey] = {
                entries: [],
                temp_max: -Infinity,
                temp_min: Infinity
            };
        }

        dailyMap[dateKey].entries.push(item);
        dailyMap[dateKey].temp_max = Math.max(dailyMap[dateKey].temp_max, item.main.temp_max);
        dailyMap[dateKey].temp_min = Math.min(dailyMap[dateKey].temp_min, item.main.temp_min);
    });

    const days = Object.keys(dailyMap).sort();
    forecastPageGrid.innerHTML = '';

    days.forEach((dateKey, index) => {
        const dayData = dailyMap[dateKey];
        // Use noon entry or middle entry for display
        const displayEntry = dayData.entries.find(e => {
            const h = new Date(e.dt * 1000).getHours();
            return h >= 11 && h <= 14;
        }) || dayData.entries[Math.floor(dayData.entries.length / 2)];

        const date = new Date(dateKey + 'T12:00:00');
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const iconUrl = `${ICON_BASE}${displayEntry.weather[0].icon}@2x.png`;

        const card = document.createElement('div');
        card.className = 'forecast-page-card';
        card.style.setProperty('--i', index);
        card.innerHTML = `
            <div class="fc-day">${dayName}</div>
            <div class="fc-date">${dateStr}</div>
            <div class="fc-icon"><img src="${iconUrl}" alt="${displayEntry.weather[0].description}"></div>
            <div class="fc-temp">
                ${Math.round(dayData.temp_max)}°
                <span class="fc-temp-min">${Math.round(dayData.temp_min)}°</span>
            </div>
            <div class="fc-condition">${displayEntry.weather[0].description}</div>
            <div class="fc-details">
                <span>💧 ${displayEntry.main.humidity}%</span>
                <span>💨 ${displayEntry.wind.speed.toFixed(1)} m/s</span>
            </div>
        `;

        forecastPageGrid.appendChild(card);
    });
}

function showForecastError(title, message) {
    document.getElementById('errorTitle').textContent = title;
    document.getElementById('errorText').textContent = message;
    errorMessage.classList.add('active');
}
