 
var jwt = require('jsonwebtoken');
var env = require('./.env')

module.exports = (req, res, next) => {
    
    if(require.method === "OPTIONS"){
        next()
    }else{

         
            if (req.headers['authorization']) {
                req.headers['authorization'] && req.headers['authorization'].split(' ')[0] === 'Bearer'
                var token = req.headers['authorization'].split(' ')[1];
            }
        
        
        //req.body.token || req.query.token || req.headers['authorization']
 
        if(!token){
            return res.status(403).send({errors:['No token provided']})
        }else{
            jwt.verify(token,env.authSecret,function(err, decoded){
                if(err){
                    return res.status(403).send({errors:['Failed autenticate token']})
                }else{
                    next()
                }
                
            })
        }
    }
}

