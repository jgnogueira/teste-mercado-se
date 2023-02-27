$('#btn-criar-conta').on('click', function () {
    var nomeValido           = validarNome();
    var cpfValido            = validarCpf();
    var emailValido          = validarEmail();
    var celularValido        = validarCelular();
    var senhaValida          = validarSenha();
    var confirmarSenhaValida = validarConfirmarSenha();
    //var termosDeUsoValido    = validarTermosDeUso();

    if (!nomeValido) {
        $('#nome').focus();
        return false;
    }

    if (!cpfValido) {
        $('#cpf').focus();
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

    if (!senhaValida) {
        $('#senha').focus();
        return false;
    }

    if (!confirmarSenhaValida) {
        $('#confirmar-senha').focus();
        return false;
    }

    /*if (!termosDeUsoValido) {
        $('#termos-de-uso').focus();
        return false;
    }*/

    var data = {
        nome: $('#nome').val(),
        email: $('#email').val(),
        senha: $('#senha').val(),
        celular: $('#celular').val(),
        cpf: $('#cpf').val(),
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
                url: '/criar-conta',
                type: 'POST',
                dataType: 'json',
                data: data
            }).done(function (data) {
                if (data.sucesso) {
                    Swal.fire({
                        icon: 'success',
                        title: 'CONTA CRIADA COM SUCESSO!',
                        footer: 'Enviamos para você um e-mail contendo instruções para efetivar seu registro!',
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

$('#cpf').on('blur', function () {
    validarCpf();
});

$('#email').on('blur', function () {
    validarEmail();
});

$('#celular').on('blur', function () {
    validarCelular();
});

$('#senha').on('blur', function () {
    validarSenha();
});

$('#confirmar-senha').on('blur', function () {
    validarConfirmarSenha();
});

$('#termos-de-uso').change(function () {
    validarTermosDeUso();
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

function validarCpf() {
    $('#cpf').removeClass('is-invalid');
    $('#cpf').removeClass('is-valid');
    $('#icone-feedback-cpf').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-cpf').removeClass('text-danger');
    $('#icone-feedback-cpf').removeClass('icofont-verification-check');
    $('#icone-feedback-cpf').removeClass('text-success');

    var cpfUsuario = $('#cpf').val();
    var cpfUsuario = cpfUsuario.toString();
    var cpfUsuario = cpfUsuario.trim();

    if (cpfUsuario === null || cpfUsuario === '') {
        $('#cpf').addClass('is-invalid');
        $('#feedback-cpf').html('CPF deve ser informado');
        $('#icone-feedback-cpf').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cpf').addClass('text-danger');
        return false;
    }

    var cpfUsuario = cpfUsuario.replace(/\./g, '');
    var cpfUsuario = cpfUsuario.replace('-', '');
    var cpfUsuario = cpfUsuario.split('');

    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cpfUsuario.length > i; i++) {
        if (cpfUsuario[i - 1] != cpfUsuario[i]) {
            aux = true;
        }
    }

    if (aux == false) {
        $('#cpf').addClass('is-invalid');
        $('#feedback-cpf').html('CPF inválido');
        $('#icone-feedback-cpf').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cpf').addClass('text-danger');
        return false;
    }

    for (var i = 0, p = 10; (cpfUsuario.length - 2) > i; i++, p--) {
        v1 += cpfUsuario[i] * p;
    }

    v1 = ((v1 * 10) % 11);

    if (v1 == 10) {
        v1 = 0;
    }

    if (v1 != cpfUsuario[9]) {
        $('#cpf').addClass('is-invalid');
        $('#feedback-cpf').html('CPF inválido');
        $('#icone-feedback-cpf').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cpf').addClass('text-danger');
        return false;
    }

    for (var i = 0, p = 11; (cpfUsuario.length - 1) > i; i++, p--) {
        v2 += cpfUsuario[i] * p;
    }

    v2 = ((v2 * 10) % 11);

    if (v2 == 10) {
        v2 = 0;
    }

    if (v2 != cpfUsuario[10]) {
        $('#cpf').addClass('is-invalid');
        $('#feedback-cpf').html('CPF inválido');
        $('#icone-feedback-cpf').addClass('icofont-exclamation-circle');
        $('#icone-feedback-cpf').addClass('text-danger');
        return false;
    }

    $('#cpf').addClass('is-valid');
    $('#icone-feedback-cpf').addClass('icofont-verification-check');
    $('#icone-feedback-cpf').addClass('text-success');
    $('#feedback-cpf').html('');
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

function validarTermosDeUso() {
    if (!$('#termos-de-uso').is(':checked')) {
        $('#termos-de-uso').removeClass('is-valid');
        $('#feedback-termos-de-uso').html('Você deve concordar com os termos de uso');
        return false;
    }

    $('#termos-de-uso').addClass('is-valid');
    $('#feedback-termos-de-uso').html('');
    return true;
}
