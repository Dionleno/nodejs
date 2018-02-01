module.exports.index = function(application, req,res){
    res.render('secao/cadastrar',{validacao: {}})
}

module.exports.show = function(application, req,res){
    var conn = application.config.mysql();
    var modelUser = new application.app.models.users(conn);

    modelUser.getUsers(function(error, result){
        res.render('secao/listar', {users: result})
    });
}

module.exports.store = function(application, req,res){
    
        //pegando os dados do formulario
        var users = req.body;

        //validar formulario
        req.assert('name','Campo nome é obrigatório!').notEmpty();
        req.assert('email','Campo Email é obrigatório!').notEmpty().isEmail();
        

        var error = req.validationErrors();

        if(error){
            res.render('secao/cadastrar',{validacao: error})
            return;
        }

        var conn = application.config.mysql();
        var modelUser = new application.app.models.users(conn);
        
        modelUser.saveUser(users, function(error, result){
            if (error) throw error;
            res.redirect('listar')
        })
}