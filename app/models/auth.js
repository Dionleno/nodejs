
var objectId = require('mongodb').ObjectId;
var crypto = require('crypto');


function Auth(app){
    this._connection = app.config.mongodb();

}

Auth.prototype.authenticate = function(user,callback){

    var password = crypto.createHash("md5").update(user.password).digest("hex");
    user.password = password;

    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('users',function(error,collection){
              collection.find(user).toArray(callback);
              clientMongoDb.close();
        })

    })
}


module.exports = function(app){
    return new Auth(app);
}
