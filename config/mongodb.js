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
                'mongo_finance', //host:27017
                '27017', //port
                {} //config server
            ),
            {}
    );
   
  
    return db;
}

module.exports = function(){
      return connMongoDb;
}