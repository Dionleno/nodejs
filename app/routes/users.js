 //exportar recebendo um paramentro no require

 module.exports = function(application){

    /**
     * Homepage
     */
    application.get('/',function(req,res){
        application.app.controllers.users.index(application,req,res)
    });
   
    /**
     * authenticate login
     */
    application.post('/auth',function(req,res){
        application.app.controllers.auth.authenticate(application,req,res)
    });

    /**
     * authenticate logout
     */
    application.post('/logout',function(req,res){
        application.app.controllers.auth.authDestroy(application,req,res)
    });


    /**
     * Cadastrar novos usuarios
    */
    application.post('/cadastrar',function(req,res){
        application.app.controllers.users.store(application,req,res)
    });

    /**
     * Editar usuarios
    */
    application.put('/user/:id',function(req,res){
       return application.app.controllers.users.edit(application,req,res)
    });
    
    /**
     * Listar usuarios por ID
    */
    application.get('/user/:id',function(req,res){
        application.app.controllers.users.showById(application,req,res)
    });

    /**
     * Listar todos os usuarios
     */
    application.get('/listar',function(req,res){
        application.app.controllers.users.show(application,req,res)
    });

    /**
     * deletar usuario
    */
    application.delete('/user/:id',function(req,res){
        application.app.controllers.users.deleteById(application,req,res)
    });
  

 };