<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php require_once '_head.php' ?>
    <title>Mercado SoftExpert - Lista De Produtos</title>
    <?php if (count($produtos) === 0) { ?>
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
                        <li class="breadcrumb-item active">Lista De Produtos</li>
                        <?php if ($pesquisa !== '') { ?>
                            <li class="breadcrumb-item active"><?= $pesquisa ?></li>
                        <?php } ?>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    <section class="products_page">
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-4">
                    <div class="widget">
                        <div class="category_sidebar">
                            <aside class="sidebar_widget">
                                <div class="widget_title">
                                    <h5 class="heading-design-h5"><i class="icofont icofont-filter"></i> Tipos de Produto</h5>
                                </div>
                                <div class="card">
                                    <div class="collapse show">
                                        <div class="card-block">
                                            <ul class="trends">
                                                <?php foreach ($tipos as $tipo) { ?>
                                                    <li>
                                                        <label class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0">
                                                            <input type="checkbox" class="custom-control-input" <?= $tipo['selecionado'] ?> onclick="location.assign('/lista-de-produtos?<?= $tipo['url'] ?>');">
                                                            <span class="custom-control-indicator"></span>
                                                            <span class="custom-control-description"><?= $tipo['nome'] ?></span>
                                                        </label>
                                                    </li>
                                                <?php } ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-md-8">
                    <div class="osahan_products_top_filter row">
                        <div class="col-lg-6 col-md-6 tags-action">
                            <!-- Filtros Realizados -->
                        </div>
                    </div>
                    <?php if (count($produtos) > 0) { ?>
                        <div class="row products_page_list">
                            <div class="clearfix"></div>
                            <?php foreach ($produtos as $produto) { ?>
                                <div class="col-lg-4 col-md-6">
                                    <div class="item">
                                        <div class="h-100">
                                            <div class="product-item">
                                                <div>
                                                    <a href="#"><img class="card-img-top img-fluid" src="assets/images/produtos/<?= $produto['imagem'] ?>" alt="<?= $produto['nome'] ?>"></a>
                                                </div>
                                                <div class="product-item-body">
                                                    <h4 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><?= $produto['nome'] ?></h4>
                                                    <h5>
                                                        <span class="product-price">R$ <?= number_format($produto['valor'], 2, ',', '.') ?></span>
                                                    </h5>
                                                    <p class="mt-3">
                                                        <?php if (isset($_SESSION['usuario_logado'])) { ?>
                                                            <button class="btn btn-outline-primary btn-aviso" id="btn-aviso-<?= $produto['id'] ?>" style="cursor: cursor>;" data-id="<?= $produto['id'] ?>"><i class="icofont icofont-notification"></i> Avise-me Quando Disponível</button>
                                                        <?php } else { ?>
                                                            <button class="btn btn-outline-primary btn-aviso" id="btn-aviso-<?= $produto['id'] ?>" style="cursor: cursor>;" data-id="<?= $produto['id'] ?>"><i class="icofont icofont-notification"></i> Avise-me Quando Disponível</button>
                                                        <?php } ?>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <?php } ?>
                        </div>
                    <?php } else { ?>
                        <div class="jumbotron">
                            <h1 class="display-4 text-center">Produtos não encontrados!</h1>
                        </div>
                    <?php } ?>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <?php require_once '_footer.php' ?>
    </footer>
    <?php require_once '_scripts.php' ?>
    <script src="assets/js/lista-de-produtos.js"></script>
    <script>
        $(document).ready(function() {
            $('#pesquisa').val('<?= $pesquisa ?>');
        });
    </script>
</body>

</html>