/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    new: function(req, res) {
        Departamento.find(function foundSetor(err, departamento){
    	res.view({
    	   departamento: departamento
    	});
        });
    },

    create: function(req, res, next) {
        Usuario.create( req.params.all(), function usuarioCreated(err, usuario){
            if(err) return next(err);

            res.redirect('/usuario/');
        });
    },

    index: function(req, res, next) {
        Usuario.find().populateAll().exec(function(err, usuario){
            if(err) return next(err);

            res.view({
                usuario: usuario
            });
        });
    },
};

