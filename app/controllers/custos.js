/**
     * @Save user
     * @param {*} application 
     * @param {*} req 
     * @param {*} res 
     */
module.exports.store = function(application, req,res){
        
        //pegando os dados do formulario
        var request = req.body;

        //validar formulario
        req.assert('categoria_id','Campo nome é obrigatório!').notEmpty();
        req.assert('valor','Campo Email é obrigatório!').notEmpty();
        

        var error = req.validationErrors();

        if(error){
            return res.status(400).json(error);
        }
 
        var model = application.app.models.custos;
        var user_id = req.params.id;
        
        /**
         * @findByID => buscar informações sobre a categoria por ID
         */
        model.findByID(request,function(error, categoria){
            
            /**
             * @saveCusto => Salvar o custo no documento categoria
             */
            model.saveCusto(user_id,request,categoria,function(error, result){
                return res.status(200).json(result);
            })

        })
        
}

module.exports.storeCategoria = function(application, req,res){
        //pegando os dados do formulario
        var request = req.body;

        //validar formulario
        req.assert('categoria_name','Campo nome é obrigatório!').notEmpty();
        var error = req.validationErrors();

        if(error){
            return res.status(400).json(error);
        }

        var model = application.app.models.custos; 
        var user_id = req.params.id;

        model.createCategoria(user_id,request,function(error, result){
            return res.status(200).json(result);
        })

}

module.exports.getCategoria = function(application, req,res){

        //pegando os dados do formulario
        var user_id = req.params.id;
        var model = application.app.models.custos; 

        model.listCategorias(user_id,function(error, result){
            return res.status(200).json(result);
        })

}