const apiKey2 = "e8bbf07a65817437a530899c1697f0be";

// Function to get city coordinates
async function getCoordinates(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey2}`
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



// Function to fetch 7-day forecast
async function getWeather(city) {
    const coordinates = await getCoordinates(city);
    if (!coordinates) return;

    const { lat, lon } = coordinates;
    //const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${aKey}&units=metric`;
try {
    const response2 = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey2}&units=metric`
    );
   
    if (!response2.ok) {

        throw new Error("City not found, please try again");
    }   

    const windData = await response2.json();
    displaySection3(windData)

    } catch (error) {
    console.log("error Fetcher weather data:", error)
}
}

function displaySection3(windData) {
    const windDirection = document.getElementById("windDirection");
    const percipitation = document.getElementById("percipitation")
    const humidity = document.getElementById("humidity")
    const sunrise = document.getElementById("sunrise")
    const sunset = document.getElementById("sunset")

    const windDirec = windData.list[0].wind.speed;
    const percip = windData.list[0].rain ? windData.list[0].rain["3h"] : 0;
    const  humid = windData.list[0].main.humidity;
    const  sunr = new Date(windData.city.sunrise * 1000).toLocaleTimeString();
    const  suns = new Date(windData.city.sunset * 1000).toLocaleTimeString();

    windDirection.innerHTML = `Wind Speed: ${windDirec}m/s`;
    percipitation.innerHTML = `Percipitation: ${percip}`;
    humidity.innerHTML = `${humid}%`;
    sunrise.innerHTML = `${sunr}`;
    sunset.innerHTML = `${suns}`;
}

getWeather("Toronto")