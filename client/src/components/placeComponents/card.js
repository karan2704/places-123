import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';

import './card.css'

const Card = (props) => {
    
    
    return(
        <div>
            <div class='Card'>
                <img src="https://www.makemytrip.com/travel-guide/media/dg_image/agra/1_Taj_Mahal.jpg" alt="" />
                <h3>{props.name}</h3>
                <h4>{props.city}, {props.country}</h4>
                <p>{props.description}</p>
                <div className='cardBtn'>
                <button><MapIcon /></button>
                <div style={{"width": "100%"}}/>
                <button><EditIcon /></button>
                <button onClick={props.del}><DeleteIcon /></button>
                </div>
            </div>
        </div>
    )
}

export default Card