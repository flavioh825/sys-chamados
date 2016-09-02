var passport = require('passport');
var bcrypt = require('bcryptjs');
var randomstring = require('randomstring');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    login: function(req, res) {

        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                //return res.send({
                   // message: info.message,
                  //  user: user
                //});
                req.flash('err_login', info.message);
                return res.redirect('/');
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                
                /*return res.send({
                    message: info.message,
                    user: user
                });*/
                res.redirect('/usuario/');
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        req.flash('info', '<div class="alert alert-info"><strong>Info!</strong> - Você saiu do sistema.</div>');
        res.redirect('/');
    },

    changePassword: function(req, res, next) {
        console.log(req.param('email'));
        Usuario.findOne({
            email: req.param('email')
        }).exec(function (err, usuario) {
            if(err) return next(err);
            if(!usuario) {
                //console.log(req.param('email'));
                req.flash('erro', '<div class="alert alert-danger">E-mail não encontrado em nosso sistema.</div>');
                res.redirect('/forgot');
            }else{

                console.log(usuario.nome);
                var novaSenha = randomstring.generate(7);
                console.log(novaSenha);

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(novaSenha, salt, function(err, hash) {
                        if (err) {
                            console.log(err);
                                req.flash('erro', 'Erro ao encriptar a nova senha');
                                return res.redirect('/usuario/mudasenha/');
                        } else {
                            novaSenhaHash = hash;
                            console.log(novaSenhaHash);
                            /*Usuario.update(usuario.id, { senha: novaSenha }, function usuarioSenhaUpdated(err){
                                if(err){
                                    req.flash('erro', '<div class="alert alert-danger">Erro ao tentar modificar a senha.</div>');
                                    return res.redirect('/forgot');
                                }else{
                                    req.flash('info', '<div class="alert alert-info">A nova senha foi enviada para seu email.</div>');
                                    return res.redirect('/forgot');
                                }
                            });*/
                            req.flash('info', '<div class="alert alert-info">A nova senha foi enviada para seu email.</div>');
                            return res.redirect('/forgot');
                        }
                    });
                });

            }
            
        });
    },
    
};