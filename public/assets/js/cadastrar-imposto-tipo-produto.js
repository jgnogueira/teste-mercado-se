$('#btn-cancelar').on('click', function () {
    location.reload();
});

$('#btn-salvar').on('click', function () {
    var nomeValido = validarNome();

    if (!nomeValido) {
        $('#nome').focus();
        return false;
    }

    var formData = new FormData();

    formData.append('percentual', $('#nome').val().toString().replace('%', ''));
    formData.append('tipo', $('#tipo').val());

    Swal.fire({
        title: 'Aguarde...',
        showCancelButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
            $.ajax({
                url: '/salvar-imposto-tipo-produto',
                type: 'POST',
                dataType: 'json',
                data: formData,
                contentType: false,
                processData: false,
            }).done(function (data) {
                if (data.sucesso) {
                    Swal.fire({
                        icon: 'success',
                        title: 'IMPOSTO PARA TIPO DE PRODUTO CADASTRADO COM SUCESSO!',
                        width: 680,
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
                        title: 'NÃO FOI POSSÍVEL CADASTRAR O IMPOSTO PARA TIPO DE PRODUTO!',
                        width: 780,
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
                    title: 'NÃO FOI POSSÍVEL CADASTRAR O IMPOSTO PARA TIPO DE PRODUTO!',
                    width: 780,
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
});

$('#nome').on('blur', function () {
    validarNome();
});

function validarNome() {
    $('#nome').removeClass('is-invalid');
    $('#nome').removeClass('is-valid');
    $('#icone-feedback-nome').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-nome').removeClass('text-danger');
    $('#icone-feedback-nome').removeClass('icofont-verification-check');
    $('#icone-feedback-nome').removeClass('text-success');

    var nome = $('#nome').val();
    var nome = nome.toString();
    var nome = nome.trim();

    if (nome === null || nome === '' || nome === '%') {
        $('#nome').addClass('is-invalid');
        $('#feedback-nome').html('Percentual deve ser informado');
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