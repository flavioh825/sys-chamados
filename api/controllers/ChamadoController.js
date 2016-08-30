/**
 * ChamadoController
 *
 * @description :: Server-side logic for managing chamadoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new: function(req, res) {
        Categoria.find(function foundCategoria(err, categoria){
            Departamento.find(function foundDepartamento(err, departamento){
                res.view({
                    categoria: categoria,
                    departamento: departamento
                });
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
        Chamado.find({or : [{ idusuario: req.user.id }, { iddepartamento: req.user.iddepartamento }]}).populateAll().exec(function foundChamado(err, chamado){
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
          Departamento.findOne(chamado.idusuario.iddepartamento, function foundDepartamento(err, departamento){
            RegistroOperacao.find({ where: { idchamado: req.params.id }}).populateAll().exec(function(err, registro){
                res.view({
                chamado: chamado,
                departamento: departamento,
                registro: registro
              });
            });
          });
        });
    },

    edit: function(req, res, next) {
        Chamado.findOne(req.params.id).populateAll().exec(function foundChamado(err, chamado){
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
                req.flash('err_situacao', 'Erro ao alterar a situação do chamado.');
                return res.redirect('/chamado/edit/'+req.params.id);
            }
            req.flash('success_situacao', 'Chamado Alterado com sucesso.');
            res.redirect('/chamado/show/'+req.params.id);
        });
    },

    updateSituacao: function(req, res, next) {
        Chamado.update(req.params.id, { situacao: req.params.situacao }, function chamadoSituacaoUpdated(err){
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