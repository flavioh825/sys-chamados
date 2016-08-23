/**
 * Chamado.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

		ocorrencia: {
			type: 'string',
			required: true
		},
		descricao: {
			type: 'text',
			required: true
		},
		prioridade: {
			type: 'string',
			required: true
		},
		situacao: {
			type: 'integer', //não atendido, espera, concluído
		},
		idcategoria: {
			model: 'categoria'
		},
		idusuario: {
			model: 'usuario'
		},
		registrosOperacao:{
			collection: 'registrooperacao',
			via: 'idchamado'
		}

  }
};

