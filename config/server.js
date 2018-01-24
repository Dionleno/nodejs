//importar o express
var app = require('express')();
var consign = require('consign')
var bodyParser = require('body-parser')
//setar o engine of view
app.set('view engine','ejs')
//setar o diretorio das views
app.set('views','./app/views')

//permitir codificação url
app.use(bodyParser.urlencoded({extended: true}));


//autoload dos arquivos de rotas e conexao
consign()
     .include('app/routes')
     .then('config/mysql.js')
     .then('app/models')
     .into(app)

module.exports = app;