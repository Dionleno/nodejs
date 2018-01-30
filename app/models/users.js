function Users(connection){
   this._connection = connection;
}

Users.prototype.getUsers = function(callback){
    this._connection.query('select * from users', callback);
}

Users.prototype.saveUser = function(data,callback){
     this._connection.query('insert into users set ? ', data , callback);
}

module.exports = function(){
      return Users;
}