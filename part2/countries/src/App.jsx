import { useEffect, useState } from "react"

import CountrySearch from './components/CountrySearch.jsx'
import DisplayCountries from './components/DisplayCountries.jsx'
import countryService from './services/countries.js'

const App = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        countryService
            .getAll()
            .then((countries) => setCountries(countries))
            .catch(() => setError('Could not load countries.'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <p>Loading countries...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div id="app">
            <CountrySearch
                searchQuery={searchQuery}
                onChange={setSearchQuery}
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