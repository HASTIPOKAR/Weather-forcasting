/**
 * WeatherCast — Main Weather JavaScript
 * Handles: search, API calls, weather display, forecast, history, favourites
 */

// ==========================================
// Configuration
// ==========================================
const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your key
const API_BASE = 'https://api.openweathermap.org/data/2.5';
const ICON_BASE = 'https://openweathermap.org/img/wn/';

// If using PHP proxy (recommended for production):
// const USE_PROXY = true;
// const PROXY_URL = '../php/weather_api.php';
const USE_PROXY = false;

let currentCityData = null;

// ==========================================
// DOM Elements
// ==========================================
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const weatherCurrent = document.getElementById('weatherCurrent');
const forecastSection = document.getElementById('forecastSection');

// ==========================================
// Event Listeners
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }

    // Enter key in search input
    if (cityInput) {
        cityInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }
});

// ==========================================
// Search Handler
// ==========================================
async function handleSearch() {
    const city = cityInput.value.trim();

    // Validate input
    if (!city) {
        showError('Empty Search', 'Please enter a city name.');
        cityInput.focus();
        return;
    }

    // Show loading
    showLoading(true);
    hideError();
    hideWeather();

    try {
        // Fetch current weather and forecast in parallel
        const [weatherData, forecastData] = await Promise.all([
            fetchWeather(city),
            fetchForecast(city)
        ]);

        // Save current data for favourites
        currentCityData = {
            city: weatherData.name,
            temperature: Math.round(weatherData.main.temp),
            condition: weatherData.weather[0].main
        };

        // Display weather
        displayCurrentWeather(weatherData);
        displayForecast(forecastData);

        // Save to search history (if logged in)
        saveSearchHistory(currentCityData);

        // Update favourite button state
        updateFavoriteButton(weatherData.name);

        showLoading(false);

    } catch (error) {
        showLoading(false);

        if (error.message === 'CITY_NOT_FOUND') {
            showError('City Not Found', 'City not found. Please check the city name.');
        } else if (error.message === 'NETWORK_ERROR') {
            showError('Network Error', 'Please check your internet connection.');
        } else {
            showError('API Error', 'Unable to retrieve weather information. Please try again later.');
        }
    }
}

// ==========================================
// API Calls
// ==========================================
async function fetchWeather(city) {
    let url;
    if (USE_PROXY) {
        url = `${PROXY_URL}?city=${encodeURIComponent(city)}&type=weather`;
    } else {
        url = `${API_BASE}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    }

    try {
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

        return data;
    } catch (error) {
        if (error.message === 'CITY_NOT_FOUND') throw error;
        if (error.name === 'TypeError' || error.message === 'Failed to fetch') {
            throw new Error('NETWORK_ERROR');
        }
        throw error;
    }
}

async function fetchForecast(city) {
    let url;
    if (USE_PROXY) {
        url = `${PROXY_URL}?city=${encodeURIComponent(city)}&type=forecast`;
    } else {
        url = `${API_BASE}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
}

// ==========================================
// Display Current Weather
// ==========================================
function displayCurrentWeather(data) {
    // City name
    document.getElementById('weatherCity').textContent = `${data.name}, ${data.sys.country}`;

    // Date
    const now = new Date();
    document.getElementById('weatherDate').textContent = formatDate(now);

    // Icon
    const iconCode = data.weather[0].icon;
    const iconUrl = `${ICON_BASE}${iconCode}@4x.png`;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('weatherIcon').alt = data.weather[0].description;

    // Temperature
    document.getElementById('weatherTemp').textContent = Math.round(data.main.temp);

    // Condition
    document.getElementById('weatherCondition').textContent = data.weather[0].description;

    // Feels like
    document.getElementById('weatherFeels').textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;

    // Details
    document.getElementById('weatherHumidity').textContent = data.main.humidity;
    document.getElementById('weatherWind').textContent = data.wind.speed.toFixed(1);
    document.getElementById('weatherPressure').textContent = data.main.pressure;

    // Visibility
    const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : '—';
    document.getElementById('weatherVisibility').textContent = visibility;

    // Clouds
    document.getElementById('weatherClouds').textContent = data.clouds ? data.clouds.all : '—';

    // Sunrise
    if (data.sys.sunrise) {
        const sunrise = new Date(data.sys.sunrise * 1000);
        document.getElementById('weatherSunrise').textContent = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Show the weather section
    weatherCurrent.classList.add('active');
}

// ==========================================
// Display Forecast
// ==========================================
function displayForecast(data) {
    if (!data || !data.list) return;

    const forecastGrid = document.getElementById('forecastGrid');
    forecastGrid.innerHTML = '';

    // Get one forecast per day (around noon)
    const dailyForecasts = getDailyForecasts(data.list);

    dailyForecasts.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const iconUrl = `${ICON_BASE}${item.weather[0].icon}@2x.png`;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-icon"><img src="${iconUrl}" alt="${item.weather[0].description}"></div>
            <div class="forecast-temp">
                ${Math.round(item.main.temp_max)}° 
                <span class="temp-min">${Math.round(item.main.temp_min)}°</span>
            </div>
            <div class="forecast-condition">${item.weather[0].main}</div>
        `;

        forecastGrid.appendChild(card);
    });

    forecastSection.classList.add('active');
}

function getDailyForecasts(list) {
    const dailyMap = {};

    list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toISOString().split('T')[0];

        // Skip today
        const today = new Date().toISOString().split('T')[0];
        if (dateKey === today) return;

        // Pick the entry closest to noon
        if (!dailyMap[dateKey]) {
            dailyMap[dateKey] = item;
        } else {
            const hour = date.getHours();
            const existingHour = new Date(dailyMap[dateKey].dt * 1000).getHours();
            if (Math.abs(hour - 12) < Math.abs(existingHour - 12)) {
                dailyMap[dateKey] = item;
            }
        }
    });

    return Object.values(dailyMap).slice(0, 5);
}

// ==========================================
// Search History
// ==========================================
async function saveSearchHistory(cityData) {
    if (!currentUser) return;

    try {
        const formData = new FormData();
        formData.append('city', cityData.city);
        formData.append('temperature', cityData.temperature);
        formData.append('weather_condition', cityData.condition);

        await fetch('../php/save_search.php', {
            method: 'POST',
            body: formData
        });

        // Reload history panel
        loadHistory();
    } catch (e) {
        // Silently fail
    }
}

async function loadHistory() {
    const historyList = document.getElementById('historyList');
    const historyEmpty = document.getElementById('historyEmpty');

    if (!historyList || !currentUser) return;

    try {
        const response = await fetch('../php/get_history.php');
        const data = await response.json();

        if (data.success && data.history && data.history.length > 0) {
            if (historyEmpty) historyEmpty.style.display = 'none';

            // Clear existing items (not the empty state)
            historyList.querySelectorAll('.history-item').forEach(el => el.remove());

            data.history.forEach(item => {
                const el = document.createElement('div');
                el.className = 'history-item';
                el.innerHTML = `
                    <span class="history-city">${escapeHTML(item.city)}</span>
                    <span class="history-info">
                        <span>${item.temperature ? Math.round(item.temperature) + '°C' : ''}</span>
                        <span>${escapeHTML(item.weather_condition || '')}</span>
                    </span>
                `;
                el.addEventListener('click', () => {
                    cityInput.value = item.city;
                    handleSearch();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
                historyList.appendChild(el);
            });
        } else {
            if (historyEmpty) historyEmpty.style.display = 'block';
        }
    } catch (e) {
        // Silently fail
    }
}

// ==========================================
// Favourites
// ==========================================
async function loadFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    const favoritesEmpty = document.getElementById('favoritesEmpty');

    if (!favoritesList || !currentUser) return;

    try {
        const response = await fetch('../php/favorites.php');
        const data = await response.json();

        if (data.success && data.favorites && data.favorites.length > 0) {
            if (favoritesEmpty) favoritesEmpty.style.display = 'none';

            // Clear existing items
            favoritesList.querySelectorAll('.favorite-item').forEach(el => el.remove());

            data.favorites.forEach(item => {
                const el = document.createElement('div');
                el.className = 'favorite-item';
                el.innerHTML = `
                    <span class="fav-city">⭐ ${escapeHTML(item.city)}</span>
                    <span class="fav-actions">
                        <button class="search-fav" title="Search this city" data-city="${escapeHTML(item.city)}">🔍</button>
                        <button class="remove-fav" title="Remove from favourites" data-city="${escapeHTML(item.city)}">🗑️</button>
                    </span>
                `;

                // Search button
                el.querySelector('.search-fav').addEventListener('click', (e) => {
                    e.stopPropagation();
                    cityInput.value = item.city;
                    handleSearch();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });

                // Remove button
                el.querySelector('.remove-fav').addEventListener('click', async (e) => {
                    e.stopPropagation();
                    await removeFavorite(item.city);
                });

                favoritesList.appendChild(el);
            });
        } else {
            if (favoritesEmpty) favoritesEmpty.style.display = 'block';
            favoritesList.querySelectorAll('.favorite-item').forEach(el => el.remove());
        }
    } catch (e) {
        // Silently fail
    }
}

async function toggleFavorite() {
    if (!currentUser) {
        showToast('Please log in to save favourite cities.', 'info');
        return;
    }

    if (!currentCityData) return;

    const btn = document.getElementById('btnFavorite');
    const isFavorited = btn.classList.contains('favorited');

    if (isFavorited) {
        await removeFavorite(currentCityData.city);
    } else {
        await addFavorite(currentCityData.city);
    }
}

async function addFavorite(city) {
    try {
        const formData = new FormData();
        formData.append('action', 'add');
        formData.append('city', city);

        const response = await fetch('../php/favorites.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.success) {
            showToast(`${city} added to favourites!`, 'success');
            updateFavoriteButton(city, true);
            loadFavorites();
        } else {
            showToast(data.message || 'Failed to add favourite.', 'error');
        }
    } catch (e) {
        showToast('Failed to add favourite.', 'error');
    }
}

async function removeFavorite(city) {
    try {
        const formData = new FormData();
        formData.append('action', 'remove');
        formData.append('city', city);

        const response = await fetch('../php/favorites.php', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.success) {
            showToast(`${city} removed from favourites.`, 'success');
            if (currentCityData && currentCityData.city === city) {
                updateFavoriteButton(city, false);
            }
            loadFavorites();
        } else {
            showToast(data.message || 'Failed to remove favourite.', 'error');
        }
    } catch (e) {
        showToast('Failed to remove favourite.', 'error');
    }
}

async function updateFavoriteButton(city, forceState) {
    const btn = document.getElementById('btnFavorite');
    const favIcon = document.getElementById('favIcon');
    const favText = document.getElementById('favText');

    if (!btn || !currentUser) return;

    let isFav = false;

    if (typeof forceState === 'boolean') {
        isFav = forceState;
    } else {
        // Check against server
        try {
            const response = await fetch('../php/favorites.php');
            const data = await response.json();
            if (data.success && data.favorites) {
                isFav = data.favorites.some(f => f.city.toLowerCase() === city.toLowerCase());
            }
        } catch (e) {
            // Ignore
        }
    }

    if (isFav) {
        btn.classList.add('favorited');
        favIcon.textContent = '★';
        favText.textContent = 'Favourited';
    } else {
        btn.classList.remove('favorited');
        favIcon.textContent = '☆';
        favText.textContent = 'Favourite';
    }
}

// ==========================================
// UI State Helpers
// ==========================================
function showLoading(show) {
    if (loadingSpinner) {
        loadingSpinner.classList.toggle('active', show);
    }
}

function showError(title, message) {
    if (errorMessage) {
        document.getElementById('errorTitle').textContent = title;
        document.getElementById('errorText').textContent = message;
        errorMessage.classList.add('active');
    }
}

function hideError() {
    if (errorMessage) {
        errorMessage.classList.remove('active');
    }
}

function hideWeather() {
    if (weatherCurrent) weatherCurrent.classList.remove('active');
    if (forecastSection) forecastSection.classList.remove('active');
}

// ==========================================
// Formatting Helpers
// ==========================================
function formatDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}
