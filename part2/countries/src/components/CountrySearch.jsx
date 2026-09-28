const CountrySearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <div id="country-search" style={{ display:'flex', alignItems:'center', gap:'12px' }} >
            <p> find countries </p>
            <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
        </div>
    )
}

export default CountrySearch