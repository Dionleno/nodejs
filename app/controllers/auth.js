/**
     * @Save user
     * @param {*} application 
     * @param {*} req 
     * @param {*} res 
     */
    module.exports.authenticate = function(application, req,res){
        //pegando os dados do formulario
        var users = req.body;

        //validar formulario
        req.assert('email','Campo Email é obrigatório!').notEmpty().isEmail();
        req.assert('password','Campo senha é obrigatório!').notEmpty().isLength({ min: 5 });

        var error = req.validationErrors();

        if(error){
            return res.status(400).json(error);
        }

        var model = application.app.models.auth;

        model.authenticate(users,function(error, result){

            if(error) res.status(400).json(error);

            if(result[0] != undefined){
                req.session.auth = true;
                req.session.user = result[0];
               
                return res.status(200).json(result); 
            }else{
                return res.status(400).json({error:{messsage:"erro ao autenticar"}});
            }
            
        })


    }

    module.exports.authDestroy = function(application, req,res){
        req.session.destroy(function(error){

            if(error) res.status(400).json(error);

            return res.status(200).json({success:1}); 
        })
    }

