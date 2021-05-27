import React, { useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Card from './card'
import Modal from '../UI/modal/modal'
import Backdrop from '../UI/backdrop/backdrop'

import './cardList.css'

const CardList = () => {
    const [posts, setposts] = useState([])
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
            setposts(response.data.msgBody)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const deleteHandler = () => {
        setToggle(true)
        setModal('Are you sure you want to delete this post?')
    }

    const backdropHandler = () => {
        setToggle(false)
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
                    del={deleteHandler}
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
            show={toggle}
            >
                {modal}
            </Modal>
                {renderContent}
            </div>  
        </React.Fragment>      
    )
}

export default CardList