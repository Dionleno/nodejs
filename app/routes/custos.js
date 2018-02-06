 //exportar recebendo um paramentro no require

 module.exports = function(application){

    /**
     * Cadastrar novos categorias
    */
    application.post('/categoria/:id',function(req,res){
        application.app.controllers.custos.storeCategoria(application,req,res)
    });
    
    /**
     * Cadastrar novos usuarios
    */
    application.post('/custo/:id',function(req,res){
        application.app.controllers.custos.store(application,req,res)
    });

    /**
     * Listar categorias do usuario
     */
    application.get('/categoria/:id',function(req,res){
        application.app.controllers.custos.getCategoria(application,req,res)
    });
 }