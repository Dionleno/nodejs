var objectId = require('mongodb').ObjectId;

function Users(connection){
   this._connection = connection;
}

Users.prototype.getUsers = function(callback){
    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('users',function(error,collection){
              collection.find().toArray(callback);
              clientMongoDb.close();
        })

    })
    //this._connection.query('select * from users', callback);
}

Users.prototype.getUserID = function(id,callback){
    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('users',function(error,collection){
              collection.find(objectId(id)).toArray(callback);
              clientMongoDb.close();
        })

    })
}

Users.prototype.saveUser = function(data,callback){

    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('users',function(error,collection){
              collection.insert(data,callback)
              clientMongoDb.close()
        })

    })

    //mysql -> this._connection.query('insert into users set ? ', data , callback);
}

Users.prototype.updateUser = function(id, data,callback){

    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('users',function(error,collection){
              collection.update(
                  {_id : objectId(id)}, //condição
                  {$set : data}, //objecto de valores para atualizar
                  {},
                  callback
              );
              clientMongoDb.close();
        })

    })
   // this._connection.query('UPDATE users set ? where id='+ user_id.id , data , callback);
}

Users.prototype.deleteUser = function(id,callback){
    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('users',function(error,collection){
              collection.remove( {_id : objectId(id)},callback);
              clientMongoDb.close();
        })

    })
}

module.exports = function(){
      return Users;
}