 //exportar recebendo um paramentro no require

 module.exports = function(application){

    /**
     * Cadastrar novos categorias
    */
    application.post('/categoria',function(req,res){
        if(!req.session.auth) res.status(401).json({error: {message: "unauthenticated"}});
        application.app.controllers.custos.storeCategoria(application,req,res)
    });
    
    /**
     * Cadastrar novos usuarios
    */
    application.post('/custo',function(req,res){
        if(!req.session.auth) res.status(401).json({error: {message: "unauthenticated"}});
        application.app.controllers.custos.store(application,req,res)
    });

    /**
     * Listar categorias do usuario
     */
    application.get('/categoria',function(req,res){
        if(!req.session.auth) res.status(401).json({error: {message: "unauthenticated"}});
        application.app.controllers.custos.getCategoria(application,req,res)
    });
 }