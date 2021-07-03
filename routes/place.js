const express = require('express')
const Place = require('../models/placeSchema')
const User = require('../models/userSchema')

const placeRouter = express.Router()


placeRouter.get('/:username', (req, res)=>{
    let posts = []
    const username = req.params.username
    User.findOne({username: username}, async(err, user) => {
        if(err){
            res.status(500).json({
                err: true,
                msgBody: 'Could not fetch posts'
            })
        }if(user.posts.length === 0){
            res.status(404).json({
                err: false,
                msgBody: 'No posts yet'
            })
        }else{
            for(let i = 0; i < user.posts.length; i++) {
                await Place.findById({_id: user.posts[i]}, async(err, place)=>{
                    if(err){
                        res.status(500).json({
                            err: true,
                            msgBody: 'Server Error'
                        })
                    }else{
                        posts.push(place)
                    }
                })
              }
              res.status(200).json({
                  err: false,
                  msgBody: posts
              })
        }
    })
})

placeRouter.post('/', (req, res) => {
    const {
        name,
        city,
        country,
        description,
        lat,
        lon,
        uid,
        img
    } = req.body
    
    

    User.findOne({username: uid}, (err, user) => {
        console.log(req.body);
        if(err){
            console.log(user);
            res.status(500).json({
                err: true,
                msgBody: 'Server Error'
            })
        }if(!user){
            res.status(404).json({
                err: true,
                msgBody: 'User not found'
            })
        }else{
            
            const newPlace = new Place({
                name,
                city,
                country,
                description,
                lat,
                lon,
                img
            })
            console.log(newPlace);
            
            newPlace.save((err)=>{
                if(err){
                    res.status(500).json({
                        err: true,
                        msgBody: 'Could not save the place'
                    })
                }else{
                    user.posts.push(newPlace)
                    user.save(err => {
                        if (err) {
                            res.status(500).json({
                                message: {
                                    msgBody: "Couldn't save the entry",
                                    msgError: true,
                                },
                            });
                        } else {
                            res.status(200).json({
                                message: {
                                    msgBody: "Entry successfully saved",
                                    msgError: false,
                                },
                            });
                        }
                    })
                }
            })
        }
    })
})

module.exports = placeRouter;