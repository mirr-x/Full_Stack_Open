import { useEffect, useState } from "react"
import axios from "axios"

import CountrySearch from './components/CountrySearch.jsx'

const CountryInformation  = ({ country }) => {
    if (country.length === 0) {
        return null
    }

    return (
        <div id="country-information">
            <h1> {country[0].name.common} </h1>
            <p> Capital : {country[0].capital[0]} </p>
            <p> Area : {country[0].area} </p>
            <h2> Languages:  </h2>
            <ol>
                {Object.entries(country[0].languages).map((language) => <li key={language[0]}> {language[1]} </li>)}
            </ol>
            <img src={country[0].flags['png']} alt="counrty Flag img"></img>
        </div>
    )
}

const Country = ({ country, setSearchQuery }) => {
    const handleShowCountryButton = (country) => {
        setSearchQuery(country.name.common)
        
    }
    return (
        <li>
            {country.name.common}{" "}
            <button onClick={() => handleShowCountryButton(country)}> Show </button>
        </li>
    )
}

const ListedCountries = ({ countries, setSearchQuery }) => {

    const country = (country) => {
        return (
            <Country
                key={country.cca3}
                country={country}
                setSearchQuery={setSearchQuery}
            />
        )
    }
    if (countries){
        return (
            <div id="listed-counties">
                <ol>
                    {countries.map(country)}
                </ol>
            </div>
        )
    }
    
}

const DisplayCountries = ({ countries, searchQuery, setSearchQuery }) => {
    const exactMatch = countries.filter(
        (c) => c.name.common.toLowerCase() == searchQuery.trim().toLowerCase()
    )
    const countriesToShow = 
        exactMatch.length === 1
        ? exactMatch
        : countries.filter((country) =>
            country.name.common
            .toLowerCase()
            .startsWith(searchQuery.toLowerCase())
        )

    if (searchQuery === ''){
        return null
    } else if (countriesToShow.length > 10){
        return <p> 'Too many matches, specify a nother filter' </p>
    } else if (countriesToShow.length === 0) {
        return <p> No matches for {searchQuery}. </p>
    } else if (countriesToShow.length > 1) {
        return <ListedCountries countries={countriesToShow} setSearchQuery={setSearchQuery} />
    } else if (countriesToShow[0].name.common.toLowerCase() === 'israel') {
        return <p> Wtf thier no such country {searchQuery}. </p>
    }
    return (
        <CountryInformation
            country={countriesToShow}
        />
    )
}

const App = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then((res) => {
                setCountries(res.data)
                console.log(res.data)
            })
    }, [])

    return (
        <div id="app">
            <CountrySearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <DisplayCountries
                countries={countries}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
        </div>
    )
}

export default App