$('.btn-quantidade').on('click', function () {
    var carrinho    = $(this).data('id');
    var nomeProduto = $(this).data('nome');

    Swal.fire({
        icon: 'info',
        title: 'ALTERAR QUANTIDADE',
        footer: nomeProduto,
        input: 'range',
        inputAttributes: {
            min: 1,
            max: 99,
            step: 1
        },
        inputValue: 1,
        showCloseButton: true,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                carrinho: carrinho,
                quantidade: result.value
            }
            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/atualizar-quantidade-produto',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'QUANTIDADE ATUALIZADA COM SUCESSO!',
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
                                title: 'NÃO FOI POSSÍVEL ATUALIZAR A QUANTIDADE!',
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
                            title: 'NÃO FOI POSSÍVEL ATUALIZAR A QUANTIDADE!',
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

$('#btn-finalizar').on('click', function () {
    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA FINALIZAR SUA COMPRA?',
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width: 900,
        confirmButtonText: `Finalizar`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/finalizar-compra',
                        type: 'POST',
                        dataType: 'json'
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'COMPRA FINALIZADA COM SUCESSO!',
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
                                title: 'NÃO FOI POSSÍVEL FINALIZAR SUA COMPRA!',
                                width: 780,
                                allowOutsideClick: false,
                                showCancelButton: false,
                                didOpen: () => {
                                    Swal.showValidationMessage(
                                        'Tente novamente'
                                    )
                                }
                            })
                        }
                    }).fail(function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'NÃO FOI POSSÍVEL FINALIZAR SUA COMPRA!',
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