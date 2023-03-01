$('#btn-criar-conta').on('click', function () {
    var nomeValido           = validarNome();
    var emailValido          = validarEmail();
    var senhaValida          = validarSenha();
    var confirmarSenhaValida = validarConfirmarSenha();

    if (!nomeValido) {
        $('#nome').focus();
        return false;
    }

    if (!emailValido) {
        $('#email').focus();
        return false;
    }

    if (!senhaValida) {
        $('#senha').focus();
        return false;
    }

    if (!confirmarSenhaValida) {
        $('#confirmar-senha').focus();
        return false;
    }

    var data = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        senha: $('#senha').val()
    }

    Swal.fire({
        title: 'Aguarde...',
        showCancelButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
            $.ajax({
                url: '/criar-conta',
                type: 'POST',
                dataType: 'json',
                data: data
            }).done(function (data) {
                if (data.sucesso) {
                    Swal.fire({
                        icon: 'success',
                        title: 'CONTA CRIADA COM SUCESSO!',
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
                        title: 'NÃO FOI POSSÍVEL CRIAR SUA CONTA!',
                        width: 640,
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
                    title: 'NÃO FOI POSSÍVEL CRIAR SUA CONTA!',
                    width: 640,
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

$('#senha').on('blur', function () {
    validarSenha();
});

$('#confirmar-senha').on('blur', function () {
    validarConfirmarSenha();
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

    if (nomeUsuario.length > 50) {
        $('#nome').addClass('is-invalid');
        $('#feedback-nome').html('Nome deve ter no máximo 50 caracteres');
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
