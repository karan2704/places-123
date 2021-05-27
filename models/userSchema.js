const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true,
        min: 5
    },
    posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Place",
        }]    
})




module.exports = mongoose.model('User', userSchema)