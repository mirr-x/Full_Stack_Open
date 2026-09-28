import { useEffect, useState } from "react"
import axios from "axios"

import CountrySearch from './components/CountrySearch.jsx'

const CountryInformation  = ({ country }) => {
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

const Country = ({ country }) => {
    return (
        <li>
            {country.name.common}
            {/* <button onClick={() => }> Show </button> */}    
        </li>
    )
}

const ListedCountries = ({ countries }) => {
    
    return (
        <div id="listed-counties">
            <ol>
                {countries.map((country) => <Country key={country.cca3} country={country} />)}
            </ol>
        </div>
    )
}

const DisplayCountries = ({ countries, searchQuery, contirieRuselt }) => {
    const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().startsWith(searchQuery.toLowerCase()))



    if (countriesToShow.length > 10){
        contirieRuselt = <p> 'Too many matches, specify a nother filter' </p>
    } else if (countriesToShow.length > 1) {
        contirieRuselt = <ListedCountries countries={countriesToShow} />
    } else if (countriesToShow.length < 1) {
        contirieRuselt = <p> No matches for {searchQuery}. </p>
    } else if (countriesToShow[0].name.common.toLowerCase() === 'israel') {
        contirieRuselt = <p> Wtf thier no such country {searchQuery}. </p>
    } else {
        contirieRuselt = <CountryInformation country={countriesToShow} />
    }
    return (
        <div id="display-countries">
            {searchQuery === '' ? '' : contirieRuselt}
        </div>
    )
}

const App = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [contirieRuselt, setContirieRuselt] = useState('')
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
                contirieRuselt={contirieRuselt}
            />
            <DisplayCountries
                countries={countries}
                searchQuery={searchQuery}
            />
        </div>
    )
}

export default App