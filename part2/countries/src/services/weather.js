import axios from "axios"

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const get = (city) => {
    const weather = axios
        .get(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`)
        .then((res) => res.data)
    return weather
}

export default { get }