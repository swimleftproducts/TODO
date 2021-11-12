const LocalStrategy = require ('passport-local').Strategy
const {User} = require('../models')
const {validPassword} = require('./helpers')

module.exports = function initializePassport(passport){
    passport.use(new LocalStrategy({usernameField:'email',passwordField:'password'},
        function(email,password,done){
            User.findOne({email:email})
            .then((user) => {          
                if(!user){return done(null,false,{message:"user does not exist"})}
                const isValid = validPassword(password,user.hash,user.salt)
    
                if(isValid){
                    return done(null,user)
                }else{
                    return done(null,false,{message:"wrong password"})
                    
                }  })
            .catch((err) => {
                done(err)
            })
        }
    ))
    
    passport.serializeUser(function(user,done){
        done(null,user.id)
    })

    passport.deserializeUser(function(id,done){
        User.findById(id,(err,user) => {
            if(err){return done(err)}
            done(null,user)
            
        })
    })

}
