const API_KEY = "c6cb8242f8f42e02d02c135f97b5cfb7";

let cityInput = document.getElementById("cityInput");
let searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    let city = cityInput.value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        let response = await fetch(url);
        let data = await response.json();

       if (data.cod !== 200) {
    alert("Error: " + data.message);
    console.log(data);
    return;
}

        document.getElementById("temperature").textContent =
            data.main.temp + "°C";

        document.getElementById("cityName").textContent =
            data.name;

        document.getElementById("weatherCondition").textContent =
            data.weather[0].description;

            let iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("weatherIcon").style.display = "block";

        document.getElementById("humidity").textContent =
            data.main.humidity + "%";

        document.getElementById("windSpeed").textContent =
            data.wind.speed + " m/s";

        document.getElementById("pressure").textContent =
            data.main.pressure + " hPa";

            // Get 5-day forecast
let forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

let forecastResponse = await fetch(forecastUrl);
let forecastData = await forecastResponse.json();

let forecastContainer = document.getElementById("forecastContainer");

forecastContainer.innerHTML = "";

for (let i = 0; i < forecastData.list.length; i += 8) {

    let forecast = forecastData.list[i];

    let date = new Date(forecast.dt * 1000);

    let day = date.toLocaleDateString("en-US", {
        weekday: "long"
    });

    let icon = forecast.weather[0].icon;

    let description = forecast.weather[0].description;

    let temperature = Math.round(forecast.main.temp);

    forecastContainer.innerHTML += `
        <div class="forecast-card">

            <h3>${day}</h3>

            <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
                 alt="${description}">

            <p class="temp">${temperature}°C</p>

            <p>${description}</p>

        </div>
    `;
}
    } catch (error) {

        alert("Something went wrong.");

        console.log(error);
    }
}