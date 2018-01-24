 //exportar recebendo um paramentro no require

 module.exports = function(application){
    application.get('/',function(req,res){
         res.render('secao/cadastrar')
    });

    application.get('/listar',function(req,res){

        var conn = application.config.mysql();
        var modelUser = application.app.models.users;

        modelUser.getUsers(conn, function(error, result){
            res.render('secao/listar', {users: result})
        })
    
    });

     application.post('/cadastrar',function(req,res){
        var users = req.body;
        //res.send(users)
        //users.registered = null;
        var conn = application.config.mysql();
        var modelUser = application.app.models.users;
        
        modelUser.saveUser(users, conn, function(error, result){
            if (error) throw error;
            res.redirect('listar')
        })

     })

 };