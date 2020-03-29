import React from 'react'

function Search({handleChange, search}) {
    return (
        <section className = "searchbox-wrap">
            <input type = "text" 
            name = "search" 
            className = "searchbox" 
            placeholder = "Search for a movie"
            onChange = {handleChange}
            onKeyPress = {search}
            />
        </section>
    )
}

export default Search
