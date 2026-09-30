import { useEffect, useState } from "react"

import weatherApi from "../services/weather.js"

const WeatherCard = (city) => {
    const [weather, setWeather] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        weatherApi
            .get(city['counrty'])
            .then((res) => setWeather(res))
            .catch((err) => setError("Weather failed to fetch noooooooo"))
            .finally(() => setLoading(false))
    }, [city])

    if (loading) {
        return <p>Loading the Weather...</p>
    }

    if (error) {
        return (
            <p
                style={{
                color: "red",
                background: "lightgrey",
                fontSize: "16px",
                borderStyle: "solid",
                borderRadius: "5px",
                marginTop: "46px",
                padding: "6px",
                marginBottom: "10px",}}
            >
                {error}
            </p>
        );
    }

    return (
        <div id="weather-card">
            <h2> Weather in {city['counrty']} </h2>
            <p> Temperature {weather?.main?.temp} Celsius</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather?.weather?.[0]?.description ?? "no avaliable"}
            ></img>
            <p> Wind {weather?.wind?.speed} m/s</p>
        </div>
    )
}

export default WeatherCard