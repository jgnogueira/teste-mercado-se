$('#tabs a').on('click', function(e) {
    e.preventDefault();
    trocarTabs($(this).attr('id'));
    $(this).tab('show');
})

function trocarTabs(idTab) {
    if (idTab === 'tab-vendas') {
        if ($('#datatable2').is(':visible')) {
            return;
        }

        $('#datatable').DataTable().destroy();
        $('#datatable').hide();
        $('#datatable2').DataTable({
            "paging":   true,
            "info":     true,
            "ordering": true,
            "pageLength": 25,
            "columnDefs": [{
                "targets": [6],
                "visible": false,
                "searchable": false
            }, {
                "targets": [7],
                "visible": false,
                "searchable": false
            }],
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
            },
            'footerCallback': function(row, data, start, end, display) {
                var api = this.api(),
                    data;

                var intVal = function(i) {
                    return typeof i === 'string' ?
                        parseInt(i.replace(/[^0-9,]*/g, '').replace(',', '.')) :
                        typeof i === 'number' ?
                        i : 0;
                };

                var totalRecebidoVendas = api
                    .column(7, {
                        page: 'current'
                    })
                    .data()
                    .reduce(function(a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                var totalGastoVendas = api
                    .column(6, {
                        page: 'current'
                    })
                    .data()
                    .reduce(function(a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                $('#total-recebido-vendas').html('R$ ' + totalRecebidoVendas.toLocaleString('pt-br', {minimumFractionDigits: 2}));
                $('#total-gasto-vendas').html('R$ ' + totalGastoVendas.toLocaleString('pt-br', {minimumFractionDigits: 2}));
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
            "paging":   true,
            "info":     true,
            "ordering": true,
            "pageLength": 25,
            "columnDefs": [{
                "targets": [7],
                "visible": false,
                "searchable": false
            }, {
                "targets": [8],
                "visible": false,
                "searchable": false
            }],
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
            },
            'footerCallback': function(row, data, start, end, display) {
                var api = this.api(),
                    data;

                var intVal = function(i) {
                    return typeof i === 'string' ?
                        parseInt(i.replace(/[^0-9,]*/g, '').replace(',', '.')) :
                        typeof i === 'number' ?
                        i : 0;
                };

                var totalRecebidoLocacoes = api
                    .column(8, {
                        page: 'current'
                    })
                    .data()
                    .reduce(function(a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                var totalGastoLocacoes = api
                    .column(7, {
                        page: 'current'
                    })
                    .data()
                    .reduce(function(a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                $('#total-recebido-locacoes').html('R$ ' + totalRecebidoLocacoes.toLocaleString('pt-br', {minimumFractionDigits: 2}));
                $('#total-gasto-locacoes').html('R$ ' + totalGastoLocacoes.toLocaleString('pt-br', {minimumFractionDigits: 2}));
            }
        });
        $('#datatable').show();
    }
}