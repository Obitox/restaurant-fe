import React from 'react'

function Search({handleSearchInput}) {
    return (
        <div className="search">
            <input type="text" onChange={handleSearchInput}/>
        </div>
    )
}

export default Search
