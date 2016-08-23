/**
 * DepartamentoController
 *
 * @description :: Server-side logic for managing setors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new: function(req, res) {
        res.view();
    },


    create: function(req, res, next) {
        Departamento.create( req.params.all(), function departamentoCreated(err, departamento){
            if(err) return next(err);

            res.redirect('/departamento/');
        });
    },

    index: function(req, res, next) {
        Departamento.find(function foundDepartamento(err, departamento){
            if(err) return next(err);

            res.view({
                departamento: departamento
            });
        });
    },

    show: function(req, res, next) {
        Departamento.findOne(req.params.id).populateAll().exec(function(err, departamento){
          if(err) return next(err);
          if(!departamento) return next();
          res.view({
            departamento: departamento
          });
        });
    },

    edit: function(req, res, next) {
        Departamento.findOne(req.params.id, function foundDepartamento(err, departamento){
            if(err) return next(err);
            if(!departamento) return next();
            res.view({
                departamento: departamento
            });
        });
    },

    update: function(req, res, next) {
        Departamento.update(req.params.id, req.params.all(), function departamentoUpdated(err){
            if(err){
                return res.redirect('/departamento/edit/'+req.params.id);
            }

            res.redirect('/departamento/show/'+req.params.id);
        });
    },

    destroy: function(req, res, next) {
        Departamento.destroy(req.params.id).exec(function(){
            res.redirect('/departamento/');
        });
    }
};

