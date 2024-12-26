const container = document.querySelector('.container');
const search = document.querySelector('.serach-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {

    const APIKey = 'cc79957bb9eb1b08048c9c3324908c47';
    const city = document.querySelector('.serach-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                alert('City not found');
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rainy.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                case 'Haze':
                    image.src = 'images/mist.jpg';
                    break;

                default:
                    image.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching weather data.');
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
        });
});