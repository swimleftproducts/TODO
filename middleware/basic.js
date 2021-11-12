const express = require('express')
const cors = require('cors')

module.exports = (app) => {
    const mylogger = (req,res,next)=>{
        console.log("body",req.body)
        console.log("params",req.params)
        next()
    }


    app.use(express.json())
    app.use(express.urlencoded({extended:false}));
    app.use(cors({
        origin: [`http://localhost:3000`],
        credentials: true
       }))
    // app.use(mylogger)

    
}