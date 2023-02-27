$('#btn-login').on('click', function () {
    var emailValido = validarEmail();
    var senhaValida = validarSenha();
    var aposLogin   = $('#apos-login').val();

    if (!emailValido) {
        $('#email').focus();
        return false;
    }

    if (!senhaValida) {
        $('#senha').focus();
        return false;
    }

    var data = {
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
                url: '/realizar-login',
                type: 'POST',
                dataType: 'json',
                data: data
            }).done(function (data) {
                if (data.sucesso) {
                    location.replace(aposLogin);
                } else {
                    console.log(data.log);
                    Swal.fire({
                        icon: 'error',
                        title: 'NÃO FOI POSSÍVEL REALIZAR O LOGIN!',
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
                    title: 'NÃO FOI POSSÍVEL REALIZAR O LOGIN',
                    width: 630,
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

$('#email').on('blur', function () {
    validarEmail();
});

$('#senha').on('blur', function () {
    validarSenha();
});

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

    if (senhaUsuario.length < 3) {
        $('#senha').addClass('is-invalid');
        $('#feedback-senha').html('Senha inválida');
        $('#icone-feedback-senha').addClass('icofont-exclamation-circle');
        $('#icone-feedback-senha').addClass('text-danger');
        return false;
    }

    if (senhaUsuario.length > 200) {
        $('#senha').addClass('is-invalid');
        $('#feedback-senha').html('Senha inválida');
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