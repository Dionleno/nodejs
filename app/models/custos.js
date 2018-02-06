var objectId = require('mongodb').ObjectId;

function Custos(app){
    this._connection = app.config.mongodb();

}

Custos.prototype.createCategoria = function(id,data,callback){

    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('categorias',function(error,collection){
            collection.insert({
                name: data.categoria_name,
                _user: objectId(id),
                custos:{
                    valor: 0,
                    data: new Date()
                }
            },callback)
         })
    })
}


Custos.prototype.listCategorias = function(user_id,callback){

    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('categorias',function(error,collection){
              collection.find({ _user:{$eq: objectId(user_id)}}).toArray(callback);
              clientMongoDb.close();
        })

    })
}

Custos.prototype.findByID = function(request,callback){

    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('categorias',function(error,collection){
              collection.find(objectId(request.categoria_id)).toArray(callback);
              clientMongoDb.close();
        })

    })
}

/**
 * 
 * @param {*} data = user_id, categoria_id, categoria_name, valor 
 * @param {*} callback 
 */
Custos.prototype.saveCusto = function(id,data,categoria,callback){
     
  
     
    this._connection.open(function(error, clientMongoDb){

        clientMongoDb.collection('categorias',function(error,collection){
            collection.update(
                {_id : objectId(data.categoria_id)}, //condição
                {$push : {
                           custos:{
                                valor: data.valor,
                                data: new Date()
                            }
                         }
                }, //objecto de valores para atualizar
                {},
                {}
            );
       })

 
       clientMongoDb.collection('users',function(error,collection){
        collection.find({ custos:{ $elemMatch: {categoria_id: {$eq: objectId(data.categoria_id)}}}}).toArray(function(error, result){
               
                if(result.length > 0 ){
                    var valorAtual = result[0].custos[0].valor;
                     
                    
                    collection.update(
                        { custos:{ $elemMatch: {categoria_id: {$eq: objectId(data.categoria_id)}}}}, //condição
                        {$set : {
                                    'custos.$':{
                                        valor: parseInt(valorAtual) + parseInt(data.valor)
                                    }
                            }
                        }, //objecto de valores para atualizar
                        {},
                        callback
                    );
                }else{
                    collection.update(
                        {_id : objectId(id)}, //condição
                        {$push : {
                                    custos:{
                                        categoria_id: objectId(data.categoria_id),
                                        categoria_name: categoria[0].name,
                                        valor: data.valor
                                    }
                            }
                        }, //objecto de valores para atualizar
                        {},
                        callback
                    );
                }
               
          
        });
       
        
         
     })   

 

    })
 
} 



module.exports = function(app){
      return new Custos(app);
}
