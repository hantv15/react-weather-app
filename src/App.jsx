import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  // Tạo state chưa dữ liệu khi gọi đến api
  const [data, setData] = useState([]);
  // Tạo state set dữ liệu khi search location
  const [location, setLocation] = useState("Hà nội");
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=859b842dcdd2482527c201378c183952&lang=vi`;

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=859b842dcdd2482527c201378c183952&lang=vi`
      );
      setData(data.data);
    };
    getData();
  }, []);

  // Tạo hàm xử lý khi nhập dữ liệu vào input sẽ call api lấy data
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=859b842dcdd2482527c201378c183952&lang=vi`
        )
        .then((response) => {
          setData(response.data);
        });
      setLocation("");
    }
  };
  // Hàm xử lý viết hoa chữ cái đầu
  // const upperCaseFristLetter = (string) => {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // };
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
  return (
    <div style={myStyle} className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
          placeholder="Nhập thành phố"
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
