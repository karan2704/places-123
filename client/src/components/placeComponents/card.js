import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MapIcon from '@material-ui/icons/Map';

import './card.css'

const Card = (props) => {
    
    console.log(props.img[0]);
    return(
        <div>
            <div class='Card'>
                <img src={props.img[0]} alt='No Image' />
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