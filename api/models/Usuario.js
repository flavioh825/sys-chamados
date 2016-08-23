/**
 * Usuario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
  	nome: {
  		type: 'string',
  		required: true
  	},
  	sobrenome: {
  		type: 'string',
  		required: true
  	},
  	ramal: {
  		type: 'string',
  	},
  	email: {
        type: 'email',
        required: true,
        unique: true
    },
    senha: {
        type: 'string',
        minLength: 6,
        required: true
    },
    responde_chamado: {
        type: 'integer',
    },
    toJSON: function() {
        var obj = this.toObject();
        delete obj.senha;
        return obj;
    },

    iddepartamento: {
      model: 'departamento'
    },

    chamados: {
      collection: 'chamado',
      via: 'idusuario'
    },

    registrosOperacao: {
      collection: 'registrooperacao',
      via: 'idusuario'
    },

  },
  beforeCreate: function(usuario, cb) {
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(usuario.senha, salt, function(err, hash) {
	        if (err) {
	            console.log(err);
	            cb(err);
	        } else {
	            usuario.senha = hash;
	            cb();
	        }
	    });
	});
  }
};

