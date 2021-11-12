
const {User, Todo} = require('../models')
const {genPassword} = require('../authConfig/helpers')

module.exports={

    helloworld(req,res){
        res.send('hello paonia')
    },
    clearTodos(req, res){
        Todo.deleteMany({})
        .then(() => {
            res.send("all todos are removed")
        })
    },
    clearUsers(req,res){
        User.deleteMany({})
        .then(() => {
            res.send("all users are removed")
        })
    },
    getAllUsers(req,res){
        User.find({})
        .then((users) => {
            res.send(users)
        })
    },
    getAllTodos(req,res){
        Todo.find({})
        .then((users) => {
            res.send(users)
        })
    },
    authorized(req,res){
       res.send(req.isAuthenticated())
    },

    async addoneuser(req,res){
        const saltHash = genPassword("user1");
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newToDo = new Todo({
            title:"My First Todo",
            type: "sample",
            numberSteps:5,
            completeSteps:2,
            imageUrl: "https://images.unsplash.com/photo-1570188973506-253e77d46c12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80",
            details: "this is where you need to keep track of details"
        })

        const secondToDo = new Todo({
            title:"My second  Todo",
            type: "sample",
            numberSteps:5,
            completeSteps:0,
            imageUrl: "https://images.unsplash.com/photo-1570188973506-253e77d46c12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1033&q=80",
            details: "this is where you need to keep track of details"
        })

        const newUser = new User({
            name: "user1",
            email: "user1@test.com",
            hash: hash,
            salt: salt,
            todos: [newToDo._id, secondToDo._id]
        });

        await Promise.all([
            newUser.save(),
            newToDo.save(),
            secondToDo.save()
        ])


        res.json({
            newToDo,
            newUser
        })
    }
}