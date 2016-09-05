$(document).ready(function(){

	$('.form-usuario-new').validate({
		rules: {
			nome: {
				required: true
			},
			sobrenome: {
				required: true
			},
			email: {
				required: true,
				email: true
			},
			senha: {
				required: true
			},
			iddepartamento: {
				required: true
			},
		},
		success: function(element) {
			element
			.text('OK!').addClass('valid')
		}
	});

});