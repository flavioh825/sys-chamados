/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcryptjs');

module.exports = {
    new: function(req, res) {
        res.locals.flash = _.clone(req.session.flash);
        Departamento.find(function foundSetor(err, departamento){
    	    if(req.isAuthenticated()){
                res.view({
                   departamento: departamento
                });
            }else{    
                res.view('usuario/new', {
    	           departamento: departamento,
                   layout: 'layout_login'
    	        });
            }
        });
        req.session.flash = {};
    },

    create: function(req, res, next) {
        Usuario.create( req.params.all(), function usuarioCreated(err, usuario){
            if(err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                //return next(err);
                return res.redirect('/signup');
            }
            res.redirect('/usuario');
            req.session.flash = {};
        });
    },

    index: function(req, res, next) {
        Usuario.find().populate('iddepartamento').exec(function(err, usuario){
            if(err) return next(err);

            res.view({
                usuario: usuario
            });
        });
    },

    mudaSenha: function(req, res) {
        res.view();
    },

    updateSenha: function(req, res, next) {
        Usuario.findOne({
            id: req.param('id')
        }).exec(function (err, usuario) {
            if(err) return next(err);
            if(!usuario) return next();
            if(!req.param('senhaAtual')||!req.param('novaSenha')){
                req.flash('erro', 'Preencha todos os campos');
                return res.redirect('/usuario/mudasenha');
            }
            //var senhaAtual = req.params.senhaAtual;
            var novaSenha  = req.param('novaSenha');
            
            if(novaSenha.length < 6){
                req.flash('erro', 'A nova senha deve conter no mínimo 6 digitos');
                return res.redirect('/usuario/mudasenha');
            }

            console.log(usuario);

            bcrypt.compare(req.param('senhaAtual'), usuario.senha, function (err, resp) {
              if (!resp){
                console.log(err);
                req.flash('erro', 'A senha atual não corresponde com a digitada');
                return res.redirect('/usuario/mudaSenha/');
              }else{
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(novaSenha, salt, function(err, hash) {
                        if (err) {
                            console.log(err);
                            req.flash('erro', 'Erro ao encriptar a nova senha');
                            return res.redirect('/usuario/mudasenha/');
                        } else {
                            novaSenha = hash;

                            Usuario.update(req.param('id'), { senha: novaSenha }, function usuarioSenhaUpdated(err){
                                if(err){
                                    req.flash('erro', 'Erro ao tentar salvar a nova senha');
                                    return res.redirect('/usuario/mudasenha/');
                                }else{
                                    req.flash('sucesso', 'Sua senha foi alterada!');
                                    return res.redirect('/usuario/mudasenha/');
                                }
                            });

                        }
                    });
                });
              }           
            });

        });
    
    },

};

