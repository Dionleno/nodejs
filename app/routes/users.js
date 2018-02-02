 //exportar recebendo um paramentro no require

 module.exports = function(application){

    application.get('/',function(req,res){
        application.app.controllers.users.index(application,req,res)
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
    application.put('/user/edit/:id',function(req,res){
       return application.app.controllers.users.edit(application,req,res)
    });
    
    /**
     * Listar usuarios
    */
    application.get('/user/:id',function(req,res){
        application.app.controllers.users.showById(application,req,res)
    });

    application.get('/listar',function(req,res){
        application.app.controllers.users.show(application,req,res)
    });

    /**
     * deletar usuario
    */
    application.delete('/user/delete/:id',function(req,res){
        application.app.controllers.users.deleteById(application,req,res)
    });
  

 };