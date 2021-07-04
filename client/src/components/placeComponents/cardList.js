import React, { useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'
import Card from './card'
import Modal from '../UI/modal/modal'
import Backdrop from '../UI/backdrop/backdrop'
import MapHolder from '../UI/map/mapHolder'

import './cardList.css'

const CardList = () => {
    const [posts, setPosts] = useState([])
    const [toggle, setToggle] = useState(false)
    const [modal, setModal] = useState('')
    const username = useParams();
    useEffect(() => {
        
        axios({
            method: 'get',
            url: `/place/${username.uid}`,
            headers: {
                'Content-Type': 'application/json'
            } ,
        })
        .then((response) => {
            setPosts(response.data.msgBody)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const mapToggle = () => {
        setToggle(true)
    }

    const backdropHandler = () => {
        setToggle(false)
    }

    const center =  {
        lat: 28.6380333,
        lng: 77.215812
      }

    const placeList = posts.map((post, index) => {
        return (
                <li  key={index}>
                    <Card 
                    key={index}
                    id={post._id}
                    name={post.name}
                    city={post.city}
                    country={post.country}
                    description={post.description}
                    lat={post.lat}
                    lon={post.lon}
                    img={post.img}
                    show = {mapToggle}
                    />
                </li>
        )
    })    

    let renderContent;
    if(placeList !== null || placeList.length !== 0){
        renderContent = (<ul>
                        {placeList}
                        </ul>)
    } else {
        renderContent = <h1>Click Below to Post</h1>
    }

    return(
        <React.Fragment>
            <Backdrop
            show={toggle}
            click={backdropHandler} />
            <div className='postList'>
            <Modal
                style={{ height: '100vh', width: '100%' }}
                show= {toggle}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCPMwWgYAKcLKX6XjJkqaFvlLo_avNq29k'}}
                    defaultCenter= {center}
                    defaultZoom= {10}
                    >     
                       <MapHolder 
                        lat={center.lat}
                        lng={center.lng}
                        text="•"/>  
                    </GoogleMapReact>
                </Modal>
                {renderContent}
            </div>  
        </React.Fragment>      
    )
}

export default CardList