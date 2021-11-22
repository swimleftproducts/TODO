const {User, Todo} = require('../models')
const {genPassword, compare} = require('../authConfig/helpers')
const helperMethods = require('./helperMethods')
const passport = require('../authConfig')
const ApiError = require('../errorhandling/ApiError')

//pull in AWS s3 object
const s3 = require('../s3config/index.js').s3
const { 
    v4: uuidv4,
} = require('uuid');
const { Route53Resolver } = require('aws-sdk')

module.exports={

    apitest(req,res){
        res.send('api working')
    },

    login(req,res,next){ 
        passport.authenticate(
            'local',
            function(err, user, info) {
                
                if (err) { return next(err); }
               
                if (!user) { next(ApiError.badCredentials("incorrect credentials","could not find one of username or password",2002))
                return }

                const populatedUser = user.populate('todos').then((user)=>{
                    req.logIn(user, function(err) {
                       if (err) { return next(err); }
                       const {name,email,todos,_id}=user

                       const todosFullUrl = helperMethods.makeFullImageUrl(todos)

                       return res.json({authenticated:true,user:{name,email,todos:todosFullUrl,_id}});   
                    });
                    }
                ).catch((err) => {
                    console.log('err in login',err)
                    next(ApiError.internal('database error',"Error occured in login",2003))
                })   
            })(req, res, next);
    },
    async logout (req,res,next){
       await req.logOut()
        res.send({authenticated:false})
    }

    ,   
    async register(req,res,next){
        
        try{        
            let user=await User.findOne({email: req.body.email})
            
            if(!user){   
                const saltHash = genPassword(req.body.password);
                const salt = saltHash.salt;
                const hash = saltHash.hash;
                const newToDo = new Todo({
                    title:"a todo, click for info",
                    type: "intro",
                    numberSteps:5,
                    completeSteps:2,
                    imageUrl: "newuser",
                    details: "this is where you put details",
                    created: new Date()
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    hash: hash,
                    salt: salt,
                    todos: [newToDo._id]
                });
                
                await newUser.save()
                await newToDo.save()
             
                res.redirect(307,'/api/login')
            }else{
                next(ApiError.existingCredentials("account exists for that email","account exists for that email",2004))
                return
            }
        }catch(err){
            
            next(ApiError.internal('database error',"Error occured in register",2003))
        }
    },

    isAuthenticated(req,res,next){
        if(req.user){
            User.findById(req.user._id).populate('todos').then((user) => {
                const {name,email,todos,_id} = user
                const todosFullUrl = helperMethods.makeFullImageUrl(todos)
                res.send({authenticated:true,user:{name,email,todos:todosFullUrl,_id}})
            }).catch((err) => {
                console.log('err in isauth',err)
                next(ApiError.internal('database error',"Error occured in isAuth",2001))
            })            
        }else{
            res.send({authenticated:false})
        }
    },

    async create(req,res,next){
        try{
            let user = await User.findById(req.user._id).exec()

            const newTodo = await new Todo({
                title:req.body.title,
                type: req.body.type,
                numberSteps: req.body.numberSteps,
                completeSteps: 0,
                imageUrl: `${req.body.imgKey ||  "blank"}`,
                details: req.body.details,
                created: new Date()
            })
          
            user.todos.push(newTodo._id)
            const results=  await Promise.all([
                user.save(),
                newTodo.save()
            ])
                    
            const todo= results[1]  
            //add full url
            const todoFullUrl = helperMethods.makeFullImageUrl(todo,false)
            res.send(todoFullUrl)
        }catch(err){
            next(ApiError.internal('database error, todo not created',"Error occured in create",2003))
        }
    },
    async getpresignedurl(req,res,next){
        const fileType= req.params.type
        const key =`${req.user._id}/${uuidv4()}.${fileType}`
    
        s3.getSignedUrl('putObject',{
            Bucket: process.env.BUCKET_NAME,
            ContentType:'image/*',
            Key: key
        },(err,url) => {
        res.send({key,url})    
        })

    }


    ,
    async sortTodos(req,res,next){
        const creation = "creation"
        const type = "type"
        const completion = "completion"
        const showall="showall"
        const id = req.user._id
        const direction = parseInt(req.params.direction)
        let todos

      try{
        switch (req.params.method) {
            case creation:
                ({todos} = await User.findById(id).populate({path:'todos',options:{sort:{created:direction}}}).exec())
                break;
            case type:
                ({todos} = await User.findById(id).populate({path:'todos',options:{sort:{type:direction}}}).exec())
                break;
            case completion:
                ({todos} = await User.findById(id).populate({path:'todos',match:{completed:((direction+1)?true:false)}}).exec())
                break;
            case showall:
                ({todos} = await User.findById(id).populate({path:'todos'}).exec())
                break;
            default:
                break;
        }
        //add full url
        const todosFullUrl = helperMethods.makeFullImageUrl(todos)
        res.send(todosFullUrl)
        }catch(err){
            next(ApiError.internal('database error, unable to organize',"Error occured in sortTodos",2003))
        }
    }
    ,
    async delete(req,res,next){
        try{
            const id = req.params.id
            const userId= req.user._id
            
            //Delete image from the S3 bucket
            const todo = await Todo.findById(id)
            const imageParams = {
               Bucket:process.env.BUCKET_NAME,
               Key: todo.imageUrl
            }
            
            try{
               await s3.deleteObject(imageParams,(err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(data)
                    }
                }).promise()       
            }catch(err){
                return next(ApiError.internal('s3 image hosting error',"Error occured in delete",3000))
            }
           
                
            //this removes the ref to the deleted todo from the user document
            await User.findByIdAndUpdate(userId,{
                $pull:{
                    'todos':id
                }
            })  
            //this deletes the todo as sent by the client
            await Todo.findByIdAndRemove(id) 
            const user = await User.findById(userId).populate('todos')
            const {name,email,todos,_id}=user
            const todosFullUrl = helperMethods.makeFullImageUrl(todos)

            res.send({deleted:true,user:{name,email,todos:todosFullUrl,_id}})
        }catch(err){
            
            next(ApiError.internal('database error, todo not deleted',"Error occured in delete",2003))
        }
    },
    async edit(req,res,next){
        try{

            const {id,title,type,numberSteps,imgKey:imageUrl,details} = req.body
            const userId = req.user._id            
            const newTodo=await Todo.findByIdAndUpdate(id,{
                title,type,numberSteps,imageUrl,details
            },{
                new: true
              }) 
            const todoFullUrl = helperMethods.makeFullImageUrl(newTodo,0)
            res.send(todoFullUrl)
        }catch(err){
            next(ApiError.internal('database error, update not made',"Error occured in progress",2003))
        } 
    },

    async progress(req,res,next){
        try{
            const {direction, id} = req.body
           const userId = req.user._id
            // create update object
            const todo = await Todo.findById(id)
            if(todo.completeSteps===0 && direction===0){
               
            }else if(direction ===1 && todo.numberSteps === todo.completeSteps){
                
            }else{
                let UpdateObject ={$inc:{completeSteps:1}}
                if(direction){
                UpdateObject.$inc.completeSteps=1
                    if((todo.completeSteps+1)==todo.numberSteps){
                        UpdateObject.completed=true
                    }
               
                }else{
                UpdateObject.completed=false    
                UpdateObject.$inc.completeSteps=-1
                }
               await Todo.findByIdAndUpdate(id,UpdateObject,{new:true}) 
            }

            const user = await User.findById(userId).populate('todos')
            const {name,email,todos,_id}=user
            const todosFullUrl = helperMethods.makeFullImageUrl(todos)
            res.send({user:{name,email,todos:todosFullUrl,_id}})
        }catch(err){
            next(ApiError.internal('database error, update not made',"Error occured in progress",2003))
        }
    },

    async editUser(req,res,next){
        try{
            let {id,email,name,password} = req.body
            
           let UpdateObject ={}
            if(email!==req.user.email && email!==""){
               //logic to check for this email existing in the database
               const filter = {email:{$eq:email}}
               const docs = await User.findOne(filter) 
               if(!docs){
                  UpdateObject.email=email 
               }
            }
            if(name!==req.user.name && name!==""){
                UpdateObject.name=name
            }
            //check if pw new by generating new salt and hash
            
            if(password!=="" && compare(password,req.user.salt,req.user.hash)){
                const saltHash = genPassword(req.body.password);
                const salt = saltHash.salt;
                const hash = saltHash.hash;
                UpdateObject.salt=salt
                UpdateObject.hash=hash                   
            }

            let editedUser = await User.findByIdAndUpdate(id,
                UpdateObject,{returnOriginal: false})
            
            
            let populatedUser = await editedUser.populate('todos')
            
            function createResponse(user){ 
                const {name,email,todos,_id}=populatedUser
                const todosFullUrl = helperMethods.makeFullImageUrl(todos)
                const returnUser = {name,email,todos:todosFullUrl,_id}
                return returnUser
            }

            res.send({user:createResponse(populatedUser)})
        }catch(err){
            next(ApiError.internal('user account changes not made',"Error occured in edit user",2003))
        }

    },
    async deleteUser (req,res,next){
       
        let id = req.params.id  
        try{
            if(id!==req.user._id.toString()){
                res.send({deleted:"wronguser"})
            }else{

                const user= await User.findById(id).populate('todos')
                //delete all images in S3
                // build key list to delete
                const keyList = user.todos.map((element) => {
                    return {Key:element.imageUrl}
                })
               
                const imageParams = {
                  Bucket:process.env.BUCKET_NAME,
                  Delete:{
                     Objects: keyList
                  }
                }

                try{
                    await s3.deleteObjects(imageParams,(err,data)=>{
                     }).promise()       
                 }catch(err){
                     return next(ApiError.internal('s3 image hosting error',"Error occured in delete",3000))
                 }
                 
                //delete all todos
                await user.todos.forEach(async todo => {
                    await Todo.findByIdAndRemove(todo._id)
                });

                //delete User
                await User.findByIdAndDelete(id)
                res.send({deleted:true})
            }
        }catch(err){
            next(ApiError.internal('user account not deleted',"Error occured in delete user",2003))
        }    
    }
}

