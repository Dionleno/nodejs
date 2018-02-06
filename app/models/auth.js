
var objectId = require('mongodb').ObjectId;

function Auth(app){
    this._connection = app.config.mongodb();

}

Custos.prototype.authenticate = function(user,callback){

    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('users',function(error,collection){
              collection.find(user).toArray(callback);
              clientMongoDb.close();
        })

    })
}


module.exports = function(app){
    return new Custos(app);
}
