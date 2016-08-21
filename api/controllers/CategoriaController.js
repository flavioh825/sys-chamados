/**
 * CategoriaController
 *
 * @description :: Server-side logic for managing categorias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new: function(req, res) {
        res.view();
    },

    create: function(req, res, next) {
        Categoria.create( req.params.all(), function categoriaCreated(err, categoria){
            if(err) return next(err);

            res.redirect('/categoria/');
        });
    },

    index: function(req, res, next) {
        Categoria.find(function foundCategoria(err, categoria){
            if(err) return next(err);

            res.view({
                categoria: categoria
            });
        });
    },

    show: function(req, res, next) {
        Categoria.findOne(req.params.id).populateAll().exec(function(err, categoria){
          if(err) return next(err);
          if(!categoria) return next();
          res.view({
            categoria: categoria
          });
        });
    },

    edit: function(req, res, next) {
        Categoria.findOne(req.params.id, function foundCategoria(err, categoria){
            if(err) return next(err);
            if(!categoria) return next();
            res.view({
                categoria: categoria
            });
        });
    },

    update: function(req, res, next) {
        Categoria.update(req.params.id, req.params.all(), function categoriaUpdated(err){
            if(err){
                return res.redirect('/categoria/edit/'+req.params.id);
            }

            res.redirect('/categoria/show/'+req.params.id);
        });
    },

    destroy: function(req, res, next) {
        Categoria.destroy(req.params.id).exec(function(){
            res.redirect('/categoria/');
        });
    }

};

