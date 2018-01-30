 //exportar recebendo um paramentro no require

 module.exports = function(application){

    application.get('/',function(req,res){
         res.render('secao/cadastrar',{validacao: {}})
    });

    application.get('/listar',function(req,res){
        var conn = application.config.mysql();
        var modelUser = new application.app.models.users(conn);

        modelUser.getUsers(function(error, result){
            res.render('secao/listar', {users: result})
        });
    });

    application.post('/cadastrar',function(req,res){
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
    })

 };