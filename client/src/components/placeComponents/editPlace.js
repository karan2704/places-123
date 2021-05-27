import React from 'react'
import {cardContext} from './card'

function EditPlace(props) {

    const data = useContext(cardContext)
    return (
        <div>
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
                <button type='submit'>Update</button>
                <button type='button'>Cancel</button>
            </form>
        </div>
    )
}

export default EditPlace
