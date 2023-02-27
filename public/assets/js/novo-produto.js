$('#btn-cancelar').on('click', function () {
    location.reload();
});

$('#btn-salvar').on('click', function () {
    var possuiEndereco = $('#possui-endereco').val();

    if (possuiEndereco === 'N') {
        Swal.fire({
            icon: 'warning',
            title: 'ATUALIZAÇÃO DE ENDEREÇO NECESSÁRIA!',
            footer: '<a href="/meu-endereco">Atualizar Endereço</a>',
            width: 700,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else {
        var nomeValido      = validarNome();
        var descricaoValida = validarDescricao();
        var valorValido     = validarValor();
        var imagemValida    = validarImagemSemDimensoes();

        if (!nomeValido) {
            $('#nome').focus();
            return false;
        }

        if (!descricaoValida) {
            $('#descricao').focus();
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
            var nomeValido      = validarNome();
            var descricaoValida = validarDescricao();
            var valorValido     = validarValor();
            var imagemValida    = retorno;

            if (!nomeValido) {
                $('#nome').focus();
                return false;
            }

            if (!descricaoValida) {
                $('#descricao').focus();
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

            formData.append('imagem',          $('#imagem').prop('files')[0]);
            formData.append('nome',            $('#nome').val());
            formData.append('descricao',       $('#descricao').val());
            formData.append('plataforma',      $('#plataforma').val());
            formData.append('genero',          $('#genero').val());
            formData.append('desenvolvedora',  $('#desenvolvedora').val());
            formData.append('valor',           $('#valor').val());
            formData.append('tipo-negociacao', $('#tipo-negociacao').val());

            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/cadastrar-produto-usuario',
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
                                footer: 'Aguarde sua aprovação!',
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
                                title: 'NÃO FOI POSSÍVEL CADASTRAR SEU PRODUTO!',
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
                            title: 'NÃO FOI POSSÍVEL CADASTRAR SEU PRODUTO!',
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
    }
});

$('#nome').on('blur', function () {
    validarNome();
});

$('#descricao').on('blur', function () {
    validarDescricao();
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

function validarDescricao() {
    $('#descricao').removeClass('is-invalid');
    $('#descricao').removeClass('is-valid');
    $('#icone-feedback-descricao').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-descricao').removeClass('text-danger');
    $('#icone-feedback-descricao').removeClass('icofont-verification-check');
    $('#icone-feedback-descricao').removeClass('text-success');

    var descricao = $('#descricao').val();
    var descricao = descricao.toString();
    var descricao = descricao.trim();

    if (descricao === null || descricao === '') {
        $('#descricao').addClass('is-invalid');
        $('#feedback-descricao').html('Descrição deve ser informada');
        $('#icone-feedback-descricao').addClass('icofont-exclamation-circle');
        $('#icone-feedback-descricao').addClass('text-danger');
        return false;
    }

    if (descricao.length < 5) {
        $('#descricao').addClass('is-invalid');
        $('#feedback-descricao').html('Descrição deve ter no mínimo 5 caracteres');
        $('#icone-feedback-descricao').addClass('icofont-exclamation-circle');
        $('#icone-feedback-descricao').addClass('text-danger');
        return false;
    }

    if (descricao.length > 200) {
        $('#descricao').addClass('is-invalid');
        $('#feedback-descricao').html('Descrição deve ter no máximo 200 caracteres');
        $('#icone-feedback-descricao').addClass('icofont-exclamation-circle');
        $('#icone-feedback-descricao').addClass('text-danger');
        return false;
    }

    $('#descricao').addClass('is-valid');
    $('#feedback-descricao').html('');
    $('#icone-feedback-descricao').addClass('icofont-verification-check');
    $('#icone-feedback-descricao').addClass('text-success');
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

$('#btn-sugestao').on('click', function () {
    const inputOptions = new Promise((resolve) => {
        resolve({
            'P': 'Plataforma',
            'G': 'Gênero',
            'D': 'Desenvolvedora'
        })
    })
      
    Swal.mixin({
        title: 'Sugerir Cadastro',
        input: 'radio',
        confirmButtonText: 'Próximo',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        showCancelButton: true,
        allowOutsideClick: false,
        progressSteps: ['1', '2']
    }).queue([
        {
            title: 'Selecione o tipo de sugestão',
            inputOptions: inputOptions,
            inputValidator: (value) => {
                if (!value) {
                    return 'Tipo deve ser selecionado'
                }
            }
        },
        {
            title: 'Informe sua sugestão',
            input: 'text',
            inputValidator: (value) => {
                if (!value) {
                    return 'Sugestão deve ser informada'
                }
                if (value.length < 3) {
                    return 'Sugestão deve ter no mínimo 3 caracteres'
                }
                if (value.length > 200) {
                    return 'Sugestão deve ter no máximo 200 caracteres'
                }
            }
        },
    ]).then((result) => {
        if (result.value) {
            var data = {
                'tipo-sugestao': result.value[0],
                'descricao-sugestao': result.value[1]
            }

            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/cadastrar-sugestao-usuario',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'SUGESTÃO CADASTRADA COM SUCESSO!',
                                footer: 'Em breve você receberá uma resposta em seu e-mail!',
                                width: 680,
                                allowOutsideClick: false,
                                showCancelButton: false
                            })
                        } else {
                            console.log(data.log);
                            Swal.fire({
                                icon: 'error',
                                title: 'NÃO FOI POSSÍVEL CADASTRAR SUA SUGESTÃO!',
                                width: 780,
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
                            title: 'NÃO FOI POSSÍVEL CADASTRAR SUA SUGESTÃO!',
                            width: 780,
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
});

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