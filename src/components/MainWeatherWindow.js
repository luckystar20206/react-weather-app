import React from "react";
// import "./MainWeatherWindow.css";
// import { ReactSVG } from "react-svg";

function MainWeatherWindow(props) {
  const { city, data } = props;

  const Title = city ? null : <h1 className="title">Weather Forecast</h1>;

  return (
    <div className="main">
      <div className="inner-main">
        {Title}
        <img
          src={data ? `/images/${data.icon}.svg` : "/images/01d.svg"}
          alt="sun"
          style={{
            visibility: city ? "visible" : "hidden",
            opacity: city ? "1" : "0",
          }}
        />
        {/* <ReactSVG
          src={data ? `./images/${data.icon}.svg` : "./images/01d.svg"}
          alt="sun"
          style={{
            visibility: city ? "visible" : "hidden",
            opacity: city ? "1" : "0",
          }}
        /> */}

        <div
          className="today"
          style={{
            visibility: city ? "visible" : "hidden",
            opacity: city ? "1" : "0",
          }}
        >
          <span>Today</span>
          <h1>{city}</h1>
          <p>
            Temperature: {data ? Math.round(data.temp - 273.15) : 0}
            °C
          </p>
          <p>{data ? data.weather_desc.toLowerCase() : ""}</p>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default MainWeatherWindow;
