import axios from 'axios'
import React, {useState} from 'react'
import { useParams } from 'react-router'
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

import './addPlace.css'

function AddPlace(props) {

    const [input, setInput] = useState({
        name: '',
        city: '', 
        country: '',
        description: '',
        lat: '',
        lon: '',
        uid: '',
        img: null
    })

    const params = useParams()

    const changeHandler = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setInput({...input, [name]: value, uid: params.uid})
    }


    const submitHandler = (e) => {
        e.preventDefault()
        axios({
            method: "post",
            url: "/place",
            headers:{
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(input)
        }).then((response) => {
            console.log(response.data);
            props.history.push(`/${params.uid}/places`)
        }).catch((err) => {
            console.log(err.response.data);
        })
    }

    return (
        <div className='addForm'>
            <form onSubmit={submitHandler}>
                <label>Name of the place</label>
                <input name='name'  value={input.name} onChange={changeHandler} />
                <label>City</label>
                <input name='city' value={input.city} onChange={changeHandler} />
                <label>Country</label>
                <input name='country' value={input.country} onChange={changeHandler} />
                <label>Description of the Place</label>
                <input name='description'  value={input.description} onChange={changeHandler} />
                <label>Coordinates</label>
                <input name='lat'  value={input.lat} onChange={changeHandler} />
                <input name='lon'  value={input.lon} onChange={changeHandler} />
                <input type='file' name='img'  value={input.img} onChange={changeHandler} />
                <div className="addBtn">
                <button type='submit'><AddIcon /></button>
                <button type='button'><ClearIcon /></button>
                </div>
            </form>
        </div>
    )
}

export default AddPlace
