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

    
const uniqueDays = new Set(); // Store unique day names
dailyForecasts.forEach((targetData) =>{

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("ForeCastCard");

        //date if-statement
        function getDayOfWeek(unixTimestamp){
            const date = new Date(unixTimestamp * 1000);
            const options = { weekday: 'long'};
            return new Intl.DateTimeFormat('en-US', options).format(date)
        }

        const forecastDay = getDayOfWeek(targetData.dt);
       

     
        
        if (!uniqueDays.has(forecastDay)) { // If this day hasn't been added yet
            uniqueDays.add(forecastDay); // Mark this day as added

        const newforecastDay = document.createElement("p")
        newforecastDay.textContent = `${forecastDay }`
        console.log(newforecastDay.textContent)
        forecastCard.appendChild(newforecastDay);

    }
        //main Temperature if-statement 
        const newforecastTemp = document.createElement("p");
        if (targetData.main && targetData.main.temp !== undefined) {
            newforecastTemp.textContent = `${targetData.main.temp}`
            
        } else {
            newforecastTemp.textContent = "No data available";
        }
        forecastCard.appendChild(newforecastTemp);


        //desciption if-statement
        const newforecastDesc = document.createElement("p"); 
        if (targetData.weather && targetData.weather[0].description !== undefined) {
            newforecastDesc.textContent = `${targetData.weather[0].description}`
        } else {
            newforecastDesc.textContent = "No data available";

        }
        forecastCard.appendChild(newforecastDesc)

           //icon if-statement
           const newforecastIcon = document.createElement("div"); 
           if (targetData.weather && targetData.weather[0].icon !== undefined) {
            const iconCode = targetData.weather[0].icon;
               newforecastIcon.innerHTML = `${targetData.weather[0].icon}`
               newforecastIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather icon">`
           } else {
               newforecastIcon.textContent = "No data available";
           }
           forecastCard.appendChild(newforecastIcon)
   

        FinalDayData.appendChild(forecastCard);
    
    });
}




getWeather("Toronto")