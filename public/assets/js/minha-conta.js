$('#btn-cancelar').on('click', function () {
    location.reload();
});

$('#btn-salvar').on('click', function () {
    var emailValido   = validarEmail();
    var celularValido = validarCelular();

    if (!emailValido) {
        $('#email').focus();
        return false;
    }

    if (!celularValido) {
        $('#celular').focus();
        return false;
    }

    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA SALVAR SUAS ALTERAÇÕES?',
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width: 860,
        confirmButtonText: `Salvar`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                email: $('#email').val(),
                celular: $('#celular').val(),
                genero: $('#genero').val(),
                plataforma: $('#plataforma').val()
            }

            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/alterar-informacoes-conta-usuario',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'ALTERAÇÕES SALVAS COM SUCESSO!',
                                width: 620,
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
                                title: 'NÃO FOI POSSÍVEL SALVAR SUAS ALTERAÇÕES!',
                                width: 750,
                                allowOutsideClick: false,
                                showCancelButton: false,
                                didOpen: () => {
                                    Swal.showValidationMessage(
                                        data.erro
                                    )
                                }
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            })
                        }
                    }).fail(function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'NÃO FOI POSSÍVEL SALVAR SUAS ALTERAÇÕES!',
                            width: 750,
                            allowOutsideClick: false,
                            showCancelButton: false,
                            didOpen: () => {
                                Swal.showValidationMessage(
                                    'Tente novamente'
                                )
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })
                    })
                }
            })
        } else if (result.isDenied) {
            location.reload();
        }
    })
});

$('#email').on('blur', function () {
    validarEmail();
});

$('#celular').on('blur', function () {
    validarCelular();
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

$('#btn-alterar-senha').on('click', function () {
    Swal.mixin({
        title: 'Alterar Senha',
        input: 'password',
        confirmButtonText: 'Próximo',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        showCancelButton: true,
        allowOutsideClick: false,
        progressSteps: ['1', '2', '3']
    }).queue([
        {
            title: 'Informe sua senha atual',
            inputValidator: (value) => {
                if (!value) {
                    return 'Senha deve ser informada'
                }
            }
        },
        {
            title: 'Informe sua nova senha',
            inputValidator: (value) => {
                if (!value) {
                    return 'Senha deve ser informada'
                }
                if (value.length < 8) {
                    return 'Senha deve ter no mínimo 8 caracteres'
                }
                if (value.length > 200) {
                    return 'Senha deve ter no máximo 200 caracteres'
                }
            }
        },
        {
            title: 'Confirme sua nova senha',
            inputValidator: (value) => {
                if (!value) {
                    return 'Senha deve ser confirmada'
                }
            }
        },
    ]).then((result) => {
        if (result.value) {
            if (result.value[1] !== result.value[2]) {
                Swal.fire({
                    icon: 'error',
                    title: 'SENHAS INFORMADAS NÃO SÃO EQUIVALENTES!',
                    width: 780,
                    allowOutsideClick: false,
                    showCancelButton: false
                })
            } else {
                var data = {
                    senha1: result.value[0],
                    senha2: result.value[1]
                }
                
                Swal.fire({
                    title: 'Aguarde...',
                    showCancelButton: false,
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                        $.ajax({
                            url: '/alterar-senha-usuario',
                            type: 'POST',
                            dataType: 'json',
                            data: data
                        }).done(function (data) {
                            if (data.sucesso) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'SENHA ALTERADA COM SUCESSO!',
                                    width: 600,
                                    allowOutsideClick: false,
                                    showCancelButton: false
                                })
                            } else {
                                console.log(data.log);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'NÃO FOI POSSÍVEL ALTERAR SUA SENHA!',
                                    width: 680,
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
                                title: 'NÃO FOI POSSÍVEL ALTERAR SUA SENHA!',
                                width: 680,
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
            }
        }
    })
});

$('#btn-deletar-conta').on('click', function () {
    var podeDeletar = $('#pode-deletar').val();
    
    if (podeDeletar === 'N') {
        Swal.fire({
            icon: 'warning',
            title: 'PROCESSO DE LOCAÇÃO EM ANDAMENTO!',
            width: 700,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else {
        Swal.fire({
            icon: 'question',
            title: 'VOCÊ REALMENTE DESEJA DELETAR SUA CONTA?',
            footer: 'Ao prosseguir, você perderá seu acesso à plataforma!',
            showDenyButton: true,
            reverseButtons: true,
            allowOutsideClick: false,
            width: 830,
            confirmButtonText: `Deletar`,
            confirmButtonColor: '#28a745',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.mixin({
                    title: 'Informe sua senha atual',
                    input: 'password',
                    confirmButtonText: 'Próximo',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true,
                    showCancelButton: true,
                    allowOutsideClick: false,
                    progressSteps: ['1']
                }).queue([
                    {
                        title: 'Informe sua senha atual',
                        inputValidator: (value) => {
                            if (!value) {
                                return 'Senha deve ser informada'
                            }
                        }
                    },
                ]).then((result) => {
                    if (result.value) {
                        var data = {
                            senha: result.value[0]
                        }
                        
                        Swal.fire({
                            title: 'Aguarde...',
                            showCancelButton: false,
                            showLoaderOnConfirm: true,
                            allowOutsideClick: false,
                            didOpen: () => {
                                Swal.showLoading()
                                $.ajax({
                                    url: '/deletar-conta-usuario',
                                    type: 'POST',
                                    dataType: 'json',
                                    data: data
                                }).done(function (data) {
                                    if (data.sucesso) {
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'CONTA DELETADA COM SUCESSO!',
                                            width: 600,
                                            allowOutsideClick: false,
                                            showCancelButton: false
                                        }).then((result) => {
                                            if (result.value) {
                                                location.replace('/logout');
                                            }
                                        })
                                    } else {
                                        console.log(data.log);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'NÃO FOI POSSÍVEL DELETAR SUA CONTA!',
                                            width: 680,
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
                                        title: 'NÃO FOI POSSÍVEL DELETAR SUA CONTA!',
                                        width: 680,
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
                    }
                })
            }
        })
    }
});