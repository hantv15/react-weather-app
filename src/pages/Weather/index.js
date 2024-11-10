import React, { lazy } from "react";
import './weather.css';
import useWeather from "../../hooks/useWeather";

const Top = lazy(() => import("./Top"));
const Bottom = lazy(() => import("./Bottom"));
const InputSearch = lazy(() => import("../../components/InputSearch"));


function Weather() {
  const { data, keyUpEventHandler } = useWeather();

  const myStyle = {
    background: `url("./assets/img/${data?.weather[0].icon}.jpg") no-repeat center center/cover`,
  };

  return (
    <div style={myStyle} className="app wrapper">
      <div className="search">
        <InputSearch
          event={keyUpEventHandler}
          placeholder="Tên Thành phố/Quận huyện"
        />
      </div>
      <div className="container">
        {data?.name !== undefined && (
            <>
              <Top data={data} />
              <Bottom data={data} />
            </>
        )}
      </div>
    </div>
  );
}

export default Weather;
