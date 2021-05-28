import React, { useContext, useState} from 'react'
import {authContext} from '../App'
import axios from 'axios'

import './auth.css'

const Auth = (props) => {

  
    const authentication = useContext(authContext)
    const [isRegistered, setIsRegistered] = useState(true)
    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    const switchHandler = () => {
        setIsRegistered((prev) => !prev)
    }

    const onChangeHandler = (e) => {
        e.preventDefault()
        let {name, value} = e.target
        setInput({...input, [name]: value})
    }

    const loginHandler = (e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: '/user/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "username": input.username,
                "password": input.password
            })
        })
        .then((response) => {
            authentication.login(response.data.msgBody._id)
            authentication.username = response.data.msgBody.username
            props.history.push(`/${response.data.msgBody.username}/places`)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const signupHandler = (e) => {
        e.preventDefault()
        axios({
            method: 'post',
            url: '/user/register',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({"username":input.username,"password":input.password})
          })
          .then((response) => {
              setInput({
                username: '',
                password: ''
            })
              switchHandler()
              console.log(response.data);
          })
          .catch((err) => {
              console.log(err.response.data);
          })
    }

    let form

    if(isRegistered){
        form = (
            <form onSubmit={loginHandler} className='authForm'>
                <p><strong>Log In</strong></p>
                <label>Username</label>
                <input onChange={onChangeHandler} type='text' name='username' value={input.username} label='Username'/>
                <label>Password</label>
                <input onChange={onChangeHandler} type='password' name='password' value={input.password} label='Password'/>
                <button className='authBtn' type='submit'>Log In</button>
                <button className='switchBtn' type="button" onClick={switchHandler}>New here? Sign up</button>
            </form>
        )
    } else {
        form = (
            <form onSubmit={signupHandler} className='authForm'>
                <p><strong>Sign up</strong></p>
                <label>Username</label>
                <input onChange={onChangeHandler} type='text' name='username' value={input.username} label='Username'/>
                <label>Password</label>
                <input onChange={onChangeHandler} type='password' name='password' value={input.password} label='Password'/>
                <button className='authBtn' type='submit'>Sign Up</button>
                <button className='switchBtn' type="button" onClick={switchHandler}>Already have an account? Log in</button>
            </form>
        )}
    return (
        <div className='auth'>
            <img src="https://images-na.ssl-images-amazon.com/images/S/sgp-catalog-images/region_US/fbdms-ED6JGHW0HR5-Full-Image_GalleryBackground-en-US-1605547891225._SX1080_.jpg" alt="" />
            {form}
        </div>
    )
}

export default Auth
