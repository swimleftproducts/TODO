const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const path =require('path')
const app = express()



//connect to db
require('./models')

//basic data passing middleware
const basicMiddleware = require('./middleware/basic')
basicMiddleware(app)

const AuthMiddleware = require('./middleware/auth')
AuthMiddleware(app)

//add routes
const routes = require('./routes')
routes(app)


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('/*',(req,res) => {
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))        
    })
}


const port = process.env.PORT || 4001

app.listen(port,() => {
    console.log('listening on PORT ',port )
})