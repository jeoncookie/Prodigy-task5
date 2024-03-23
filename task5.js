const weatherInfo = document.getElementById('weatherInfo');
const locationInput = document.getElementById('locationInput');

const API_KEY = 'YOUR_API_KEY';

function getWeather() {
  const location = locationInput.value.trim();
  if (location === '') {
    alert('Please enter a location.');
    return;
  }

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Weather data not available for this location.');
      }
      return response.json();
    })
    .then(data => {
      showWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error.message);
      weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function showWeather(data) {
  const cityName = data.name;
  const country = data.sys.country;
  const temperature = data.main.temp;
  const description = data.weather[0].description;

  weatherInfo.innerHTML = `
    <h2>Weather in ${cityName}, ${country}</h2>
    <p><strong>Temperature:</strong> ${temperature}°C</p>
    <p><strong>Description:</strong> ${description}</p>
  `;
}
