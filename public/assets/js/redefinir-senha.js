$('#btn-redefinir-senha').on('click', function() {
    var senhaValida          = validarSenha();
    var confirmarSenhaValida = validarConfirmarSenha();

    if (!senhaValida) {
        $('#senha').focus();
        return false;
    }

    if (!confirmarSenhaValida) {
        $('#confirmar-senha').focus();
        return false;
    }

    var data = {
        email: $('#email').val(),
        senha: $('#senha').val(),
        token: $('#token').val()
    }

    Swal.fire({
        title: 'Aguarde...',
        showCancelButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
            $.ajax({
                url: '/redefinir-senha-usuario',
                type: 'POST',
                dataType: 'json',
                data: data
            }).done (function(data) {
                if (data.sucesso) {
                    Swal.fire({
                        icon: 'success',
                        title: 'SENHA REDEFINIDA COM SUCESSO!',
                        width: 600,
                        allowOutsideClick: false,
                        showCancelButton: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.replace('/login');
                        }
                    })
                } else {
                    console.log(data.log);
                    Swal.fire({
                        icon: 'error',
                        title: 'NÃO FOI POSSÍVEL REDEFINIR SUA SENHA!',
                        width: 700,
                        allowOutsideClick: false,
                        showCancelButton: false,
                        didOpen: () => {
                            Swal.showValidationMessage(
                                data.erro
                            )
                        }
                    })
                }
            }).fail (function() {
                Swal.fire({
                    icon: 'error',
                    title: 'NÃO FOI POSSÍVEL REDEFINIR SUA SENHA',
                    width: 690,
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

$('#senha').on('blur', function() {
    validarSenha();
});

$('#confirmar-senha').on('blur', function() {
    validarConfirmarSenha();
});

function validarSenha() {
    $('#senha').removeClass('is-invalid');
    $('#senha').removeClass('is-valid');
    $('#icone-feedback-senha').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-senha').removeClass('text-danger');
    $('#icone-feedback-senha').removeClass('icofont-verification-check');
    $('#icone-feedback-senha').removeClass('text-success');

    var senhaUsuario = $('#senha').val();
    var senhaUsuario = senhaUsuario.toString();
    var senhaUsuario = senhaUsuario.trim();

    if (senhaUsuario === null || senhaUsuario === '') {
        $('#senha').addClass('is-invalid');
        $('#feedback-senha').html('Senha deve ser informada');
        $('#icone-feedback-senha').addClass('icofont-exclamation-circle');
        $('#icone-feedback-senha').addClass('text-danger');
        return false;
    }

    if (senhaUsuario.length < 8) {
        $('#senha').addClass('is-invalid');
        $('#feedback-senha').html('Senha deve ter no mínimo 8 caracteres');
        $('#icone-feedback-senha').addClass('icofont-exclamation-circle');
        $('#icone-feedback-senha').addClass('text-danger');
        return false;
    }

    if (senhaUsuario.length > 200) {
        $('#senha').addClass('is-invalid');
        $('#feedback-senha').html('Senha deve ter no máximo 200 caracteres');
        $('#icone-feedback-senha').addClass('icofont-exclamation-circle');
        $('#icone-feedback-senha').addClass('text-danger');
        return false;
    }

    $('#senha').addClass('is-valid');
    $('#feedback-senha').html('');
    $('#icone-feedback-senha').addClass('icofont-verification-check');
    $('#icone-feedback-senha').addClass('text-success');
    return true;
}

function validarConfirmarSenha() {
    validarSenha();

    $('#confirmar-senha').removeClass('is-invalid');
    $('#confirmar-senha').removeClass('is-valid');
    $('#icone-feedback-confirmar-senha').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-confirmar-senha').removeClass('text-danger');
    $('#icone-feedback-confirmar-senha').removeClass('icofont-verification-check');
    $('#icone-feedback-confirmar-senha').removeClass('text-success');


    var confirmarSenha = $('#confirmar-senha').val();
    var confirmarSenha = confirmarSenha.toString();
    var confirmarSenha = confirmarSenha.trim();

    var senhaUsuario = $('#senha').val();
    var senhaUsuario = senhaUsuario.toString();
    var senhaUsuario = senhaUsuario.trim();

    if (confirmarSenha === null || confirmarSenha === '') {
        $('#confirmar-senha').addClass('is-invalid');
        $('#feedback-confirmar-senha').html('Senha deve ser confirmada');
        $('#icone-feedback-confirmar-senha').addClass('icofont-exclamation-circle');
        $('#icone-feedback-confirmar-senha').addClass('text-danger');
        return false;
    }

    if (confirmarSenha !== senhaUsuario) {
        $('#confirmar-senha').addClass('is-invalid');
        $('#feedback-confirmar-senha').html('Senha inválida');
        $('#icone-feedback-confirmar-senha').addClass('icofont-exclamation-circle');
        $('#icone-feedback-confirmar-senha').addClass('text-danger');
        return false;
    }

    $('#confirmar-senha').addClass('is-valid');
    $('#feedback-confirmar-senha').html('');
    $('#icone-feedback-confirmar-senha').addClass('icofont-verification-check');
    $('#icone-feedback-confirmar-senha').addClass('text-success');
    return true;
}