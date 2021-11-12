const mongoose = require('mongoose')
const userSchema = require('./user')
const todoSchema = require('./todo')


// get db string
const {getDevDbConnectionString} = require('../config');

mongoose.connect(getDevDbConnectionString(),
{ useNewUrlParser: true,
useUnifiedTopology: true}
,(err) => {
    if(err){console.log(err)}
    else{
        console.log('connected to DB')
    }
})




const User = mongoose.model('User',userSchema)
const Todo = mongoose.model('Todo',todoSchema)

module.exports={
   User,
   Todo
  }