import React from 'react'

function Result({ result, openPopup }) {
	return (
		<div className="result" onClick={() => openPopup(result.imdbID)}>
			<h3>{result.Title}</h3>
			<img src={result.Poster} />
		</div>
	)
}

export default Result