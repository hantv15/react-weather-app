import React from "react";

export default function Bottom({ data }) {
  return (
    <div className="bottom">
      <div className="feels">
        <p className="bold">
          {data?.main ? data?.main.feels_like.toFixed() + "°C" : null}
        </p>
        <p>Ngoài trời</p>
      </div>
      <div className="humidity">
        <p className="bold">{data?.main ? data?.main.humidity + "%" : null}</p>
        <p>Độ ẩm</p>
      </div>
      <div className="wind">
        <p className="bold">
          {data?.wind ? Math.ceil(data?.wind.speed) + " km/h" : null}
        </p>
        <p>Tốc độ gió</p>
      </div>
    </div>
  );
}
