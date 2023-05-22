import { useState } from "react";
import "./App.css";
import CurrentWeather from "./components/Current-Weather/Current-Weather";
import Search from "./components/Search/Search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./components/api";
import Forecast from "./components/Forecast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split("");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatheResponce = await response[0].json();
        const forecastResponce = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatheResponce });
        setForecast({ city: searchData.label, ...forecastResponce });
      })
      .catch((err) => console.log(err));
  };

  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
