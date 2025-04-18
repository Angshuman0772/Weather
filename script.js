const apiKey = "1f8b5eeadd2cafcc4c5a637b5b129a28"; // Replace with your OpenWeatherMap API key

async function fetchWeatherByCoords(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();

    // Update the HTML with the fetched data
    document.getElementById(
      "location"
    ).textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("condition").textContent =
      data.weather[0].description;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("location").textContent = "Error loading data";
    document.getElementById("temperature").textContent = "N/A";
    document.getElementById("condition").textContent = "N/A";
  }
}

async function fetchWeatherByCity() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();

    // Update the HTML with the fetched data
    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("condition").textContent = data.weather[0].description;

    // Update the weather icon
    const iconCode = data.weather[0].icon; // Get the icon code from the API
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // Construct the icon URL
    document.getElementById("weather-icon").innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}" />`;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById("location").textContent = "City not found";
    document.getElementById("temperature").textContent = "N/A";
    document.getElementById("condition").textContent = "N/A";
    document.getElementById("weather-icon").innerHTML = ""; // Clear the icon
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        document.getElementById("location").textContent =
          "Location access denied";
        document.getElementById("temperature").textContent = "N/A";
        document.getElementById("condition").textContent = "N/A";
      }
    );
  } else {
    document.getElementById("location").textContent =
      "Geolocation not supported";
    document.getElementById("temperature").textContent = "N/A";
    document.getElementById("condition").textContent = "N/A";
  }
}

// Call the function to get the user's location and fetch weather data
getUserLocation();
