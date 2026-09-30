const CountrySearch = ({ searchQuery, onChange }) => {
    return (
        <div id="country-search" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label htmlFor="country-search-input">Find countries</label>
            <input
                id="country-search-input"
                type="search"
                value={searchQuery}
                onChange={(event) => onChange(event.target.value)}
            />
        </div>
    )
}

export default CountrySearch