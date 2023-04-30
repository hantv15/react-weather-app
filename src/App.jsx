import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  // Tạo state chưa dữ liệu khi gọi đến api
  const [data, setData] = useState([]);
  // Tạo state set dữ liệu khi search location
  const [location, setLocation] = useState("");

  // Step 1: Get user coordinates
  function getCoordintes() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      getCity(coordinates);
      return;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  // Step 2: Get city name
  function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];

    // Paste your LocationIQ token below.
    xhr.open(
      "GET",
      "https://us1.locationiq.com/v1/reverse.php?key=pk.eb5020ba7b383c9feac618851cab1f43&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var address = response.address;
        if (address.state) {
          setLocation(address.state);
        }
        return;
      }
    }
  }
  getCoordintes();

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=859b842dcdd2482527c201378c183952&lang=vi`
      );
      setData(data.data);
    };
    getData();
  }, [location]);

  const myStyle = {
    content: "",
    background: `url("./assets/img/${
      data.weather ? data.weather[0].icon : "default"
    }.jpg") no-repeat center center/cover`,
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0",
    left: "0",
  };

  const keyUpEventHandler = debounce(function (event) {
    event.target.value
      ? setLocation(event.target.value)
      : setLocation(location);
  }, 300);

  function debounce(fn, wait) {
    var timeout;
    return function () {
      var context = this;
      var args = arguments;

      clearTimeout(timeout);

      timeout = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    };
  }

  return (
    <div style={myStyle} className="app">
      <div className="search">
        <input
          defaultValue={location}
          onChange={(event) => keyUpEventHandler(event)}
          type="text"
          placeholder="Tên Thành phố/Quận huyện"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>{data.main ? data.main.temp.toFixed() + "°C" : null}</h1>
          </div>
          <div className="">
            <p>{data.weather ? data.weather[0].description : null}</p>
          </div>
          <div className="description">
            <p>{data.weather ? data.weather[0].main : null}</p>
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main ? data.main.feels_like.toFixed() + "°C" : null}
              </p>
              <p>Ngoài trời</p>
            </div>
            <div className="humidity">
              <p className="bold">
                {data.main ? data.main.humidity + "%" : null}
              </p>
              <p>Độ ẩm</p>
            </div>
            <div className="wind">
              <p className="bold">
                {data.wind ? Math.ceil(data.wind.speed) + " km/h" : null}
              </p>
              <p>Tốc độ gió</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
