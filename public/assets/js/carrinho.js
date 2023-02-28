$('.btn-quantidade').on('click', function () {
    var negociacao = $(this).data('id');
    var produto    = $(this).data('produto');

    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA REGISTRAR A VENDA DESTE PRODUTO?',
        footer: produto,
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width: 1050,
        confirmButtonText: `Registrar`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                negociacao: negociacao
            }
            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/registrar-venda-usuario',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'VENDA REGISTRADA COM SUCESSO!',
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
                                title: 'NÃO FOI POSSÍVEL REGISTRAR A VENDA DESTE PRODUTO!',
                                width: 940,
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
                            title: 'NÃO FOI POSSÍVEL REGISTRAR A VENDA DESTE PRODUTO!',
                            width: 940,
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

$('.btn-remover').on('click', function () {
    var carrinho    = $(this).data('id');
    var nomeProduto = $(this).data('nome');

    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA REMOVER ESTE PRODUTO DO SEU CARRINHO?',
        footer: nomeProduto,
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width: 1190,
        confirmButtonText: `Remover`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                carrinho: carrinho
            }
            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/remover-produto-carrinho',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'PRODUTO REMOVIDO COM SUCESSO!',
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
                                title: 'NÃO FOI POSSÍVEL REMOVER ESTE PRODUTO!',
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
                            title: 'NÃO FOI POSSÍVEL REMOVER ESTE PRODUTO!',
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