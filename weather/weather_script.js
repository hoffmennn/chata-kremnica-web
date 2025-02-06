document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'a8bb1664361d2f089c5e9886376ca75e' ; // Replace with your actual API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=CityName&appid=' + apiKey;

    const weatherContainer = document.getElementById('weather-container');
    
    function translateWeatherCondition(englishCondition) {
        const translations = {
            'Clear': 'Jasno',
            'Clouds': 'Oblačno',
            'Rain': 'Dážď',
            'Snow': 'Sneh',
            'Thunderstorm': 'Búrka',
            // Add more translations as needed
        };
    
        return translations[englishCondition] || englishCondition;
    }
    

    async function getWeather(cityName) {
        try {
            const response = await fetch(apiUrl.replace('CityName', cityName));
            const data = await response.json();
    
            if (response.ok) {
                // Display weather information
                const weatherCondition = data.weather[0].main;
                const translatedCondition = translateWeatherCondition(weatherCondition);
            
                const weatherInfo = `
                    <h1>${data.name}, ${data.sys.country}</h1>
                    <p>${Math.round(data.main.temp - 273.15)}°C</p>
                    <p>${translatedCondition}</p>
                `;
            
                // Display weather image
                const weatherImage = document.getElementById('weather-image');
                weatherImage.src = getWeatherImage(weatherCondition);
            
                // Update weather information container
                weatherContainer.innerHTML = weatherInfo;
            
            
            } else {
                // Handle non-successful response
                console.error('Error fetching weather data:', data.message);
                weatherContainer.innerHTML = `<p>Error: ${data.message}</p>`;
            }
        } catch (error) {
            // Handle fetch error
            console.error('Error fetching weather data:', error);
            weatherContainer.innerHTML = '<p>Error fetching weather data</p>';
        }
    }
    
    function getWeatherImage(weatherCondition) {
        // Map weather conditions to image filenames
        const imageMap = {
            'Clear': 'clear.png',
            'Clouds': 'cloudy.png',
            'Rain': 'rainy.png',
            'Snow': 'snow.png',
            'Thunderstorm': 'thunderstorm.png',
            'Mist': 'mist.png',
            // Add more mappings as needed
        };
    
        // Default image for unknown conditions
        const defaultImage = 'default.png';
    
        // Get the corresponding image filename for the given weather condition
        const imageFilename = imageMap[weatherCondition] || defaultImage;
        
        // Construct the full path to the image
        return `images/${imageFilename}`;
        
    }
    
    

    // Example: Fetch weather for a specific  city (e.g., London)
    getWeather('Kremnica');
});
