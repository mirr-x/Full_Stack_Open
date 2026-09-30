import { useEffect, useState } from "react"

import CountrySearch from './components/CountrySearch.jsx'
import DisplayCountries from './components/DisplayCountries.jsx'
import countryService from './services/countries.js'

const App = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [countries, setCountries] = useState([])

    useEffect(() => {
        countryService
            .getAll()
            .then((countries) => setCountries(countries))
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