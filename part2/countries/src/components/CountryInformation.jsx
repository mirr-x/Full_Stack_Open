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
    console.log(weather)
    console.log(city['counrty'])

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
                marginBottom: "10px",
                }}
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
        </div>
    )
}

const CountryInformation = ({ country }) => {
    if (country.length === 0) {
        return null
    }
    const capital = null;

    return (
        <div id="country-information">
            <h1> {country[0]?.name.common} </h1>
            <p> Capital : {country[0]?.capital?.[0] ?? 'not avaliable'} </p>
            <p> Area : {country[0]?.area} </p>
            <h2> Languages:  </h2>
            <ol>
                {Object.entries(country[0]?.languages ?? {}).map((language) => <li key={language[0]}> {language[1]} </li>)}
            </ol>
            <img src={country[0]?.flags?.png} alt="counrty Flag img"></img>
            <WeatherCard
                counrty={country[0]?.capital?.[0]}
            />
        </div>
    )
}

export default CountryInformation
