
const API_KEY = '3adfe2498a7f4378a56d296018131b3a';

const getElementById = (id) => document.getElementById(id);

let weatherSummary,
    currentHumidity,
    currentPressure,
    currentTemp,
    currentWindSpeed,
    getWeatherButton,
    getCurrentWeatherButton,
    citySelect;



window.addEventListener('load', () => {
    weatherSummary = getElementById('weather-summary');
    currentHumidity = getElementById('current-humidity');
    currentPressure = getElementById('current-pressure');
    currentTemp = getElementById('current-temp');
    currentWindSpeed = getElementById('current-wind-speed');
    getWeatherButton = getElementById('get-weather-btn');
    citySelect = getElementById('city-select');
    getCurrentWeatherButton = getElementById('get-curr-weather-btn');


    getWeatherButton.addEventListener('click', () => getWeatherData(citySelect.value));
});



async function getWeatherData(city) {
    try {
                const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&units=M&key=${API_KEY}`);
                const data = await response.json();
                renderWeatherData(data);

            } catch (e) {
                console.error("Failed to fetch weather data:", e);
            }
    }


function renderWeatherData(weatherData) {

    const [weather] = weatherData.data;
    const {rh, pres, temp, wind_spd, weather:summary} = weather;

    currentHumidity.innerText = `Humidity: ${rh}%`;
    currentPressure.innerText = `Pressure: ${pres} Pa`;
    currentTemp.innerText = `Temperature: ${temp}°C`;
    currentWindSpeed.innerText = `Wind Speed: ${wind_spd} km/h`;
    weatherSummary.innerText = summary.description;
}














