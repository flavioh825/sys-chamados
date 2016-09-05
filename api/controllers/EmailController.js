/**
 * EmailController
 *
 * @description :: Server-side logic for managing Emails
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    sendEmail: function(req, res) {

        // sails.hooks.email.send(template, data, options, cb)
        sails.hooks.email.send(
          "testEmail",
          {
            recipientName: "flavio",
            senderName: "chamados",
            senderEmail: "flavioh825@gmail.com"
          },
          {
            from: "flavioh825@gmail.com",
            to: "flavioh825@yahoo.com.br",
            subject: "SailsJS email test"
          },
          function(err) {console.log(err || "Email is sent");}
        )

        return res.send('Email Test');
    }
};

