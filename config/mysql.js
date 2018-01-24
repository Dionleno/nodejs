//importar a biblioteca do mysql
var mysql = require('mysql');

//armazenar a fucção de criar a conexao em uma variavel
var connMysql = function(){
    console.log('conectado!');
    
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password: '',
        database:'portal_noticias'
    });
}

module.exports = function(){
    return connMysql;
}
       