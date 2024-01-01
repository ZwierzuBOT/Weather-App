import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCloud,
  faWind,
  faDroplet,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  let apiKey = "89430eb4c6af330cb8962aa255504de5";

  let [cloud, setCloud] = useState("NotCloud");
  let [sun, setSun] = useState("NotSun");
  let [Drop, setDrop] = useState("NotDrop");
  let [w, setWind] = useState("NotWind");

  const search = async () => {
    const searchBar = document.getElementsByClassName("search-bar");

    if (searchBar[0].value === "") {
      return 0;
    }

    let path = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar[0].value}&units=Metric&appid=${apiKey}`;

    let res = await fetch(path);
    let data = await res.json();

    const humidity = document.getElementById("HumH");
    const Temperature = document.getElementById("TempH");
    const City = document.getElementById("CityH");
    const WindSpeed = document.getElementById("WSH");

    try {
      City.innerText = data.name;
      Temperature.innerText = Math.floor(data.main.temp) + "°C";
      humidity.innerText = data.main.humidity + "%";
      WindSpeed.innerText = data.wind.speed + "km/h";

      setCloud("Cloud");
      setSun("Sun");
      setDrop("droplet");
      setWind("W");
    } catch {
      City.innerText = "No Data";
      Temperature.innerText = "";
      humidity.innerText = "";
      WindSpeed.innerText = "";

      setCloud("NotCloud");
      setSun("NotSun");
      setDrop("NotDrop");
      setWind("NotWind");
    }
  };

  function activeSearch(event) {
    if (event.key === "Enter") {
      search();
    }
  }

  return (
    <div className="App">
      <div className="Search">
        <input
          onKeyDown={activeSearch}
          className="search-bar"
          type="text"
          placeholder="Search... "
        />
        <button onClick={() => search()} className="submitBtn" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <div className="Card">
        <div className="main">
          <div className="ci">
            <h1 id="CityH">Weather App</h1>
            <FontAwesomeIcon id={cloud} icon={faCloud} />
          </div>

          <div className="temp">
            <h2 id="TempH"></h2>
            <FontAwesomeIcon id={sun} icon={faSun} />
          </div>
        </div>

        <div className="other">
          <div className="hum">
            <h2 id="HumH"></h2>
            <FontAwesomeIcon id={Drop} icon={faDroplet} />
          </div>

          <div className="wind">
            <h2 id="WSH"></h2>
            <FontAwesomeIcon id={w} icon={faWind} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
