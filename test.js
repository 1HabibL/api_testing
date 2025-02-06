const apiKey = "e8bbf07a65817437a530899c1697f0be"; // Replace with your OpenWeather API key

// Function to get city coordinates
async function getCoordinates(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
        );
        const data = await response.json();

        console.log("Geocoding API Response:", data); // Debugging log

        if (!data || data.length === 0) {
            alert("City not found. Please try again.");
            return null;
        }

        return { lat: data[0].lat, lon: data[0].lon };
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
}

// Function to fetch and display the weather forecast
async function getWeather(city) {
    const coordinates = await getCoordinates(city);
    if (!coordinates) {
        console.log("No coordinates found.");
        return;
    }

    const { lat, lon } = coordinates;
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Weather API Response:", data); // Debugging log

        if (!data.daily) {
            console.error("No daily forecast data found.");
            return;
        }

        console.log("7-day forecast:", data.daily); // Display in console
    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// Example usage:
getWeather("Toronto"); // Test with a city name
