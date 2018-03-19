//importar a biblioteca do mongodb
var mongo = require('mongodb');


var connMongoDb = function(){
    console.log('Conectado mongo');
    
    /**
     * mongo.Db parametro => nomeDoBanco, ObjectDeAcesso, configurações Opcionais
     */
    var db = new mongo.Db(
           'finance',
            new mongo.Server(
                'naboo.mongodb.umbler.com', //host:27017
                '48580', //port
                {} //config server
            ),
            {}
    );
    
  
    return db;
}

module.exports = function(){
      return connMongoDb;
}