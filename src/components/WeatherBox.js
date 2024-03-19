import React from "react";
// import "./WeatherBox.css";

function WeatherBox(props) {
  const getDay = (date) => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdays[new Date(date).getDay()];
  };

  return (
    <>
      {props.date ? (
        <div className="weather-box">
          <h1>{props.date ? getDay(props.date) : ""}</h1>
          <img
            src={props.icon ? `/images/${props.icon}.svg` : "/images/01d.svg"}
            alt="sun"
          />
          <span className="temp">{Math.round(props.temp - 273.15)}°C</span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default WeatherBox;
