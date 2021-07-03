import React from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import CardTravelIcon from '@material-ui/icons/CardTravel';

import './toolbar.css'

function Toolbar() {
    return (
        <Router>
            <div className='toolbar'>
                <ul>
                    <li>
                        <Link style={{'display': 'flex', 'textDecoration':'none', 'color': 'aliceblue'}} 
                        to='/home'><CardTravelIcon/><h3>Places</h3></Link>
                    </li>
                    <div style={{"width": "100%"}}></div>
                    <li>
                        <Link style={{'textDecoration':'none', 'color': 'aliceblue'}}
                        to='/auth'>Create an Account</Link>
                    </li>
                </ul>
            </div>          
        </Router>
    )
}

export default Toolbar
