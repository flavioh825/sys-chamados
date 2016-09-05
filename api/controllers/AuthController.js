var passport = require('passport');
var bcrypt = require('bcryptjs');
var randomstring = require('randomstring');
var nodemailer = require('nodemailer');

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
                var senhaGerada = randomstring.generate(7);
                console.log(senhaGerada);

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(senhaGerada, salt, function(err, hash) {
                        if (err) {
                            console.log(err);
                                req.flash('erro', 'Erro ao encriptar a nova senha');
                                return res.redirect('/usuario/mudasenha/');
                        } else {
                            var senhaHash = hash;
                            console.log(senhaHash);
                            Usuario.update(usuario.id, { senha: senhaHash }, function usuarioSenhaUpdated(err){
                                if(err){
                                    req.flash('erro', '<div class="alert alert-danger">Erro ao tentar modificar a senha.</div>');
                                    return res.redirect('/forgot');
                                }else{
                                    var smtpConfig = {
                                        host: 'smtp.gmail.com',
                                        port: 465,
                                        secure: true, // use SSL
                                        auth: {
                                            user: 'flavioh825@gmail.com',
                                            pass: 'xxxxxxxx'
                                        }
                                    };

                                    // create reusable transporter object using the default SMTP transport
                                    var transporter = nodemailer.createTransport(smtpConfig);

                                    // setup e-mail data with unicode symbols
                                    var mailOptions = {
                                        from: '"Flávio Silva" <flavioh825@gmail.com>', // sender address
                                        to: usuario.email, // list of receivers
                                        subject: 'Mudança de senha', // Subject line
                                        text: 'Nova senha', // plaintext body
                                        html: '<b>Sua nova senha é: <u>'+senhaGerada+'</u> , por favor altere por uma de sua preferência.</b>' // html body
                                    };

                                    // send mail with defined transport object
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if(error){
                                            return console.log(error);
                                        }
                                        console.log('Message sent: ' + info.response);
                                    });
                                    req.flash('info', '<div class="alert alert-info">A nova senha foi enviada para seu email.</div>');
                                    return res.redirect('/forgot');
                                }
                            });
                        }
                    });
                });

            }
            
        });
    },
    
};
