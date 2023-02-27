$('#btn-cancelar').on('click', function () {
    location.reload();
});

$('#btn-salvar').on('click', function () {
    var podeAnalisar = $('#pode-analisar').val();
    var jaAvaliou    = $('#ja-avaliou').val();

    if (!podeAnalisar) {
        Swal.fire({
            icon: 'warning',
            title: 'VOCÊ NÃO POSSUI PERMISSÃO PARA AVALIAR ESTE PRODUTO!',
            width: 1000,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else if (!jaAvaliou) {
        Swal.fire({
            icon: 'warning',
            title: 'AVALIAÇÃO DO PRODUTO JÁ CADASTRADA!',
            width: 750,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else {
        var tituloValido  = validarTitulo();
        var analiseValida = validarAnalise();

        if (!tituloValido) {
            $('#titulo').focus();
            return false;
        }

        if (!analiseValida) {
            $('#analise').focus();
            return false;
        }

        var classificacao = $('#classificacao').val();
        
        if (classificacao === null || classificacao === '') {
            Swal.fire({
                icon: 'warning',
                title: 'POR FAVOR, INFORME A CLASSIFICAÇÃO DO PRODUTO!',
                width: 870,
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    return false;
                }
            })
        } else {
            var produto = $(this).data('id');

            var data = {
                titulo: $('#titulo').val(),
                analise: $('#analise').val(),
                classificacao: $('#classificacao').val(),
                produto: produto,
            }

            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/cadastrar-analise-usuario',
                        type: 'POST',
                        dataType: 'json',
                        data: data,
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'AVALIAÇÃO CADASTRADA COM SUCESSO!',
                                width: 700,
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
                                title: 'NÃO FOI POSSÍVEL CADASTRAR SUA AVALIAÇÃO!',
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
                            title: 'NÃO FOI POSSÍVEL CADASTRAR SUA AVALIAÇÃO!',
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
        }
    }
});

$('#titulo').on('blur', function () {
    validarTitulo();
});

$('#analise').on('blur', function () {
    validarAnalise();
});

function validarTitulo() {
    $('#titulo').removeClass('is-invalid');
    $('#titulo').removeClass('is-valid');
    $('#icone-feedback-titulo').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-titulo').removeClass('text-danger');
    $('#icone-feedback-titulo').removeClass('icofont-verification-check');
    $('#icone-feedback-titulo').removeClass('text-success');

    var titulo = $('#titulo').val();
    var titulo = titulo.toString();
    var titulo = titulo.trim();

    if (titulo === null || titulo === '') {
        $('#titulo').addClass('is-invalid');
        $('#feedback-titulo').html('Título deve ser informado');
        $('#icone-feedback-titulo').addClass('icofont-exclamation-circle');
        $('#icone-feedback-titulo').addClass('text-danger');
        return false;
    }

    if (titulo.length < 3) {
        $('#titulo').addClass('is-invalid');
        $('#feedback-titulo').html('Título deve ter no mínimo 3 caracteres');
        $('#icone-feedback-titulo').addClass('icofont-exclamation-circle');
        $('#icone-feedback-titulo').addClass('text-danger');
        return false;
    }

    if (titulo.length > 200) {
        $('#titulo').addClass('is-invalid');
        $('#feedback-titulo').html('Título deve ter no máximo 200 caracteres');
        $('#icone-feedback-titulo').addClass('icofont-exclamation-circle');
        $('#icone-feedback-titulo').addClass('text-danger');
        return false;
    }

    $('#titulo').addClass('is-valid');
    $('#feedback-titulo').html('');
    $('#icone-feedback-titulo').addClass('icofont-verification-check');
    $('#icone-feedback-titulo').addClass('text-success');
    return true;
}

function validarAnalise() {
    $('#analise').removeClass('is-invalid');
    $('#analise').removeClass('is-valid');
    $('#icone-feedback-analise').removeClass('icofont-exclamation-circle');
    $('#icone-feedback-analise').removeClass('text-danger');
    $('#icone-feedback-analise').removeClass('icofont-verification-check');
    $('#icone-feedback-analise').removeClass('text-success');

    var analise = $('#analise').val();
    var analise = analise.toString();
    var analise = analise.trim();

    if (analise === null || analise === '') {
        $('#analise').addClass('is-invalid');
        $('#feedback-analise').html('Análise deve ser informada');
        $('#icone-feedback-analise').addClass('icofont-exclamation-circle');
        $('#icone-feedback-analise').addClass('text-danger');
        return false;
    }

    if (analise.length < 5) {
        $('#analise').addClass('is-invalid');
        $('#feedback-analise').html('Análise deve ter no mínimo 5 caracteres');
        $('#icone-feedback-analise').addClass('icofont-exclamation-circle');
        $('#icone-feedback-analise').addClass('text-danger');
        return false;
    }

    if (analise.length > 400) {
        $('#analise').addClass('is-invalid');
        $('#feedback-analise').html('Análise deve ter no máximo 400 caracteres');
        $('#icone-feedback-analise').addClass('icofont-exclamation-circle');
        $('#icone-feedback-analise').addClass('text-danger');
        return false;
    }

    $('#analise').addClass('is-valid');
    $('#feedback-analise').html('');
    $('#icone-feedback-analise').addClass('icofont-verification-check');
    $('#icone-feedback-analise').addClass('text-success');
    return true;
}

$('.btn-desejo').on('click', function () {
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
        var produto = $(this).data('id');

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        var data = {
            produto: produto
        };

        $.ajax({
            url: '/adicionar-lista-de-desejos-usuario',
            type: 'POST',
            dataType: 'json',
            data: data
        }).done(function (data) {
            if (data.sucesso) {
                $('#icone-desejo-' + produto).addClass('text-danger');
                $('#btn-desejo-' + produto).prop('disabled', true);
                $('#btn-desejo-' + produto).css('cursor', 'not-allowed');

                Toast.fire({
                    icon: 'success',
                    title: 'PRODUTO ADICIONADO EM SUA LISTA DE DESEJOS!'
                })
            } else {
                console.log(data.log);
                Toast.fire({
                    icon: 'error',
                    title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SUA LISTA DE DESEJOS!'
                })
            }
        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SUA LISTA DE DESEJOS!'
            })
        })
    }
});

$('.btn-remover').on('click', function () {
    var analise = $(this).data('id');

    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA EXCLUIR ESTA AVALIAÇÃO?',
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width: 845,
        confirmButtonText: `Excluir`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                analise: analise
            }
            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/deletar-analise-usuario',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'AVALIAÇÃO EXCLUÍDA COM SUCESSO!',
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
                                title: 'NÃO FOI POSSÍVEL EXCLUIR ESTA AVALIAÇÃO!',
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
                            title: 'NÃO FOI POSSÍVEL EXCLUIR ESTA AVALIAÇÃO!',
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

$('.btn-interesse').on('click', function () {
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
        var produto    = $(this).data('id');
        var usuario    = $(this).data('usuario');
        var negociacao = $(this).data('tipo-negociacao');

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        var data = {
            'produto': produto,
            'usuario-secundario': usuario,
            'tipo-negociacao': negociacao
        }

        $.ajax({
            url: '/cadastrar-negociacao-usuario',
            type: 'POST',
            dataType: 'json',
            data: data
        }).done(function (data) {
            if (data.sucesso) {
                $('#btn-interesse-' + produto).prop('disabled', true);
                $('#btn-interesse-' + produto).css('cursor', 'not-allowed');
                Toast.fire({
                    icon: 'success',
                    title: 'PRODUTO ADICIONADO EM SUA LISTA DE NEGOCIAÇÕES!'
                })
            } else {
                console.log(data.log);
                Toast.fire({
                    icon: 'error',
                    title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SUA LISTA DE NEGOCIAÇÕES!'
                })
            }
        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SUA LISTA DE NEGOCIAÇÕES!'
            })
        })
    }
});

$('.btn-remover-produto').on('click', function () {
    var produto     = $(this).data('id');
    var nomeProduto = $(this).data('nome');

    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA EXCLUIR ESTE PRODUTO DA PLATAFORMA?',
        text: nomeProduto,
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width: 1065,
        confirmButtonText: `Excluir`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                produto: produto
            }
            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/remover-produto-usuario',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'PRODUTO EXCLUÍDO COM SUCESSO!',
                                width: 680,
                                allowOutsideClick: false,
                                showCancelButton: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.replace('/meus-produtos');
                                }
                            })
                        } else {
                            console.log(data.log);
                            Swal.fire({
                                icon: 'error',
                                title: 'NÃO FOI POSSÍVEL EXCLUIR ESTE PRODUTO!',
                                width: 780,
                                allowOutsideClick: false,
                                showCancelButton: false,
                                didOpen: () => {
                                    Swal.showValidationMessage(
                                        nomeProduto
                                    )
                                }
                            })
                        }
                    }).fail(function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'NÃO FOI POSSÍVEL EXCLUIR ESTE PRODUTO!',
                            width: 780,
                            allowOutsideClick: false,
                            showCancelButton: false,
                            didOpen: () => {
                                Swal.showValidationMessage(
                                    nomeProduto
                                )
                            }
                        })
                    })
                }
            })
        }
    })
});

$('.btn-aviso').on('click', function () {
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
        var produto = $(this).data('id');

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });

        var data = {
            produto: produto
        };

        $.ajax({
            url: '/cadastrar-aviso-usuario',
            type: 'POST',
            dataType: 'json',
            data: data
        }).done(function (data) {
            if (data.sucesso) {
                $('#btn-aviso-' + produto).prop('disabled', true);
                $('#btn-aviso-' + produto).css('cursor', 'not-allowed');

                Toast.fire({
                    icon: 'success',
                    title: 'VOCÊ SERÁ NOTIFICADO VIA E-MAIL QUANDO O PRODUTO RETORNAR PARA A PLATAFORMA!'
                })
            } else {
                console.log(data.log);
                Toast.fire({
                    icon: 'error',
                    title: 'NÃO FOI POSSÍVEL GERAR A NOTIFICAÇÃO!'
                })
            }
        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'NÃO FOI POSSÍVEL GERAR A NOTIFICAÇÃO!'
            })
        })
    }
});