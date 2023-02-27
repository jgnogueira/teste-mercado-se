$('#btn-pesquisar').on('click', function () {
    var pesquisa = $('#pesquisa').val();

    if (pesquisa === '') {
        window.location = '/lista-de-produtos';
    } else {
        $('#form-pesquisa').submit();
    }
});

function verificarNotificacoes(verificar, verificarChat, verificarAvaliacao) {
    if ($('#executou-acao').length && $('#executou-acao').val() !== 'Z') {
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

        if ($('#executou-acao').val() === 'D') {
            setTimeout(function() {
                Toast.fire({
                    icon: 'success',
                    title: 'PRODUTO ADICIONADO EM SUA LISTA DE DESEJOS!'
                })
            }, 1000);
        } else if ($('#executou-acao').val() === 'N') {
            setTimeout(function() {
                Toast.fire({
                    icon: 'success',
                    title: 'PRODUTO ADICIONADO EM SUA LISTA DE NEGOCIAÇÕES!'
                })
            }, 1000);
        }
    } else if (verificar === 'S' && verificarChat === 1 && verificarAvaliacao === 0) {
        setTimeout(function() {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });

            $.ajax({
                url: '/verificar-mensagens-nao-visualizadas',
                type: 'POST',
                dataType: 'json'
            }).done(function (data) {
                if (data) {
                    Toast.fire({
                        icon: 'info',
                        title: 'VOCÊ POSSUI MENSAGENS NÃO VISUALIZADAS! CLIQUE <a href="/chat?negociacao=' + data.id_negociacao + '">AQUI</a> PARA VISUALIZÁ-LAS.'
                    })
                }
            }).fail(function () {})
        }, 2000);
    } else if (verificar === 'S' && verificarChat === 0 && verificarAvaliacao === 1) {
        setTimeout(function() {
            $.ajax({
                url: '/buscar-avaliacoes-pendentes',
                type: 'POST',
                dataType: 'json'
            }).done(function (data) {
                if (data) {
                    var nomeProduto = data.nome_produto;
                    var nomeUsuario = data.nome_usuario;
                    var idUsuario   = data.id_usuario_avaliado;
                    var id          = data.id;

                    Swal.fire({
                        icon: 'warning',
                        title: 'ATENÇÃO',
                        html: '<b>Você gostaria de avaliar sua negociação com o usuário ' + nomeUsuario + ' a respeito do produto ' + nomeProduto + '?</b>',
                        showDenyButton: true,
                        reverseButtons: true,
                        allowOutsideClick: false,
                        width: 1000,
                        confirmButtonText: `Avaliar`,
                        confirmButtonColor: '#28a745',
                        denyButtonText: `Não Avaliar`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: 'AVALIAÇÃO',
                                icon:  'warning',
                                input: 'range',
                                inputLabel: '1 - Péssima | 2 - Ruim | 3 - Regular | 4 - Boa | 5 - Excelente',
                                inputAttributes: {
                                    min:  1,
                                    max:  5,
                                    step: 1
                                },
                                inputValue: 1,
                                allowOutsideClick: false,
                                width: 800,
                                confirmButtonText: `Salvar`,
                                confirmButtonColor: '#28a745',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    var data = {
                                        'id-avaliacao':  id,
                                        'id-usuario':    idUsuario,
                                        'classificacao': result.value
                                    }
                                    
                                    Swal.fire({
                                        title: 'Aguarde...',
                                        showCancelButton: false,
                                        showLoaderOnConfirm: true,
                                        allowOutsideClick: false,
                                        didOpen: () => {
                                            Swal.showLoading()
                                            $.ajax({
                                                url: '/atualizar-classificacao-usuario',
                                                type: 'POST',
                                                dataType: 'json',
                                                data: data
                                            }).done(function (data) {
                                                if (data.sucesso) {
                                                    Swal.fire({
                                                        icon: 'success',
                                                        title: 'AGRADECEMOS PELA SUA COLABORAÇÃO!',
                                                        width: 740,
                                                        allowOutsideClick: false,
                                                        showCancelButton: false
                                                    })
                                                }
                                            }).fail(function () {})
                                        }
                                    })
                                }
                            })
                        } else if (result.isDenied) {
                            var data = {
                                id: id
                            }

                            Swal.fire({
                                title: 'Aguarde...',
                                showCancelButton: false,
                                showLoaderOnConfirm: true,
                                allowOutsideClick: false,
                                didOpen: () => {
                                    Swal.showLoading()
                                    $.ajax({
                                        url: '/finalizar-avaliacao-pendente',
                                        type: 'POST',
                                        dataType: 'json',
                                        data: data
                                    }).done(function (data) {
                                        if (data.sucesso) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'AGRADECEMOS PELA SUA COLABORAÇÃO!',
                                                width: 740,
                                                allowOutsideClick: false,
                                                showCancelButton: false
                                            })
                                        }
                                    }).fail(function () {})
                                }
                            })
                        }
                    })
                }
            }).fail(function () {})
        }, 2000);
    }
}