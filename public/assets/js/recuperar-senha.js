$('#btn-recuperar-senha').on('click', function () {
    var emailValido = validarEmail();

    if (!emailValido) {
        $('#email').focus();
        return false;
    }

    var data = {
        email: $('#email').val()
    }

    Swal.fire({
        title: 'Aguarde...',
        showCancelButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
            $.ajax({
                url: '/solicitar-recuperacao-senha',
                type: 'POST',
                dataType: 'json',
                data: data
            }).done(function (data) {
                if (data.sucesso) {
                    Swal.fire({
                        icon: 'success',
                        title: 'RECUPERAÇÃO SOLICITADA COM SUCESSO!',
                        text: 'Caso o e-mail informado exista em nossa base dados, será enviado para ele uma mensagem contendo instruções para redefinir sua senha!',
                        footer: 'Lembre-se de verificar sua caixa de SPAM',
                        width: 710,
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
                        title: 'NÃO FOI POSSÍVEL SOLICITAR A RECUPERAÇÃO!',
                        width: 770,
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
                    title: 'NÃO FOI POSSÍVEL SOLICITAR A RECUPERAÇÃO!',
                    width: 770,
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