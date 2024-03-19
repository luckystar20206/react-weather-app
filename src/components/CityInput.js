import React, { useState } from "react";

function CityInput(props) {
  const [inputValue, setInputValue] = useState("");

  const onKeyPressHandler = async (e) => {
    if (e.key === "Enter") {
      const city = inputValue.trim();

      if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
        e.target.classList.add("loading");
        if (await props.makeApiCall(city)) {
          e.target.placeholder = "Enter a City...";
        } else {
          e.target.placeholder = "City was not found, try again...";
        }
      } else {
        e.target.placeholder = "Please enter a valid city name...";
      }
      e.target.classList.remove("loading");
      setInputValue("");
    }
  };

  const style = {
    top: props.city ? "-380px" : "-20px",
    width: "600px",
    display: "inline-block",
    padding: "10px 0px 10px 30px",
    lineHeight: "120%",
    position: "relative",
    borderRadius: "20px",
    outline: "none",
    fontSize: "20px",
    transition: "all 0.5s ease-out",
  };

  return (
    <input
      className="city-input"
      style={style}
      type="text"
      placeholder="Enter a City..."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyPress={onKeyPressHandler}
    />
  );
}

export default CityInput;
