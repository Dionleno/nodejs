const express = require('express');
const auth = require('../../config/auth')

//exportar recebendo um paramentro no require

 module.exports = function(application){


    var routerNoAuth = express.Router();
    /**
     * Homepage
     */
    routerNoAuth.get('/',function(req,res){
       
        application.app.controllers.users.index(application,req,res)
    });
   
    /** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YThmMGI4NWZiNmM2NjIyODA3MGQ5ZTMiLCJuYW1lIjoiZGlvbmxlbm8gdmlkYWxldHRpIiwiZW1haWwiOiJqaG9uc3BfbGVub0Bob3RtYWlsLmNvbSIsInBhc3N3b3JkIjoiMzhhNzM0ZDVjOTlhYTk1NjUxMjU0MTE0NDU2NjkzZjUiLCJpYXQiOjE1MTkzMjQxODMsImV4cCI6MTUxOTQxMDU4M30.XP4_I5RMfCRZexBZW1Zvr3Pg-UqlNud-K26X7FcflPI
     * authenticate login
     */
    routerNoAuth.post('/auth',function(req,res){
        application.app.controllers.auth.authenticate(application,req,res)
    });

    /**
     * Cadastrar novos usuarios
    */
    routerNoAuth.post('/cadastrar',function(req,res){
        application.app.controllers.users.store(application,req,res)
    });
    
    application.use('/', routerNoAuth)






    var routerAuth = express.Router();
    application.use('/api', routerAuth);
    routerAuth.use(auth);
    
    /**
     * authenticate logout
     */
    routerAuth.post('/logout',function(req,res){
        application.app.controllers.auth.authDestroy(application,req,res)
    });


   

    /**
     * Editar usuarios
    */
    routerAuth.put('/user',function(req,res){
       return application.app.controllers.users.edit(application,req,res)
    });
    
    /**
     * Listar usuarios por ID
    */
    routerAuth.get('/user',function(req,res){
        
        application.app.controllers.users.showById(application,req,res)
    });

    /**
     * Listar todos os usuarios
     */
    routerAuth.get('/listar',function(req,res){
        application.app.controllers.users.show(application,req,res)
    });

    /**
     * deletar usuario
    */
    routerAuth.delete('/user/:id',function(req,res){
        application.app.controllers.users.deleteById(application,req,res)
    });
    routerAuth.get('/',function(req,res){
        console.log('teste');
        
        //application.app.controllers.users.index(application,req,res)
    });
    
   
   
 };