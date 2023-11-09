const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weather-info");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    const city = cityInput.value;
   
    if (!city) {
        alert("Please enter a city");
        return;
    }

    const APIKey = 'caca251a43ab62ee8098ad3a86c59250';
const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`;

fetch(APIurl)
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP Status Code Error");
        }
        return response.json();
    })
    .then(data => {
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const windSpeed = data.wind.speed;

        const weatherInfoHTML = `
            <p>Weather description: ${weatherDescription}</p>
            <p>Temperature: ${temperature}</p>
            <p>Wind speed: ${windSpeed}</p>
        `;

        weatherInfo.innerHTML = weatherInfoHTML;
    })
    .catch(error => {
        if(error.message === "HTTP Status Code Error") {
            alert("Please enter a valid city");
        } else {
            console.log(error);
        }
    });
    
});

// HTTP Request to OpenWeatherApp API

