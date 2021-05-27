import React from 'react'

import './backdrop.css'

function Backdrop(props) {
    return (
        <div onClick={props.click}
        className= {props.show?'Backdrop':'invisible'}>
        </div>
    )
}

export default Backdrop
