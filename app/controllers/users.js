    const jwt = require('jsonwebtoken');
    
    module.exports.index = function(application, req,res){
        res.render('secao/cadastrar',{validacao: {}})
    }
 
    /**
     * @Save user
     * @param {*} application 
     * @param {*} req 
     * @param {*} res 
     */
    module.exports.store = function(application, req,res){
        
            //pegando os dados do formulario
            var users = req.body;

            //validar formulario
            req.assert('name','Campo nome é obrigatório!').notEmpty();
            req.assert('email','Campo Email é obrigatório!').notEmpty().isEmail();
            req.assert('password','Campo senha é obrigatório!').notEmpty().isLength({ min: 5 });

            var error = req.validationErrors();

            if(error){
                return res.status(400).json(error);
            }

            var conn = application.config.mongodb();
            var modelUser = new application.app.models.users(conn);
            
            modelUser.saveUser(users,function(error, result){
                return res.status(200).json(result);
            })
    }


    module.exports.show = function(application, req,res){
            var conn = application.config.mongodb();
            var modelUser = new application.app.models.users(conn);

            modelUser.getUsers(function(error, result){
                return res.json(result);
            });
    }


    module.exports.showById = function(application, req,res){
            var conn = application.config.mongodb();
            var modelUser = new application.app.models.users(conn);
            var id = req.session.user._id;
            console.log(id);
            
            modelUser.getUserID(id,function(error, result){
                return res.json(result);
            });
    }


    module.exports.deleteById = function(application, req,res){
            var conn = application.config.mongodb();
            var modelUser = new application.app.models.users(conn);
            var id = req.params.id;
            console.log(id);
            
            modelUser.deleteUser(id,function(error, result){
                return res.json(result);
            });
    }

    
    module.exports.edit = function(application, req,res){
        //pegando os dados do formulario
        var users = req.body;

        //validar formulario
        req.assert('name','Campo nome é obrigatório!').notEmpty();
        req.assert('email','Campo Email é obrigatório!').notEmpty().isEmail();

        var error = req.validationErrors();

        if(error) return  res.json(error);

        var user_id = req.session.user._id;
       console.log(user_id);
       
        var conn = application.config.mongodb();
        var modelUser = new application.app.models.users(conn);
        
        modelUser.updateUser(user_id,users,function(error, result){
            if (error) throw error;
            return res.json(result);
        })

    }