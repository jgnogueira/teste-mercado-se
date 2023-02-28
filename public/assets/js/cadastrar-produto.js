$('#btn-cancelar').on('click', function () {
    location.reload();
});

$('#btn-salvar').on('click', function () {
    var nomeValido      = validarNome();
    var valorValido     = validarValor();
    var imagemValida    = validarImagemSemDimensoes();

    if (!nomeValido) {
        $('#nome').focus();
        return false;
    }

    if (!valorValido) {
        $('#valor').focus();
        return false;
    }

    if (!imagemValida) {
        $('#imagem').focus();
        return false;
    }

    validarImagem(function(retorno) {
        var nomeValido    = validarNome();
        var valorValido   = validarValor();
        var imagemValida  = retorno;

        if (!nomeValido) {
            $('#nome').focus();
            return false;
        }

        if (!valorValido) {
            $('#valor').focus();
            return false;
        }

        if (!imagemValida) {
            $('#imagem').focus();
            return false;
        }

        var formData = new FormData();

        formData.append('imagem', $('#imagem').prop('files')[0]);
        formData.append('nome',   $('#nome').val());
        formData.append('valor',  $('#valor').val());
        formData.append('tipo',   $('#tipo').val());

        Swal.fire({
            title: 'Aguarde...',
            showCancelButton: false,
            showLoaderOnConfirm: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                $.ajax({
                    url: '/salvar-produto',
                    type: 'POST',
                    dataType: 'json',
                    data: formData,
                    contentType: false,
                    processData: false,
                }).done(function (data) {
                    if (data.sucesso) {
                        Swal.fire({
                            icon: 'success',
                            title: 'PRODUTO CADASTRADO COM SUCESSO!',
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
                            title: 'NÃO FOI POSSÍVEL CADASTRAR O PRODUTO!',
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
                        title: 'NÃO FOI POSSÍVEL CADASTRAR O PRODUTO!',
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
    })
});

$('#nome').on('blur', function () {
    validarNome();
});

$('#valor').on('blur', function () {
    validarValor();
});

$('#imagem').change(function () {
    validarImagem(function(retorno) {});
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

    if (nome === null || nome === '') {
        $('#nome').addClass('is-invalid');
        $('#feedback-nome').html('Nome deve ser informado');
        $('#icone-feedback-nome').addClass('icofont-exclamation-circle');
        $('#icone-feedback-nome').addClass('text-danger');
        return false;
    }

    if (nome.length < 3) {
        $('#nome').addClass('is-invalid');
        $('#feedback-nome').html('Nome deve ter no mínimo 3 caracteres');
        $('#icone-feedback-nome').addClass('icofont-exclamation-circle');
        $('#icone-feedback-nome').addClass('text-danger');
        return false;
    }

    if (nome.length > 50) {
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

function validarValor() {
    $('#valor').removeClass('is-invalid');
    $('#valor').removeClass('is-valid');
    $('#icone-feedback-valor').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-valor').removeClass('text-danger');
    $('#icone-feedback-valor').removeClass('icofont-verification-check');
    $('#icone-feedback-valor').removeClass('text-success');

    var valor = $('#valor').val();
    var valor = valor.toString();
    var valor = valor.trim();

    if (valor === null || valor === '') {
        $('#valor').addClass('is-invalid');
        $('#feedback-valor').html('Valor deve ser informado');
        $('#icone-feedback-valor').addClass('icofont-exclamation-circle');
        $('#icone-feedback-valor').addClass('text-danger');
        return false;
    }

    if (valor === 'R$ 0,00') {
        $('#valor').addClass('is-invalid');
        $('#feedback-valor').html('Valor deve ser informado');
        $('#icone-feedback-valor').addClass('icofont-exclamation-circle');
        $('#icone-feedback-valor').addClass('text-danger');
        return false;
    }

    $('#valor').addClass('is-valid');
    $('#feedback-valor').html('');
    $('#icone-feedback-valor').addClass('icofont-verification-check');
    $('#icone-feedback-valor').addClass('text-success');
    return true;
}

function validarImagem(callback) {
    $('#imagem').removeClass('is-invalid');
    $('#imagem').removeClass('is-valid');
    $('#icone-feedback-imagem').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-imagem').removeClass('text-danger');
    $('#icone-feedback-imagem').removeClass('icofont-verification-check');
    $('#icone-feedback-imagem').removeClass('text-success');

    var imagem = $('#imagem').val();

    if (imagem === null || imagem === '') {
        $('#imagem').addClass('is-invalid');
        $('#feedback-imagem').html('Imagem deve ser selecionada');
        $('#icone-feedback-imagem').addClass('icofont-exclamation-circle');
        $('#icone-feedback-imagem').addClass('text-danger');
        callback(false);
    }

    var extensaoImagem = imagem.split('.').pop().toUpperCase();

    if (extensaoImagem !== 'JPG' && extensaoImagem !== 'JPEG' && extensaoImagem !== 'PNG') {
        $('#imagem').addClass('is-invalid');
        $('#feedback-imagem').html('Imagem com formato inválido. Formatos aceitos: JPG e PNG');
        $('#icone-feedback-imagem').addClass('icofont-exclamation-circle');
        $('#icone-feedback-imagem').addClass('text-danger');
        callback(false);
    }

    var fr = new FileReader;
    
    fr.onload = function() {
        var img = new Image;
        
        img.onload = function() {
            if (img.width !== 1000 || img.height !== 1000) {
                $('#imagem').addClass('is-invalid');
                $('#feedback-imagem').html('Imagem com dimensões inválidas. Dimensões aceitas: 1000 x 1000 pixels');
                $('#icone-feedback-imagem').addClass('icofont-exclamation-circle');
                $('#icone-feedback-imagem').addClass('text-danger');
                callback(false);
            } else {
                $('#imagem').addClass('is-valid');
                $('#feedback-imagem').html('');
                $('#icone-feedback-imagem').addClass('icofont-verification-check');
                $('#icone-feedback-imagem').addClass('text-success');
                callback(true);
            }
        };
        
        img.src = fr.result;
    };
    
    fr.readAsDataURL(document.getElementById('imagem').files[0]);
}

function validarImagemSemDimensoes() {
    if ($('#imagem').hasClass('is-invalid'))  {
        return false;
    }

    $('#imagem').removeClass('is-invalid');
    $('#imagem').removeClass('is-valid');
    $('#icone-feedback-imagem').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-imagem').removeClass('text-danger');
    $('#icone-feedback-imagem').removeClass('icofont-verification-check');
    $('#icone-feedback-imagem').removeClass('text-success');

    var imagem = $('#imagem').val();

    if (imagem === null || imagem === '') {
        $('#imagem').addClass('is-invalid');
        $('#feedback-imagem').html('Imagem deve ser selecionada');
        $('#icone-feedback-imagem').addClass('icofont-exclamation-circle');
        $('#icone-feedback-imagem').addClass('text-danger');
        return false;
    }

    var extensaoImagem = imagem.split('.').pop().toUpperCase();

    if (extensaoImagem !== 'JPG' && extensaoImagem !== 'JPEG' && extensaoImagem !== 'PNG') {
        $('#imagem').addClass('is-invalid');
        $('#feedback-imagem').html('Imagem com formato inválido. Formatos aceitos: JPG e PNG');
        $('#icone-feedback-imagem').addClass('icofont-exclamation-circle');
        $('#icone-feedback-imagem').addClass('text-danger');
        return false;
    }

    return true;
}