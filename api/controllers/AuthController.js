var passport = require('passport');

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
                  //  message: info.message,
                   // user: user
                //});
                req.flash('message', info.message);
                return res.redirect('/');
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                
                /*return res.send({
                    message: info.message,
                    user: user
                });*/
                req.flash('succsess', info.message);
                res.redirect('/usuario/');
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        req.flash('info', '<div class="alert alert-info"><strong>Info!</strong> - Você saiu do sistema.</div>');
        res.redirect('/');
    },

};