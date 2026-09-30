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

export default Country
