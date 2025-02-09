const aKey = "e8bbf07a65817437a530899c1697f0be";

//Function to get city Coordinates

async function getCoordinates(city){
    try{
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${aKey}`
        );
        const coordinatesData = await response.json();

        if (coordinatesData.length === 0){
            alert("City not found. Please try again.");
            return null;
        }
        return { lat: coordinatesData[0].lat, lon: coordinatesData[0].lon };
    } catch (error) {
        console.error("error fetching coordinates:", error);
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
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${aKey}&units=metric`
    );
   
    if (!response2.ok) {

        throw new Error("City not found, please try again");
    }   

    const fiveData = await response2.json();
    displayForeCast(fiveData);
    displayForeCast2(fiveData)

    } catch (error) {
    console.log("error Fetcher weather data:", error)
}
}


//function to display weather into the div
function displayForeCast(fiveData){
    const FiveDayData = document.getElementById("FiveDayData")
    const foreCastIcon = document.getElementById("foreCastIcon")
    const foreCastTemperature = document.getElementById("foreCastTemperature")
    const foreCastCondition = document.getElementById("foreCastCondition")
    const foreCastDate = document.getElementById("foreCastDate")

   
    let i = 1;

    if (!fiveData.list || fiveData.list.length === 0) {
        console.error("No forecast data available");
        return;
    }

    const weatherData = fiveData.list[i]; 
    const weathertemp = weatherData.main.temp;
    const weatherDesc = weatherData.weather[0].description;
    const weatherIcon = weatherData.weather[0].icon;
    const weatherDate = weatherData.dt_txt;
 
    foreCastTemperature.innerHTML = `Temperature: ${weathertemp}C`;
    foreCastCondition.innerHTML = `Condition: ${weatherDesc}`;
    foreCastIcon.innerHTML =  `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDesc}">`;
    foreCastDate.innerHTML = weatherDate;



}


function displayForeCast2(fiveData) {
    const FinalDayData = document.getElementById("FinalDayData");

    const dailyForecasts = [];
    const seenDates = new Set();

fiveData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0];

    if(!seenDates.has(date)) {
        seenDates.add(date);
        dailyForecasts.push(entry);
    }
});

    

dailyForecasts.forEach((targetData) =>{

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("ForeCastCard");

        if (targetData.main && targetData.main.temp !== undefined) {
            forecastCard.textContent = `${targetData.main.temp}`
        } else {
            forecastCard.textContent = "No data available";

        }
        FinalDayData.appendChild(forecastCard);
    });
}




getWeather("Toronto")