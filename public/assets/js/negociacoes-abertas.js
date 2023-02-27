$('.btn-cancelar').on('click', function () {
    var negociacao  = $(this).data('id');
    var produto     = $(this).data('produto');
    var podeExcluir = $(this).data('pode-excluir');

    if (podeExcluir === 'N') {
        Swal.fire({
            icon: 'warning',
            title: 'PROCESSO DE LOCAÇÃO EM ANDAMENTO!',
            width: 700,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else {
        Swal.fire({
            icon: 'question',
            title: 'VOCÊ REALMENTE DESEJA EXCLUIR ESTE PRODUTO DA SUA LISTA DE NEGOCIAÇÕES?',
            footer: produto,
            showDenyButton: true,
            reverseButtons: true,
            allowOutsideClick: false,
            width: 1300,
            confirmButtonText: `Excluir`,
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
                            url: '/cancelar-negociacao-usuario',
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
    }
});

$('.btn-venda').on('click', function () {
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

$('.btn-locacao').on('click', function () {
    var negociacao = $(this).data('id');
    var produto    = $(this).data('produto');
    var existe     = $(this).data('existe');

    if (existe === 'S') {
        Swal.fire({
            icon: 'warning',
            title: 'PRODUTO JÁ ESTÁ SOB LOCAÇÃO!',
            width: 630,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else {
        Swal.fire({
            icon: 'question',
            title: 'VOCÊ REALMENTE DESEJA REGISTRAR A LOCAÇÃO DESTE PRODUTO?',
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
                            url: '/registrar-locacao-usuario',
                            type: 'POST',
                            dataType: 'json',
                            data: data
                        }).done(function (data) {
                            if (data.sucesso) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'LOCAÇÃO REGISTRADA COM SUCESSO!',
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
                                    title: 'NÃO FOI POSSÍVEL REGISTRAR A LOCAÇÃO DESTE PRODUTO!',
                                    width: 1000,
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
                                title: 'NÃO FOI POSSÍVEL REGISTRAR A LOCAÇÃO DESTE PRODUTO!',
                                width: 1000,
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
    }
});

$('.btn-devolucao').on('click', function () {
    var negociacao = $(this).data('id');
    var produto    = $(this).data('produto');
    var idProduto  = $(this).data('id-produto');

    Swal.fire({
        icon: 'question',
        title: 'VOCÊ REALMENTE DESEJA REGISTRAR A DEVOLUÇÃO DESTE PRODUTO?',
        footer: produto,
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width: 1100,
        confirmButtonText: `Registrar`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                negociacao: negociacao,
                produto: idProduto
            }
            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/registrar-devolucao-usuario',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'DEVOLUÇÃO REGISTRADA COM SUCESSO!',
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
                                title: 'NÃO FOI POSSÍVEL REGISTRAR A DEVOLUÇÃO DESTE PRODUTO!',
                                width: 1000,
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
                            title: 'NÃO FOI POSSÍVEL REGISTRAR A DEVOLUÇÃO DESTE PRODUTO!',
                            width: 1000,
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

$('.btn-denunciar').on('click', function () {
    Swal.fire({
        input: 'textarea',
        inputLabel: 'Informar Denúncia',
        inputPlaceholder: 'Informe detalhes da sua denúncia...',
        inputAttributes: {
          'aria-label': 'Informe detalhes da sua denúncia...'
        },
        showDenyButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        confirmButtonText: `Registrar`,
        confirmButtonColor: '#28a745',
        denyButtonText: `Cancelar`,
        inputValidator: (value) => {
            if (!value) {
                return 'Denúncia deve ser informada'
            }
            if (value.length < 5) {
                return 'Denúncia deve ter no mínimo 5 caracteres'
            }
            if (value.length > 200) {
                return 'Denúncia deve ter no máximo 200 caracteres'
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            var data = {
                negociacao: $(this).data('id'),
                denunciado: $(this).data('usuario-denunciado'),
                produto:    $(this).data('produto'),
                denuncia:   result.value
            }
            
            Swal.fire({
                title: 'Aguarde...',
                showCancelButton: false,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                    $.ajax({
                        url: '/cadastrar-denuncia',
                        type: 'POST',
                        dataType: 'json',
                        data: data
                    }).done(function (data) {
                        if (data.sucesso) {
                            Swal.fire({
                                icon: 'success',
                                title: 'DENÚNCIA CADASTRADA COM SUCESSO!',
                                footer: 'Sua denúncia será analisada por nossa equipe!',
                                width: 680,
                                allowOutsideClick: false,
                                showCancelButton: false
                            })
                        } else {
                            console.log(data.log);
                            Swal.fire({
                                icon: 'error',
                                title: 'NÃO FOI POSSÍVEL CADASTRAR SUA DENÚNCIA!',
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
                            title: 'NÃO FOI POSSÍVEL CADASTRAR SUA DENÚNCIA!',
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

$('#tabs a').on('click', function(e) {
    e.preventDefault();

    var idTab = $(this).attr('id');

    if (idTab === 'tab-vendas') {
        location.href = '/negociacoes-abertas?tab=vendas';
    } else {
        location.href = '/negociacoes-abertas?tab=locacoes';
    }

    //trocarTabs($(this).attr('id'));
    //$(this).tab('show');
})

function trocarTabs(idTab) {
    if (idTab === 'tab-vendas') {
        if ($('#datatable2').is(':visible')) {
            return;
        }

        $('#datatable').DataTable().destroy();
        $('#datatable').hide();
        $('#datatable2').DataTable({
            "paging":   false,
            "info":     true,
            "ordering": false,
            "language": {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                },
                "select": {
                    "rows": {
                        "_": "Selecionado %d linhas",
                        "0": "Nenhuma linha selecionada",
                        "1": "Selecionado 1 linha"
                    }
                }
            }
        });
        $('#datatable2').show();
    } else {
        if ($('#datatable').is(':visible')) {
            return;
        }

        $('#datatable2').DataTable().destroy();
        $('#datatable2').hide();
        $('#datatable').DataTable({
            "paging":   false,
            "info":     true,
            "ordering": false,
            "language": {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "Processando...",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                },
                "select": {
                    "rows": {
                        "_": "Selecionado %d linhas",
                        "0": "Nenhuma linha selecionada",
                        "1": "Selecionado 1 linha"
                    }
                }
            }
        });
        $('#datatable').show();
    }
}