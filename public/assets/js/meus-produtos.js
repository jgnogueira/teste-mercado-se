$('.btn-remover').on('click', function () {
    var produto     = $(this).data('id');
    var nomeProduto = $(this).data('nome');

    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA EXCLUIR ESTE PRODUTO DA PLATAFORMA?',
        footer: nomeProduto,
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

$('#tabs a').on('click', function(e) {
    e.preventDefault();
    trocarTabs($(this).attr('id'));
    $(this).tab('show');
})

function trocarTabs(idTab) {
    if (idTab === 'tab-vendas') {
        if ($('#produtos-nao-aprovados').is(':visible')) {
            return;
        }

        $('#produtos-aprovados').hide();
        $('#produtos-nao-aprovados').show();
    } else {
        if ($('#produtos-aprovados').is(':visible')) {
            return;
        }

        $('#produtos-nao-aprovados').hide();
        $('#produtos-aprovados').show();
    }
}