const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    img: {
        type: Array,
        required: true
    }
})


module.exports = mongoose.model('Place', placeSchema)