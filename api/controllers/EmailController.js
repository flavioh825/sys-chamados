/**
 * EmailController
 *
 * @description :: Server-side logic for managing Emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var nodemailer = require('nodemailer');

module.exports = {
    sendEmail: function(req, res) {

        var smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'flavioh825@gmail.com',
                pass: 'xxxxxx'
            }
        };

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport(smtpConfig);

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Flávio Silva" <flavioh825@gmail.com>', // sender address
            to: 'flavio.henrique@cienciasnauticas.org.br', // list of receivers
            subject: 'Assunto !', // Subject line
            text: 'Hello world 2 ?', // plaintext body
            html: '<b>Conteúdo em html ?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    }
};

