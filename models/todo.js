const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
    title:{
        type:String
    },
    type:{
        type:String
    },
    numberSteps:{
        type:Number
    },
    completeSteps:{
        type:Number
    },
    imageUrl:{
        type:String
    },
    details:{
       type:String
   },
    created:{
        type:Date
    },
    completed:{
        type: Boolean,
        default: false
    }
})

module.exports = todoSchema