
module.exports = function(){

    this.getUsers = (connection, callback) => {
        connection.query('select * from users', callback);
    }

    this.saveUser = (data, connection ,callback) => {
        console.log(data);
        connection.query('insert into users set ? ', data , callback);
    }

    return this;
}