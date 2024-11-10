import { useMemo, useState } from "react";
import { debounce } from "../utils/common";

const useWeather = () => {
    const [data, setData] = useState(null);
    const defaultCity = "Hanoi";

    const fetchWeather = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=hanoi&units=metric&appid=859b842dcdd2482527c201378c183952&lang=vi`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data));
    }

    const fetchWeatherByCity = (keyword) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&units=metric&appid=859b842dcdd2482527c201378c183952&lang=vi`;
        fetch(url)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((e) => {
            alert("Vui long nhap dung thong tin");
        })
    }
    
    useMemo(() => fetchWeather(defaultCity), []);

    const keyUpEventHandler = debounce((event) => {
        const keyWord = event?.target?.value || defaultCity;
        fetchWeatherByCity(keyWord);
    }, 500);

    return { data, keyUpEventHandler };
}

export default useWeather;