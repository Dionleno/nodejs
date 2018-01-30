//separar o arquivo de configuração 
var app = require('./config/server')
  
//porta que sera executada
app.listen(3000 , function(){
    console.log('servidor rodando!!');
 });