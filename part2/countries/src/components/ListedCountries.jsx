import Country from './Country.jsx'

const ListedCountries = ({ countries, setSearchQuery }) => {
    return (
        <div id="listed-counties">
            <ol>
                {countries.map((country) => (
                    <Country
                        key={country.cca3}
                        country={country}
                        setSearchQuery={setSearchQuery}
                    />
                ))}
            </ol>
        </div>
    )
}

export default ListedCountries
