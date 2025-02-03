import '../scss/style.scss'

const apiKey = '';
const cities = ['101000', '191186', '153000', '420111'];
let city = '101000';

const tempContainer = document.querySelector('.temp-container');
const descriptionContainer = document.querySelector('.description-container')
const humidityContainer = document.querySelector('.humidity-container');
const windSpeedContainer = document.querySelector('.wind-speed-container');
const windGustContainer = document.querySelector('.wind-gust-container');
const weatherImg = document.getElementById('weather-img');
const citySelect = document.querySelector('.city-input');

let weatherData;

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        weatherData = await response.json();
        console.log(weatherData);
        if (response.ok) {
            setWeather(weatherData);
        }
        else {
            tempContainer.innerHTML = '<p>Ошибка 1</p>';
        }
    } catch (error) {
        tempContainer.innerHTML = '<p>Ошибка 2</p>';
        console.log(error)
    }

}

function setWeather(weatherData) {
    weatherImg.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

    let temp = Math.round(weatherData.main.temp);
    let feelsTemp = Math.round(weatherData.main.feels_like);
    tempContainer.innerHTML = `
        <h2 class='temp'>${temp}°<span class="unit">C</span></h2>
        <div class='feels-temp'>FeelsLike ${feelsTemp}°</div>
    `;

    let description = weatherData.weather[0].main;
    descriptionContainer.innerHTML = `
        <span class='phrase'>${description}</span>
    `;

    let humidity = weatherData.main.humidity;
    humidityContainer.innerHTML = `
        <span class='label'>Humidity</span>
        <span class='value'>${humidity}%</span>
    `;

    let windSpeed = weatherData.wind.speed;
    windSpeedContainer.innerHTML = `
        <span class='label'>Wind</span>
        <span class='value'>${windSpeed} m/s</span>
    `;

    let windGust = weatherData.wind.gust;
    windGustContainer.innerHTML = `
        <span class='label'>Wind Gust</span>
        <span class='value'>${windGust} m/s</span>
    `;
}

function clock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const time = hours + ':' + minutes;
    document.getElementById('current-time').textContent = time;
}

function cityPick() {
    getWeather(city);
    clock();
    citySelect.addEventListener('change', function(event) {
        if (event.target.value == 'peter') {
            getWeather(cities[1]);
            clock();
        }
        else if (event.target.value == 'ivanovo') {
            getWeather(cities[2]);
            clock();            
        }
        else if (event.target.value == 'kazan') {
            getWeather(cities[3]);
            clock();            
        }
        else {
            getWeather(cities[0]);
            clock();            
        }}
    )
}

cityPick();