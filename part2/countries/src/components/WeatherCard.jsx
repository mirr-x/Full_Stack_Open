import { useEffect, useState } from "react"

import weatherApi from "../services/weather.js"

const WeatherCard = ({ country }) => {
    const [weather, setWeather] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!country) {
            return
        }

        weatherApi
            .get(country)
            .then((res) => setWeather(res))
            .catch(() => setError("Weather failed to fetch"))
            .finally(() => setLoading(false))
    }, [country])

        if (!country) {
            return null
        }

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
            <h2> Weather in {country} </h2>
            <p> Temperature {weather?.main?.temp} Celsius</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
                alt={weather?.weather?.[0]?.description ?? "no avaliable"}
            ></img>
            <p> Wind {weather?.wind?.speed} m/s</p>
        </div>
    )
}

export default WeatherCard