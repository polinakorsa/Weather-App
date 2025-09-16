const API_KEY2 = '74d68020c7e44909fc3901233f7df03b';

const getElemById = (id) => document.getElementById(id);

let currWeatherSummary,
    currentLocationHumidity,
    currentLocationPressure,
    currentLocationTemp,
    currentLocationWindSpeed,
    getCurrentLocationWeatherButton;


window.addEventListener('load', () => {
    currWeatherSummary = getElemById('curr-weather-summary');
    currentLocationHumidity = getElemById('current-location-humidity');
    currentLocationPressure = getElemById('current-location-pressure');
    currentLocationTemp = getElemById('current-location-temp');
    currentLocationWindSpeed = getElemById('current-location-wind-speed');
    getCurrentLocationWeatherButton = getElemById('get-curr-weather-btn');


    getCurrentLocationWeatherButton.addEventListener('click', getCurrWeatherData);
});


function getCurrWeatherData (){
    navigator.geolocation.getCurrentPosition(async (position) => {
        const {latitude, longitude} = position.coords;
        const currWeatherData = await fetchCurrWeatherDataFromAPI(latitude, longitude);
        renderCurrWeatherData(currWeatherData);
    }, (error) => {
        console.log('Error getting geolocation', error);
    })
}

async function fetchCurrWeatherDataFromAPI(latitude, longitude) {
    try {
        const response = await fetch
        (`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY2}&units=metric`)
        return response.json();
    } catch (error) {
        console.error('Error fetching weather by API', latitude, longitude);
    }
}


function renderCurrWeatherData(currWeatherData) {
    const { main, wind, weather } = currWeatherData;
    const summary = weather[0];

    currWeatherSummary.innerText = summary.description;
    currentLocationTemp.innerText = `Temperature: ${main.temp}°C`;
    currentLocationHumidity.innerText = `Humidity: ${main.humidity}%`;
    currentLocationPressure.innerText = `Pressure: ${main.pressure} Pa`;
    currentLocationWindSpeed.innerText = `Wind Speed: ${wind.speed} km/h`;
}


