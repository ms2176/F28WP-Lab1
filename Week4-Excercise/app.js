const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weather-info");
const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    const city = cityInput.value;
   
    if (!city) {
        alert("Please enter a city");
        return;
    }
});