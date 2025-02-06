fetch("fruitss.json")
.then(response => response.json())
.then(fruits => {
    displayWeatherForecast(fruits)
})
.catch(error => console.error("error loading fruits:", error))

// function to display weather in app
function displayWeatherForecast(fruits){
    const foreCastData = document.querySelector(".ForeCastData"); // Select the div
    fruits.forEach((fruit) => {
        console.log(fruit);      // Log the fruit object itself
        const ForeCastCard = document.createElement("p");
        ForeCastCard.classList.add('ForeCastCard');
        ForeCastCard.textContent = `${fruit.name} ${fruit.Color}`
        foreCastData.appendChild(ForeCastCard)
    });
    
    
}

