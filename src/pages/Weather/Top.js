import React from "react";

export default function Top({ data }) {
  return (
      <div className="top">
        <div className="location">
          <p>{data?.name}</p>
        </div>
        <div className="temp">
          <h1>{data?.main ? data?.main.temp.toFixed() + "°C" : null}</h1>
        </div>
        <div className="">
          <p>{data?.weather ? data?.weather[0].description : null}</p>
        </div>
        <div className="description">
          <p>{data?.weather ? data?.weather[0].main : null}</p>
        </div>
      </div>
  );
}
