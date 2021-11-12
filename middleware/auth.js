const {store} = require('../models')
const passport = require('passport')
const session = require('express-session')
const MongoStore= require('connect-mongo')
const {getDevDbConnectionString} = require('../config');

const Store = MongoStore.create({
    mongoUrl: getDevDbConnectionString(),
    mongoOptions: {useNewUrlParser:true,useUnifiedTopology:true},
    collectionName: 'sessions'
})

//this call runs all of the auth Config code by requireing index.js

require('../authConfig')

module.exports=(app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: Store,
        cookie:{maxAge: (1000*60*10)}
    }))

    //calls to get passport set up
    app.use(passport.initialize())
    app.use(passport.session())
}