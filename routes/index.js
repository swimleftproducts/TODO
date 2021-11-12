
//add routes
const apiController = require('../controllers/apiController.js')
const setupController =require('../controllers/setupController.js')


module.exports= (app) => {
    
    //setup routes

    

    app.get('/test/amIauth',setupController.authorized)

        //clearning users and todos
    
    app.get('/setup/removeusers',setupController.clearUsers)
    app.get('/setup/removetodos', setupController.clearTodos)
    app.get('/setup/getallusers',setupController.getAllUsers)
    app.post('/setup/addoneuser',setupController.addoneuser)
    app.get('/setup/getAllTodos',setupController.getAllTodos)

    //api routes

    app.get('/api/test',apiController.apitest)

    app.get('/api/isauthenticated',apiController.isAuthenticated)

    app.post('/api/register',apiController.register)

    app.post('/api/login',apiController.login)

    app.post('/api/logout',checkAuthenticated, apiController.logout)
    
    app.get('/api/todos/:method/:direction',apiController.sortTodos)

    app.post('/api/create',checkAuthenticated,apiController.create)


    app.get('/api/getpresignedurl/:type',checkAuthenticated, apiController.getpresignedurl)

    app.put('/api/edit',checkAuthenticated,apiController.edit)

    app.put('/api/progress',checkAuthenticated,apiController.progress)

    app.delete('/api/delete/:id',checkAuthenticated,apiController.delete)

    app.put('/api/user/edit',checkAuthenticated,apiController.editUser)


    app.delete('/api/user/delete/:id',checkAuthenticated,apiController.deleteUser)


    function checkAuthenticated(req,res,next){
    
        if(req.isAuthenticated()){
           return next()
        }
        console.log(req.user)
        res.json({error:"access not permited"})
    }
}