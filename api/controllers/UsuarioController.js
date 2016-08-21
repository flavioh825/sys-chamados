/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    new: function(req, res) {
        Setor.find(function foundSetor(err, setor){
    	res.view({
    	   setor: setor
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

