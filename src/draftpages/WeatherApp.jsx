import { useState } from "react";

// Environment variables for API base URI and key
// These are typically set up in a .env file (e.g., .env.local)
// For Vite, they should be prefixed with VITE_
const BASE_URI = import.meta.env.VITE_W_BASE_URI;
const API_KEY = import.meta.env.VITE_W_API_KEY;

export default function WeatherApp() {
    // State variables to manage the component's data and UI
    const [city, setCity] = useState(""); // Stores the current city entered by the user
    const [weather, setWeather] = useState(null); // Stores the fetched weather data
    const [loading, setLoading] = useState(false); // Indicates if data is currently being fetched
    const [error, setError] = useState(null); // Stores general API fetch errors
    const [inputError, setInputError] = useState(null); // Stores error specific to empty input
    const [unit, setUnit] = useState("C"); // Stores the temperature unit (Celsius or Fahrenheit)

    /**
     * Converts temperature from Kelvin to the selected unit (Celsius or Fahrenheit).
     * @param {number} kelvin - Temperature in Kelvin.
     * @returns {string} Formatted temperature string with unit.
     */
    const convertTemp = (kelvin) => {
        if (unit === "C") {
            // Convert to Celsius: Kelvin - 273.15
            return `${Math.floor(kelvin - 273.15)}°C`;
        } else {
            // Convert to Fahrenheit: (Celsius * 9/5) + 32
            return `${Math.floor(((kelvin - 273.15) * 9 / 5) + 32)}°F`;
        }
    };

    /**
     * Toggles the temperature unit between Celsius and Fahrenheit.
     */
    const handleUnitToggle = () => {
        setUnit(prevUnit => prevUnit === "C" ? "F" : "C");
    };

    /**
     * Fetches weather data from the API based on the `city` state.
     * Handles loading, errors, and updates the weather state.
     */
    async function fetchWeather() {
        // Clear any previous input error message
        setInputError(null);

        // If the city input is empty, set an input-specific error and stop
        if (!city) {
            setInputError("Please enter a city name.");
            return;
        }

        // Reset weather data, activate loading state, and clear any previous general errors
        setWeather(null);
        setLoading(true);
        setError(null);

        try {
            // Construct the API URL using the base URI, city, and API key
            const response = await fetch(`${BASE_URI}?q=${city}&appid=${API_KEY}`);

            // Check if the network response was successful (status code 200-299)
            if (!response.ok) {
                // If not successful, throw an error with a specific message
                throw new Error("City Not Found or API Error.");
            }

            // Parse the JSON response body
            const data = await response.json();
            // Update the weather state with the fetched data
            setWeather(data);
            // Clear the city input field after a successful fetch
            setCity("");
        } catch (err) {
            // Catch any errors during the fetch or JSON parsing
            setError("Error fetching weather: " + err.message);
        } finally {
            // Always set loading to false once the fetch operation is complete (success or failure)
            setLoading(false);
        }
    }

    return (<div className="w-full h-svh bg-gradient-to-tr from-blue-600 to-purple-600 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-5">
            <h2 className="text-3xl text-center font-semibold text-gray-700 mb-6">Weather App</h2>

            {/* Search Input and Button */}
            <div className="flex gap-1 mb-6">
                <input
                    // Update city state on change, trimming whitespace
                    onChange={(e) => {
                        setCity(e.target.value.trim());
                        setInputError(null); // Clear input error as user types
                    }}
                    placeholder="Enter City"
                    type="text"
                    value={city} // Make input a controlled component
                    className="grow py-2 px-3 border-2 border-purple-600 outline-none rounded-lg"
                />
                <button
                    onClick={fetchWeather} // Call fetchWeather directly
                    className="py-2 px-3 cursor-pointer bg-purple-600 text-white border-2 border-purple-600 outline-none rounded-lg hover:bg-purple-700 transition-colors"
                >
                    Search
                </button>
            </div>

            {/* Conditional rendering for input error, loading, and general error */}
            {inputError && <p className="text-red-600 text-center text-sm mb-2">{inputError}</p>}
            {loading && <div className="animate-spin mx-auto w-6 h-6 border-3 border-l-purple-600 border-purple-300 rounded-full my-4"></div>}
            {error && <p className="text-red-600 text-center text-lg">{error}</p>}

            {/* Weather Display */}
            {weather && (
                <div className="text-center mt-6">
                    <h3 className="text-gray-800 text-2xl mb-4">{weather.name}, {weather.sys.country}</h3>

                    <div className="flex flex-wrap flex-auto gap-2.5 justify-center">
                        {/* Temperature Card */}
                        <div className="p-4 shadow-sm bg-purple-200 rounded-md text-gray-800 flex flex-col items-center min-w-[120px]">
                            <p className="text-sm font-medium">Temperature</p>
                            <p className="text-2xl font-bold mt-1">{convertTemp(weather.main.temp)}</p>
                        </div>
                        {/* Humidity Card */}
                        <div className="p-4 shadow-sm bg-purple-200 rounded-md text-gray-800 flex flex-col items-center min-w-[120px]">
                            <p className="text-sm font-medium">Humidity</p>
                            <p className="text-2xl font-bold mt-1">{weather.main.humidity}%</p>
                        </div>
                        {/* Weather Description Card (Added) */}
                        {weather.weather && weather.weather.length > 0 && (
                            <div className="p-4 shadow-sm bg-purple-200 rounded-md text-gray-800 flex flex-col items-center min-w-[120px]">
                                <p className="text-sm font-medium">Condition</p>
                                <p className="text-xl font-bold mt-1 capitalize">{weather.weather[0].description}</p>
                                {/* Optional: Add a weather icon if available from API */}
                                {weather.weather[0].icon && (
                                    <img
                                        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                        alt={weather.weather[0].description}
                                        className="w-12 h-12"
                                    />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Temperature Unit Toggle Button */}
                    <button
                        onClick={handleUnitToggle}
                        className="mt-6 py-1.5 px-4 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                    >
                        Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
                    </button>
                </div>
            )}
        </div>
    </div>);
}