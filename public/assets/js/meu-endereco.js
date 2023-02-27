$('#btn-cancelar').on('click', function () {
    location.reload();
});

$('#btn-salvar').on('click', function () {
    validarCep(function(retorno) {
        var cepValido = retorno;
        var estadoValido = validarEstado();
        var cidadeValida = validarCidade();
        var bairroValido = validarBairro();
        var logradouroValido  = validarLogradouro();
        var numeroValido      = validarNumero();
        var complementoValido = validarComplemento();

        if (!cepValido || cepValido === null) {
            $('#cep').focus();
            return false;
        }

        if (!estadoValido) {
            $('#estado').focus();
            return false;
        }

        if (!cidadeValida) {
            $('#cidade').focus();
            return false;
        }

        if (!logradouroValido) {
            $('#logradouro').focus();
            return false;
        }

        if (!numeroValido) {
            $('#numero').focus();
            return false;
        }

        if (!bairroValido) {
            $('#bairro').focus();
            return false;
        }

        if (!complementoValido) {
            $('#complemento').focus();
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
                    cep: $('#cep').val(),
                    estado: $('#estado').val(),
                    cidade: $('#cidade').val(),
                    logradouro: $('#logradouro').val(),
                    numero: $('#numero').val(),
                    bairro: $('#bairro').val(),
                    complemento: $('#complemento').val()
                }

                Swal.fire({
                    title: 'Aguarde...',
                    showCancelButton: false,
                    showLoaderOnConfirm: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                        $.ajax({
                            url: '/atualizar-endereco-usuario',
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
});

$('#cep').on('blur', function () {
    var cep = $('#cep').val();
    var cep = cep.toString();
    var cep = cep.trim();

    if (cep === null || cep === '') {
        $('#estado').val('');
        $('#cidade').val('');
        validarEstado();
        validarCidade();
        validarEstado();
        validarCidade();
        validarBairro();
        validarLogradouro();
        validarNumero();
        validarComplemento();
        $('#cep').addClass('is-invalid');
        $('#feedback-cep').html('CEP deve ser informado');
        $('#icone-feedback-cep').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cep').addClass('text-danger');
        $('#cep').focus();
        return;
    }

    if (cep.length !== 9) {
        $('#estado').val('');
        $('#cidade').val('');
        validarEstado();
        validarCidade();
        validarEstado();
        validarCidade();
        validarBairro();
        validarLogradouro();
        validarNumero();
        validarComplemento();
        $('#cep').addClass('is-invalid');
        $('#feedback-cep').html('CEP inválido');
        $('#icone-feedback-cep').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cep').addClass('text-danger');
        $('#cep').focus();
        return;
    }

    validarCep(function(retorno) {});
});

$('#estado').on('blur', function () {
    validarEstado();
});

$('#cidade').on('blur', function () {
    validarCidade();
});

$('#bairro').on('blur', function () {
    validarBairro();
});

$('#logradouro').on('blur', function () {
    validarLogradouro();
});

$('#numero').on('blur', function () {
    validarNumero();
});

$('#complemento').on('blur', function () {
    validarComplemento();
});

function validarCep(callback) {
    $('#cep').removeClass('is-invalid');
    $('#cep').removeClass('is-valid');
    $('#icone-feedback-cep').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-cep').removeClass('text-danger');
    $('#icone-feedback-cep').removeClass('icofont-verification-check');
    $('#icone-feedback-cep').removeClass('text-success');

    var cep = $('#cep').val();
    var cep = cep.toString();
    var cep = cep.trim();

    if (cep === null || cep === '') {
        $('#estado').val('');
        $('#cidade').val('');
        validarEstado();
        validarCidade();
        $('#cep').addClass('is-invalid');
        $('#feedback-cep').html('CEP deve ser informado');
        $('#icone-feedback-cep').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cep').addClass('text-danger');
        callback(false);
        return;
    }

    if (cep.length !== 9) {
        $('#estado').val('');
        $('#cidade').val('');
        validarEstado();
        validarCidade();
        $('#cep').addClass('is-invalid');
        $('#feedback-cep').html('CEP inválido');
        $('#icone-feedback-cep').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cep').addClass('text-danger');
        callback(false);
        return;
    }

    buscarCep(cep, function(retorno) {
        if (!retorno) {
            $('#cep').addClass('is-invalid');
            $('#feedback-cep').html('CEP inválido');
            $('#icone-feedback-cep').addClass('icofont-exclamation-circle');
            $('#icone-feedback-cep').addClass('text-danger');
            callback(false);
        } else {
            $('#cep').addClass('is-valid');
            $('#feedback-cep').html('');
            $('#icone-feedback-cep').addClass('icofont-verification-check');
            $('#icone-feedback-cep').addClass('text-success');
            callback(true);
        }        
    });
}

function validarEstado() {
    $('#estado').removeClass('is-invalid');
    $('#estado').removeClass('is-valid');
    $('#icone-feedback-estado').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-estado').removeClass('text-danger');
    $('#icone-feedback-estado').removeClass('icofont-verification-check');
    $('#icone-feedback-estado').removeClass('text-success');

    var estado = $('#estado').val();
    var estado = estado.toString();
    var estado = estado.trim();

    if (estado === null || estado === '') {
        $('#estado').addClass('is-invalid');
        $('#feedback-estado').html('Estado deve ser informado');
        $('#icone-feedback-estado').addClass('icofont-exclamation-circle');
        $('#icone-feedback-estado').addClass('text-danger');
        return false;
    }

    if (estado.length !== 2) {
        $('#estado').addClass('is-invalid');
        $('#feedback-estado').html('Estado inválido');
        $('#icone-feedback-estado').addClass('icofont-exclamation-circle');
        $('#icone-feedback-estado').addClass('text-danger');
        return false;
    }

    $('#estado').addClass('is-valid');
    $('#feedback-estado').html('');
    $('#icone-feedback-estado').addClass('icofont-verification-check');
    $('#icone-feedback-estado').addClass('text-success');
    return true;
}

function validarCidade() {
    $('#cidade').removeClass('is-invalid');
    $('#cidade').removeClass('is-valid');
    $('#icone-feedback-cidade').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-cidade').removeClass('text-danger');
    $('#icone-feedback-cidade').removeClass('icofont-verification-check');
    $('#icone-feedback-cidade').removeClass('text-success');

    var cidade = $('#cidade').val();
    var cidade = cidade.toString();
    var cidade = cidade.trim();

    if (cidade === null || cidade === '') {
        $('#cidade').addClass('is-invalid');
        $('#feedback-cidade').html('Cidade deve ser informada');
        $('#icone-feedback-cidade').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cidade').addClass('text-danger');
        return false;
    }

    if (cidade.length < 3) {
        $('#cidade').addClass('is-invalid');
        $('#feedback-cidade').html('Cidade inválida');
        $('#icone-feedback-cidade').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cidade').addClass('text-danger');
        return false;
    }

    if (cidade.length > 200) {
        $('#cidade').addClass('is-invalid');
        $('#feedback-cidade').html('Cidade inválida');
        $('#icone-feedback-cidade').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cidade').addClass('text-danger');
        return false;
    }

    $('#cidade').addClass('is-valid');
    $('#feedback-cidade').html('');
    $('#icone-feedback-cidade').addClass('icofont-verification-check');
    $('#icone-feedback-cidade').addClass('text-success');
    return true;
}

function validarBairro() {
    $('#bairro').removeClass('is-invalid');
    $('#bairro').removeClass('is-valid');
    $('#icone-feedback-bairro').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-bairro').removeClass('text-danger');
    $('#icone-feedback-bairro').removeClass('icofont-verification-check');
    $('#icone-feedback-bairro').removeClass('text-success');

    var bairro = $('#bairro').val();
    var bairro = bairro.toString();
    var bairro = bairro.trim();

    if (bairro === null || bairro === '') {
        $('#bairro').addClass('is-invalid');
        $('#feedback-bairro').html('Bairro deve ser informado');
        $('#icone-feedback-bairro').addClass('icofont-exclamation-circle');
        $('#icone-feedback-bairro').addClass('text-danger');
        return false;
    }

    if (bairro.length < 2) {
        $('#bairro').addClass('is-invalid');
        $('#feedback-bairro').html('Bairro inválido');
        $('#icone-feedback-bairro').addClass('icofont-exclamation-circle');
        $('#icone-feedback-bairro').addClass('text-danger');
        return false;
    }

    if (bairro.length > 200) {
        $('#bairro').addClass('is-invalid');
        $('#feedback-bairro').html('Bairro inválido');
        $('#icone-feedback-bairro').addClass('icofont-exclamation-circle');
        $('#icone-feedback-bairro').addClass('text-danger');
        return false;
    }

    $('#bairro').addClass('is-valid');
    $('#feedback-bairro').html('');
    $('#icone-feedback-bairro').addClass('icofont-verification-check');
    $('#icone-feedback-bairro').addClass('text-success');
    return true;
}

function validarLogradouro() {
    $('#logradouro').removeClass('is-invalid');
    $('#logradouro').removeClass('is-valid');
    $('#icone-feedback-logradouro').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-logradouro').removeClass('text-danger');
    $('#icone-feedback-logradouro').removeClass('icofont-verification-check');
    $('#icone-feedback-logradouro').removeClass('text-success');

    var logradouro = $('#logradouro').val();
    var logradouro = logradouro.toString();
    var logradouro = logradouro.trim();

    if (logradouro === null || logradouro === '') {
        $('#logradouro').addClass('is-invalid');
        $('#feedback-logradouro').html('Logradouro deve ser informado');
        $('#icone-feedback-logradouro').addClass('icofont-exclamation-circle');
        $('#icone-feedback-logradouro').addClass('text-danger');
        return false;
    }

    if (logradouro.length < 3) {
        $('#logradouro').addClass('is-invalid');
        $('#feedback-logradouro').html('Logradouro inválido');
        $('#icone-feedback-logradouro').addClass('icofont-exclamation-circle');
        $('#icone-feedback-logradouro').addClass('text-danger');
        return false;
    }

    if (logradouro.length > 200) {
        $('#logradouro').addClass('is-invalid');
        $('#feedback-logradouro').html('Logradouro inválido');
        $('#icone-feedback-logradouro').addClass('icofont-exclamation-circle');
        $('#icone-feedback-logradouro').addClass('text-danger');
        return false;
    }

    $('#logradouro').addClass('is-valid');
    $('#feedback-logradouro').html('');
    $('#icone-feedback-logradouro').addClass('icofont-verification-check');
    $('#icone-feedback-logradouro').addClass('text-success');
    return true;
}

function validarNumero() {
    $('#numero').removeClass('is-invalid');
    $('#numero').removeClass('is-valid');
    $('#icone-feedback-numero').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-numero').removeClass('text-danger');
    $('#icone-feedback-numero').removeClass('icofont-verification-check');
    $('#icone-feedback-numero').removeClass('text-success');

    var numero = $('#numero').val();
    var numero = numero.toString();
    var numero = numero.trim();

    if (numero === null || numero === '') {
        $('#numero').addClass('is-invalid');
        $('#feedback-numero').html('Número deve ser informado');
        $('#icone-feedback-numero').addClass('icofont-exclamation-circle');
        $('#icone-feedback-numero').addClass('text-danger');
        return false;
    }

    $('#numero').addClass('is-valid');
    $('#feedback-numero').html('');
    $('#icone-feedback-numero').addClass('icofont-verification-check');
    $('#icone-feedback-numero').addClass('text-success');
    return true;
}

function validarComplemento() {
    $('#complemento').removeClass('is-invalid');
    $('#complemento').removeClass('is-valid');
    $('#icone-feedback-complemento').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-complemento').removeClass('text-danger');
    $('#icone-feedback-complemento').removeClass('icofont-verification-check');
    $('#icone-feedback-complemento').removeClass('text-success');

    var complemento = $('#complemento').val();
    var complemento = complemento.toString();
    var complemento = complemento.trim();

    if (complemento === null || complemento === '') {
        $('#complemento').addClass('is-invalid');
        $('#feedback-complemento').html('Complemento deve ser informado');
        $('#icone-feedback-complemento').addClass('icofont-exclamation-circle');
        $('#icone-feedback-complemento').addClass('text-danger');
        return false;
    }

    if (complemento.length < 5) {
        $('#complemento').addClass('is-invalid');
        $('#feedback-complemento').html('Complemento deve ter no mínimo 5 caracteres');
        $('#icone-feedback-complemento').addClass('icofont-exclamation-circle');
        $('#icone-feedback-complemento').addClass('text-danger');
        return false;
    }

    if (complemento.length > 400) {
        $('#complemento').addClass('is-invalid');
        $('#feedback-complemento').html('Complemento deve ter no máximo 400 caracteres');
        $('#icone-feedback-complemento').addClass('icofont-exclamation-circle');
        $('#icone-feedback-complemento').addClass('text-danger');
        return false;
    }

    $('#complemento').addClass('is-valid');
    $('#feedback-complemento').html('');
    $('#icone-feedback-complemento').addClass('icofont-verification-check');
    $('#icone-feedback-complemento').addClass('text-success');
    return true;
}

function buscarCep(cep, callback) {
    var cep = cep.replace(/\D/g, '');

    $.getJSON('https://viacep.com.br/ws/'+ cep +'/json/?callback=?', function(dados) {
        if (!('erro' in dados)) {
            $('#estado').val(dados.uf);
            $('#cidade').val(dados.localidade);
            validarEstado();
            validarCidade();

            if (dados.logradouro !== '') {
                $('#logradouro').val(dados.logradouro);
                validarLogradouro();
            }
            
            if (dados.bairro !== '') {
                $('#bairro').val(dados.bairro);
                validarBairro();
            }
            callback(true);
        } else {
            $('#estado').val('');
            $('#cidade').val('');
            validarEstado();
            validarCidade();
            callback(false);
        }
    });
}