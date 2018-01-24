  
 module.exports = function(application){
    application.get('/noticias',function(req,res){
        var connection = application.config.mysql();
        var modelNoticias = application.app.models.noticias;

        modelNoticias.getNoticias(connection, function(error, result){
            res.send(result)
        })
        
     });

 };