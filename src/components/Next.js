import React from 'react'

function Next({nextPage, pages}) {
    return (
        <div className="Next" onClick={() => nextPage()}>
            <button className="close">Next {pages}</button>
        </div>
    )
}

export default Next
