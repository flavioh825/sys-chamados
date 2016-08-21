/**
 * SetorController
 *
 * @description :: Server-side logic for managing setors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new: function(req, res) {
        res.view();
    },


    create: function(req, res, next) {
        Setor.create( req.params.all(), function setorCreated(err, setor){
            if(err) return next(err);

            res.redirect('/setor/');
        });
    },

    index: function(req, res, next) {
        Setor.find(function foundSetor(err, setor){
            if(err) return next(err);

            res.view({
                setor: setor
            });
        });
    },

    show: function(req, res, next) {
        Setor.findOne(req.params.id).populateAll().exec(function(err, setor){
          if(err) return next(err);
          if(!setor) return next();
          res.view({
            setor: setor
          });
        });
    },

    edit: function(req, res, next) {
        Setor.findOne(req.params.id, function foundSetor(err, setor){
            if(err) return next(err);
            if(!setor) return next();
            res.view({
                setor: setor
            });
        });
    },

    update: function(req, res, next) {
        Setor.update(req.params.id, req.params.all(), function setorUpdated(err){
            if(err){
                return res.redirect('/setor/edit/'+req.params.id);
            }

            res.redirect('/setor/show/'+req.params.id);
        });
    },

    destroy: function(req, res, next) {
        Setor.destroy(req.params.id).exec(function(){
            res.redirect('/setor/');
        });
    }
};

