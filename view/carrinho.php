<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php require_once '_head.php' ?>
    <link href="assets/plugins/datatables/datatables.min.css" rel="stylesheet" type="text/css">
    <title>Mercado SoftExpert - Carrinho</title>
    <?php if (count($produtosCarrinho) === 0 || count($produtosCarrinho) < 5) { ?>
        <style>
            html {
                height: 100%;
                min-height: 100%;
            }

            body {
                display: flex;
                flex-direction: column;
                min-height: 100%;
            }

            footer {
                margin-top: auto;
            }
        </style>

    <?php } ?>
</head>

<body>
    <?php require_once '_menu_superior.php' ?>
    <div class="osahan-breadcrumb">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/lista-de-produtos"><i class="icofont icofont-ui-home"></i> Home</a></li>
                        <li class="breadcrumb-item active">Carrinho</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <section class="shopping_cart_page">
        <div class="container">
            <div class="row">
                <?php require_once '_menu_usuario.php' ?>
                <div class="col-lg-8 col-md-8 col-sm-7">
                    <div class="widget">
                        <div class="section-header">
                            <h5 class="heading-design-h5">
                                Carrinho
                            </h5>
                        </div>
                        <div class="row mt-4">
                            <table class="table table-striped table-bordered table-responsive table-hover" id="datatable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th style="text-align: left;">Produto</th>
                                        <th style="text-align: left;">Valor Unitário</th>
                                        <th style="text-align: left;">Quantidade</th>
                                        <th style="text-align: left;">Valor Total</th>
                                        <th style="text-align: left;">Valor Total em Impostos</th>
                                        <th style="text-align: center;">Alterar Quantidade</th>
                                        <th style="text-align: center;">Remover Produto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($produtosCarrinho as $produto) { ?>
                                        <tr>
                                            <td style="text-align: left;"><?= $produto['nome'] ?></td>
                                            <td style="text-align: left;">R$ <?= number_format($produto['valor'], 2, ',', '.') ?></td>
                                            <td style="text-align: left;"><?= $produto['quantidade'] ?></td>
                                            <td style="text-align: left;">R$ <?= number_format($produto['valor_total'], 2, ',', '.') ?></td>
                                            <td style="text-align: left;">R$ <?= number_format($produto['valor_total_imposto'], 2, ',', '.') ?></td>
                                            <td style="text-align: center;"><button type="button" class="btn btn-info btn-sm btn-quantidade" style="cursor: pointer;" data-id="<?= $produto['id_carrinho'] ?>" data-nome="<?= $produto['nome'] ?>"><i class="icofont icofont-cart-alt"></i></button></td>
                                            <td style="text-align: center;"><button type="button" class="btn btn-danger btn-sm btn-remover"  style="cursor: pointer;" data-id="<?= $produto['id_carrinho'] ?>" data-nome="<?= $produto['nome'] ?>"><i class="icofont icofont-trash"></i></button></td>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                                <?php if (count($produtosCarrinho) > 0) { ?>
                                    <tfoot>
                                        <tr>
                                            <th colspan="7" style="text-align:right">Valor Total dos Produtos: <span id="total-produtos"></span> | Valor Total em Impostos: <span id="total-impostos"></span></th>
                                        </tr>
                                    </tfoot>
                                <?php } ?>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <?php require_once '_footer.php' ?>
    </footer>
    <?php require_once '_scripts.php' ?>
    <script src="assets/js/carrinho.js"></script>
    <script src="assets/plugins/datatables/datatables.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#carrinho').addClass('active');
            $('#datatable').DataTable({
                "paging":   false,
                "info":     false,
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

                    var valorTotal = api
                        .column(3, {
                            page: 'current'
                        })
                        .data()
                        .reduce(function(a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);

                    var valorTotalImpostos = api
                        .column(4, {
                            page: 'current'
                        })
                        .data()
                        .reduce(function(a, b) {
                            return intVal(a) + intVal(b);
                        }, 0);

                    $('#total-produtos').html('R$ ' + valorTotal.toLocaleString('pt-br', {minimumFractionDigits: 2}));
                    $('#total-impostos').html('R$ ' + valorTotalImpostos.toLocaleString('pt-br', {minimumFractionDigits: 2}));
                }
            });
        });
    </script>
</body>

</html>