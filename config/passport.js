var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function(usuario, done) {
    done(null, usuario.id);
});

passport.deserializeUser(function(id, done) {
    Usuario.findOne({ id: id }, function (err, usuario) {
        done(err, usuario);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
  },
  function(email, senha, done) {

    Usuario.findOne({ email: email }, function (err, usuario) {
      if (err) { return done(err); }
      if (!usuario) {
        return done(null, false, { message: '<div class="alert alert-danger"><strong>Error!</strong> - E-mail Incorreto.</div>' });
      }

      bcrypt.compare(senha, usuario.senha, function (err, res) {
          if (!res) {
            return done(null, false, {
              message: '<div class="alert alert-danger"><strong>Error!</strong> - Senha Inválida.</div>'
            });
          }
          var returnUser = {
            email: usuario.email,
            nome: usuario.nome,
            sobrenome: usuario.sobrenome,
            createdAt: usuario.createdAt,
            responde_chamado: usuario.responde_chamado,
            id: usuario.id
          };
          return done(null, returnUser, {
            message: 'Você está logado!'
          });
        });
    });
  }
));