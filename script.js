const apiKey = "e8bbf07a65817437a530899c1697f0be";

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric` 
        );

        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data)
        } else {
            alert("City not found. please try again");
        } 
        
    } catch (error) {
            console.log("Error Fetching weather data:", error)
        }
    
}

function displayWeather(data) {
    const weatherIcon = document.getElementById("weatherIcon");
    const weatherTemperature = document.getElementById("weatherTemperature")
    const weatherCondition = document.getElementById("weatherCondition")

    const temp = data.main.temp;
    const condition = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    weatherTemperature.innerHTML = `Temperature: ${temp}C`;
    weatherCondition.innerHTML = `Condition: ${condition}`;
    weatherIcon.innerHTML =  `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${condition}">`;
}
fetchWeather("Toronto")