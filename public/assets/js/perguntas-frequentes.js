$('#btn-cancelar').on('click', function () {
    location.reload();
});

$('#btn-enviar').on('click', function () {
    var nomeValido     = validarNome();
    var emailValido    = validarEmail();
    var celularValido  = validarCelular();
    var perguntaValida = validarPergunta();

    if (!nomeValido) {
        $('#nome').focus();
        return false;
    }

    if (!emailValido) {
        $('#email').focus();
        return false;
    }

    if (!celularValido) {
        $('#celular').focus();
        return false;
    }

    if (!perguntaValida) {
        $('#pergunta').focus();
        return false;
    }

    var data = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        celular: $('#celular').val(),
        pergunta: $('#pergunta').val()
    }

    Swal.fire({
        title: 'Aguarde...',
        showCancelButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
            $.ajax({
                url: '/cadastrar-pergunta-usuario',
                type: 'POST',
                dataType: 'json',
                data: data
            }).done(function (data) {
                if (data.sucesso) {
                    Swal.fire({
                        icon: 'success',
                        title: 'PERGUNTA ENVIADA COM SUCESSO!',
                        footer: 'Dentro de 48 horas você receberá uma resposta em seu e-mail!',
                        width: 650,
                        allowOutsideClick: false,
                        showCancelButton: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })
                } else {
                    console.log(data.log);
                    Swal.fire({
                        icon: 'error',
                        title: 'NÃO FOI POSSÍVEL ENVIAR SUA PERGUNTA!',
                        width: 720,
                        allowOutsideClick: false,
                        showCancelButton: false,
                        didOpen: () => {
                            Swal.showValidationMessage(
                                data.erro
                            )
                        }
                    })
                }
            }).fail(function () {
                Swal.fire({
                    icon: 'error',
                    title: 'NÃO FOI POSSÍVEL ENVIAR SUA PERGUNTA!',
                    width: 720,
                    allowOutsideClick: false,
                    showCancelButton: false,
                    didOpen: () => {
                        Swal.showValidationMessage(
                            'Tente novamente'
                        )
                    }
                })
            })
        }
    })
});

$('#nome').on('blur', function () {
    validarNome();
});

$('#email').on('blur', function () {
    validarEmail();
});

$('#celular').on('blur', function () {
    validarCelular();
});

$('#pergunta').on('blur', function () {
    validarPergunta();
});

function validarNome() {
    $('#nome').removeClass('is-invalid');
    $('#nome').removeClass('is-valid');
    $('#icone-feedback-nome').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-nome').removeClass('text-danger');
    $('#icone-feedback-nome').removeClass('icofont-verification-check');
    $('#icone-feedback-nome').removeClass('text-success');
    
    var nomeUsuario = $('#nome').val();
    var nomeUsuario = nomeUsuario.toString();
    var nomeUsuario = nomeUsuario.trim();

    if (nomeUsuario === null || nomeUsuario === '') {
        $('#nome').addClass('is-invalid');
        $('#feedback-nome').html('Nome deve ser informado');
        $('#icone-feedback-nome').addClass('icofont-exclamation-circle');
        $('#icone-feedback-nome').addClass('text-danger');
        return false;
    }

    if (nomeUsuario.length < 3) {
        $('#nome').addClass('is-invalid');
        $('#feedback-nome').html('Nome deve ter no mínimo 3 caracteres');
        $('#icone-feedback-nome').addClass('icofont-exclamation-circle');
        $('#icone-feedback-nome').addClass('text-danger');
        return false;
    }

    if (nomeUsuario.length > 200) {
        $('#nome').addClass('is-invalid');
        $('#feedback-nome').html('Nome deve ter no máximo 200 caracteres');
        $('#icone-feedback-nome').addClass('icofont-exclamation-circle');
        $('#icone-feedback-nome').addClass('text-danger');
        return false;
    }

    $('#nome').addClass('is-valid');
    $('#feedback-nome').html('');
    $('#icone-feedback-nome').addClass('icofont-verification-check');
    $('#icone-feedback-nome').addClass('text-success');
    return true;
}

function validarEmail() {
    $('#email').removeClass('is-invalid');
    $('#email').removeClass('is-valid');
    $('#icone-feedback-email').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-email').removeClass('text-danger');
    $('#icone-feedback-email').removeClass('icofont-verification-check');
    $('#icone-feedback-email').removeClass('text-success');

    var emailUsuario = $('#email').val();
    var emailUsuario = emailUsuario.toString();
    var emailUsuario = emailUsuario.trim();

    if (emailUsuario === null || emailUsuario === '') {
        $('#email').addClass('is-invalid');
        $('#feedback-email').html('E-mail deve ser informado');
        $('#icone-feedback-email').addClass('icofont-exclamation-circle');
        $('#icone-feedback-email').addClass('text-danger');
        return false;
    }

    var expressaoRegular = /\S+@\S+\.\S+/;

    if (!expressaoRegular.test(emailUsuario)) {
        $('#email').addClass('is-invalid');
        $('#feedback-email').html('E-mail inválido');
        $('#icone-feedback-email').addClass('icofont-exclamation-circle');
        $('#icone-feedback-email').addClass('text-danger');
        return false;
    }

    $('#email').addClass('is-valid');
    $('#feedback-email').html('');
    $('#icone-feedback-email').addClass('icofont-verification-check');
    $('#icone-feedback-email').addClass('text-success');
    return true;
}

function validarCelular() {
    $('#celular').removeClass('is-invalid');
    $('#celular').removeClass('is-valid');
    $('#icone-feedback-celular').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-celular').removeClass('text-danger');
    $('#icone-feedback-celular').removeClass('icofont-verification-check');
    $('#icone-feedback-celular').removeClass('text-success');

    var celularUsuario = $('#celular').val();
    var celularUsuario = celularUsuario.toString();
    var celularUsuario = celularUsuario.trim();

    if (celularUsuario === null || celularUsuario === '') {
        $('#celular').addClass('is-invalid');
        $('#feedback-celular').html('Celular deve ser informado');
        $('#icone-feedback-celular').addClass('icofont-exclamation-circle');
        $('#icone-feedback-celular').addClass('text-danger');
        return false;
    }

    var expressaoRegular = /^\(\d{2}\) \d{4,5}-\d{4}$/gi;

    if (!expressaoRegular.test(celularUsuario)) {
        $('#celular').addClass('is-invalid');
        $('#feedback-celular').html('Celular inválido');
        $('#icone-feedback-celular').addClass('icofont-exclamation-circle');
        $('#icone-feedback-celular').addClass('text-danger');
        return false;
    }

    $('#celular').addClass('is-valid');
    $('#feedback-celular').html('');
    $('#icone-feedback-celular').addClass('icofont-verification-check');
    $('#icone-feedback-celular').addClass('text-success');
    return true;
}

function validarPergunta() {
    $('#pergunta').removeClass('is-invalid');
    $('#pergunta').removeClass('is-valid');
    $('#icone-feedback-pergunta').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-pergunta').removeClass('text-danger');
    $('#icone-feedback-pergunta').removeClass('icofont-verification-check');
    $('#icone-feedback-pergunta').removeClass('text-success');

    var pergunta = $('#pergunta').val();
    var pergunta = pergunta.toString();
    var pergunta = pergunta.trim();

    if (pergunta === null || pergunta === '') {
        $('#pergunta').addClass('is-invalid');
        $('#feedback-pergunta').html('Pergunta deve ser informada');
        $('#icone-feedback-pergunta').addClass('icofont-exclamation-circle');
        $('#icone-feedback-pergunta').addClass('text-danger');
        return false;
    }

    if (pergunta.length < 5) {
        $('#pergunta').addClass('is-invalid');
        $('#feedback-pergunta').html('Pergunta deve ter no mínimo 5 caracteres');
        $('#icone-feedback-pergunta').addClass('icofont-exclamation-circle');
        $('#icone-feedback-pergunta').addClass('text-danger');
        return false;
    }

    if (pergunta.length > 200) {
        $('#pergunta').addClass('is-invalid');
        $('#feedback-pergunta').html('Pergunta deve ter no máximo 200 caracteres');
        $('#icone-feedback-pergunta').addClass('icofont-exclamation-circle');
        $('#icone-feedback-pergunta').addClass('text-danger');
        return false;
    }

    $('#pergunta').addClass('is-valid');
    $('#feedback-pergunta').html('');
    $('#icone-feedback-pergunta').addClass('icofont-verification-check');
    $('#icone-feedback-pergunta').addClass('text-success');
    return true;
}
