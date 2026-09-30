import CountryInformation from './CountryInformation.jsx'
import ListedCountries from './ListedCountries.jsx'

const findCountries = (countries, searchQuery) => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const exactMatch = countries.filter(
        (country) => country.name.common.toLowerCase() === normalizedQuery
    )

    if (exactMatch.length === 1) {
        return exactMatch
    }

    return countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(normalizedQuery)
    )
}

const DisplayCountries = ({ countries, searchQuery, setSearchQuery }) => {
    const countriesToShow = findCountries(countries, searchQuery)

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

export default DisplayCountries