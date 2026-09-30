import WeatherCard from './WeatherCard.jsx'

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
