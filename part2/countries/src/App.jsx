import { useEffect, useState } from "react"
import axios from "axios"

import CountrySearch from './components/CountrySearch.jsx'
import DisplayCountries from './components/DisplayCountries.jsx'

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