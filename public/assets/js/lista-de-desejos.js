$('.btn-remover').on('click', function () {
    var desejo      = $(this).data('id');
    var produto     = $(this).data('id-produto');
    var nomeProduto = $(this).data('nome');

    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA EXCLUIR ESTE PRODUTO DA SUA LISTA DE DESEJOS?',
        footer: nomeProduto,
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width: 1190,
        confirmButtonText: `Excluir`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                desejo: desejo,
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
                        url: '/remover-produto-lista-de-desejos-usuario',
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
                                    location.reload();
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

$('.btn-interesse').on('click', function () {
    var produto    = $(this).data('id');
    var usuario    = $(this).data('usuario');
    var negociacao = $(this).data('tipo-negociacao');
    var quantidadeNegociacoes = $('#quantidade-negociacoes-abertas').val();
    var quantidadeNegociacoes = parseInt(quantidadeNegociacoes);
    var textoQuantidadeNegociacoes = '';

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
            quantidadeNegociacoes      = quantidadeNegociacoes + 1;
            textoQuantidadeNegociacoes = quantidadeNegociacoes > 1 ? quantidadeNegociacoes + ' Produtos' : quantidadeNegociacoes + ' Produto';
           
            $('#quantidade-negociacoes-abertas').val(quantidadeNegociacoes);
            $('#texto-quantidade-negociacoes-abertas').html(textoQuantidadeNegociacoes);
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
});

$('.btn-aviso').on('click', function () {
    var possuiEndereco = 'S';

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