/**
 * Setor.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	nome: {
        type: 'string',
        required: true
    },
    andar: {
    	type: 'string',
    	required: true
    },
    numero_sala: {
    	type: 'string'
    },
    unidade: {
    	type: 'string',
    	required: true
    },

    //one-to-many
    usuarios: {
        collection: 'usuario',
        via: 'idsetor'
    }

  }
};

