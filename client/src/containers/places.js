import React from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle';

import CardList from '../components/placeComponents/cardList'

const Places = () => {

    const params = useParams()
    const str = `/${params.uid}/new`
    return(        
            <div 
            style={{'backgroundColor': '#6a98ad',
            'background-image': 'url(https://www.transparenttextures.com/patterns/black-linen.png)',
            'top': '0', 'left':'0'}}>
                <h2 style={{'margin': '0'}}>Hello {params.uid}</h2>
                <CardList />
                <Link style={{'textDecoration': 'none', 'margin':'20px'}}to={str}><AddCircleIcon /> Add Place </Link>
            </div>        
    )
}

export default Places