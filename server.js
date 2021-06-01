const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config();

const userRouter = require('./routes/user')
const placeRouter = require('./routes/place');

const app = express()

app.use(
    cors({
        origin: "*",
        credentials: true,
        allowedHeaders: '*'
    })
)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json())

const port = process.env.PORT || 5000

const url = process.env.MONGO_URI

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to Database')
})


if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname, './client/build')))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, './', 'client', 'build', 'index.html'))
    })
}

app.use('/user', userRouter)
app.use('/place', placeRouter)



app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`);
})
