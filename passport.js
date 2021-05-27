const passport = require('passport').Strategy
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/userSchema')

function initialize(passport){
    const authenticateUser = (username, password, done) => {
        User.findOne({username}, async(err, user) => {
            if(err){
                return done(err)
            }if(!user) {
                return done(null, false, {message: 'User not found'})
            }else{
                if(await bcrypt.compare(password, user.password)){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'Incorrect password'})
                }
            }
        })
    }
    passport.use(new localStrategy({ usernameField: 'username' }), 
    authenticateUser)
    passport.serializeUser()
    passport.deserializeUser()
}

module.exports = initialize