/**
 * RegistroOperacaoController
 *
 * @description :: Server-side logic for managing Registrooperacaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create: function(req, res, next) {
        RegistroOperacao.create( req.params.all(), function registroCreated(err, registro){
            if(err) return next(err);

            res.redirect('/chamado/show/'+registro.idchamado);
        });
    },

};

