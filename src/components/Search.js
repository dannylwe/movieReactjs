import React from 'react'

function Search({handleChange}) {
    return (
        <section className="searchbox-wrap">
            <input type="text" 
            name="search" 
            className="searchbox" 
            placeholder="Search for a movie"
            onChange = {handleChange}
            />
        </section>
    )
}

export default Search
