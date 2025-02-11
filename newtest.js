
const uniqueDays = new Set(); // Store unique day names

dailyForecasts.forEach((targetData) => {
    const forecastDay = getDayOfWeek(targetData.dt); // Convert timestamp to weekday

    if (!uniqueDays.has(forecastDay)) { // If this day hasn't been added yet
        uniqueDays.add(forecastDay); // Mark this day as added

        const forecastCard = document.createElement("div");
        forecastCard.classList.add("ForeCastCard");

        // Create and append the day
        const newforecastDay = document.createElement("p");
        newforecastDay.textContent = `Day: ${forecastDay}`;
        forecastCard.appendChild(newforecastDay);

        FinalDayData.appendChild(forecastCard);
    }
});
