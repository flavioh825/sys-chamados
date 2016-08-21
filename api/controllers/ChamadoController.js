/**
 * ChamadoController
 *
 * @description :: Server-side logic for managing chamadoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new: function(req, res) {
        Categoria.find(function foundCategoria(err, categoria){
            res.view({
                categoria: categoria
            });
        });
    },

    create: function(req, res, next) {
        Chamado.create( req.params.all(), function chamadoCreated(err, chamado){
            if(err) return next(err);

            res.redirect('/chamado/');
        });
    },

    index: function(req, res, next) {
        Chamado.find().populateAll().exec(function foundChamado(err, chamado){
            if(err) return next(err);

            res.view({
                chamado: chamado
            });
        });
    },

    show: function(req, res, next) {
        Chamado.findOne(req.params.id).populateAll().exec(function(err, chamado){
          if(err) return next(err);
          if(!chamado) return next();
          res.view({
            chamado: chamado
          });
        });
    },

    edit: function(req, res, next) {
        Chamado.findOne(req.params.id).populateAll().exec(function foundSetor(err, chamado){
            if(err) return next(err);
            if(!chamado) return next();
            Categoria.find(function foundCategoria(err, categoria){
                res.view({
                    categoria: categoria,
                    chamado: chamado
                });
            });
        });
    },

    update: function(req, res, next) {
        Chamado.update(req.params.id, req.params.all(), function chamadoUpdated(err){
            if(err){
                return res.redirect('/chamado/edit/'+req.params.id);
            }

            res.redirect('/chamado/show/'+req.params.id);
        });
    },

    destroy: function(req, res, next) {
        Chamado.destroy(req.params.id).exec(function(){
            res.redirect('/chamado/');
        });
    }

};