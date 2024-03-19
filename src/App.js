import React, { useState, useEffect } from "react";
import "./App.css";
import MainWeatherWindow from "./components/MainWeatherWindow";
import CityInput from "./components/CityInput";
import WeatherBox from "./components/WeatherBox";

function App() {
  const [city, setCity] = useState(undefined);
  const [days, setDays] = useState(new Array(5).fill(null));

  const updateState = (data) => {
    const cityName = data.city.name;
    const newDays = [];
    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 5; i++) {
      newDays.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
      });
    }

    setCity(cityName);
    setDays(newDays);
  };

  const makeApiCall = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=6557810176c36fac5f0db536711a6c52`
      );
      const apiData = await response.json();

      if (apiData.cod === "200") {
        updateState(apiData);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return false;
    }
  };

  const getDayIndices = (data) => {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== "15"
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  useEffect(() => {
    // Perform initial API call here if needed
  }, []);

  const WeatherBoxes = () => {
    const weatherBoxes = days.slice(1).map((day, index) => (
      <li key={index}>
        <WeatherBox {...day} />
      </li>
    ));

    return <ul className="weather-box-list">{weatherBoxes}</ul>;
  };

  return (
    <div className="App">
      <header className="App-header">
        <MainWeatherWindow data={days[0]} city={city}>
          <CityInput city={city} makeApiCall={makeApiCall} />
          <WeatherBoxes />
        </MainWeatherWindow>
      </header>
    </div>
  );
}

export default App;
