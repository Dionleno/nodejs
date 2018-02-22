    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const env = require('../../config/.env')


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

                const token = jwt.sign(result[0], env.authSecret,{
                    expiresIn: "1 day"
                })

               const {name,email} = result[0]
               
                return res.status(200).json({name,email,token}); 
            }else{
                return res.status(400).json({error:{messsage:"erro ao autenticar"}});
            }
            
        })


    }

    module.exports.validateToken = function(application, req,res){
        const token = req.body.token || ''

        jwt.verify(token,env.authSecret,function(err, decoded){
            return res.status(200).send({valid: !err})
        })
    }

    module.exports.authDestroy = function(application, req,res){
        req.session.destroy(function(error){

            if(error) res.status(400).json(error);

            return res.status(200).json({success:1}); 
        })
    }

