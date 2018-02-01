 //exportar recebendo um paramentro no require

 module.exports = function(application){

    application.get('/',function(req,res){
        application.app.controllers.users.index(application,req,res)
    });

    application.get('/listar',function(req,res){
        application.app.controllers.users.show(application,req,res)
    });

    application.post('/cadastrar',function(req,res){
        application.app.controllers.users.store(application,req,res)
    })

 };