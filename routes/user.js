const express = require('express')
const bcrypt = require('bcrypt')
const User = require("../models/userSchema");

userRouter = express.Router()


userRouter.post('/login', (req, res) => {
    
    const {username, password} = req.body
    User.findOne({username}, (err, user) => {
        if(err){
            return res.status(500).json({
                err: true,
                msgBody: 'Server Error'
            })
        } if(!user) {
            return res.status(400).json({
                err: true,
                msgBody: 'User not found'
            })
        } else {
            bcrypt.compare(password, user.hashedPassword, (err, data) => {
                if(err){
                    console.log(err);
                }if(data){
                    return res.status(200).json({
                        err: false,
                        msgBody: user
                    })
                }else{
                    res.status(400).json({
                        err: true,
                        msgBody: 'Incorrect credentials'
                    })
                }
            })
        }
    })
})



userRouter.post('/register', (req, res) => {
   
    const {username, password} = req.body
    User.findOne({username}, async(err, user) => {
        if(err){
            res.status(500).json({
                err: true,
                msgBody: 'Server Error'
            })
        } if(user){
            res.status(400).json({
                err: true,
                msgBody: 'Username already exists'
            })
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username,
                hashedPassword
            })
            console.log(newUser);
            newUser.save((err)=>{
                if(err){
                    res.status(500).json({
                        err: true,
                        msgBody: 'Could not register the user'
                    })
                } else {
                    res.status(200).json({
                        err: false,
                        msgBody: 'Registered Successfully'
                    })
                }
            })
        }
    })
})

// const data = new User({
//     username: 'admin',
//     hashedPassword: '$2b$10$IxHPbaaaRWEghuRJEz1yz.33gqIhU72vyWA1fnP0r7aUg.jTWSvnW'
// })

// data.save((err) => {
//     if(err){
//         console.log(err);
//     } 
// })


       
module.exports = userRouter;
