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
                        <li class="breadcrumb-item"><a href="/minha-conta"><i class="icofont icofont-ui-home"></i> Home</a></li>
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
                            <input type="hidden" id="possui-endereco" value="<?= isset($_SESSION['usuario_logado']) ? $_SESSION['possui_endereco'] : 'N' ?>">
                            <div class="clearfix"></div>
                            <?php foreach ($produtos as $produto) { ?>
                                <div class="col-lg-4 col-md-6">
                                    <div class="item">
                                        <div class="h-100">
                                            <div class="product-item">
                                                <div>
                                                    <?php if (isset($_SESSION['usuario_logado'])) { ?>
                                                        <span class="like-icon <?= $produto['desejo'] === true ? 'text-danger' : '' ?>" id="icone-desejo-<?= $produto['id'] ?>"><i class="icofont icofont-heart-alt"></i></span>
                                                    <?php } else { ?>
                                                        <span class="like-icon"><i class="icofont icofont-heart-alt"></i></span>
                                                    <?php } ?>
                                                    <a href="/detalhes-do-produto?produto=<?= $produto['id'] ?>"><img class="card-img-top img-fluid" src="assets/images/produtos/<?= $produto['nome_imagem'] ?>" alt="<?= $produto['nome'] ?>"></a>
                                                </div>
                                                <div class="product-item-body">
                                                    <h4 class="card-title" style="white-space: nowrap; text-overflow: ellipsis; overflow: hidden;"><a href="/detalhes-do-produto?produto=<?= $produto['id'] ?>"><?= $produto['nome'] ?></a></h4>
                                                    <h5>
                                                        <span class="product-price">R$ <?= number_format($produto['valor'], 2, ',', '.') ?></span>
                                                    </h5>
                                                    <p class="mt-3">
                                                        <?php if (isset($_SESSION['usuario_logado'])) { ?>
                                                            <?php if ($produto['situacao'] === 'L' && intval($produto['id_usuario_locacao']) !== intval($_SESSION['id_usuario'])) { ?>
                                                                <button class="btn btn-outline-primary btn-aviso" id="btn-aviso-<?= $produto['id'] ?>" style="cursor: <?= $produto['aviso'] === true ? 'not-allowed' : 'pointer' ?>;" data-id="<?= $produto['id'] ?>" <?= $produto['aviso'] === true ? 'disabled' : '' ?>><i class="icofont icofont-notification"></i> Avise-me Quando Disponível</button>
                                                            <?php } else { ?>
                                                                <button class="btn btn-outline-danger btn-desejo" <?= $produto['desejo'] === true || ($produto['negociacao'] === true && $produto['situacao'] === 'L') ? 'disabled' : '' ?> id="btn-desejo-<?= $produto['id'] ?>" style="cursor: <?= $produto['desejo'] === true || ($produto['negociacao'] === true && $produto['situacao'] === 'L') ? 'not-allowed' : 'pointer' ?>;" data-id="<?= $produto['id'] ?>"><i class="icofont icofont-heart-alt"></i> Desejo</button>
                                                                <button class="btn btn-outline-success btn-interesse" <?= $produto['negociacao'] === true ? 'disabled' : '' ?> id="btn-interesse-<?= $produto['id'] ?>" style="cursor: <?= $produto['negociacao'] === true ? 'not-allowed' : 'pointer' ?>;" data-id="<?= $produto['id'] ?>" data-usuario="<?= $produto['id_usuario'] ?>" data-tipo-negociacao="<?= $produto['tipo_negociacao'] ?>"><i class="fa fa-handshake-o"></i> Negociar</button>
                                                            <?php  } ?>
                                                        <?php } else { ?>
                                                            <a class="btn btn-outline-danger" href="/login?acao=1&produto=<?= $produto['id'] ?>&usuario=<?= $produto['id_usuario'] ?>" style="cursor: pointer;"><i class="icofont icofont-heart-alt"></i> Desejo</a>
                                                            <a class="btn btn-outline-success" href="/login?acao=2&produto=<?= $produto['id'] ?>&usuario=<?= $produto['id_usuario'] ?>" style="cursor: pointer;"><i class="fa fa-handshake-o"></i> Negociar</a>
                                                        <?php } ?>
                                                    </p>
                                                </div>
                                                <div class="product-item-footer">
                                                    <div class="stars-rating">
                                                        <?php for ($i = 0; $i < 5; $i++) { ?>
                                                            <i class="icofont icofont-star <?= round($produto['classificacao']) > $i ? 'active' : '' ?>"></i>
                                                        <?php } ?>
                                                        <span>(<?= $produto['quantidade_avaliacoes'] ?>)</span>
                                                    </div>
                                                    <?php if (isset($_SESSION['usuario_logado'])) { ?>
                                                        <div class="text-center" style="color: #ccc; font-size: 12px; font-weight: 400;">
                                                            <strong><?= $produto['tipo_negociacao'] === 'L' ? 'Locação' : 'Venda' ?></strong>
                                                        </div>
                                                        <div class="text-center" style="color: #ccc; font-size: 12px; font-weight: 400;">
                                                            <strong><?= $produto['cidade'] ?> - <?= $produto['uf'] ?></strong>
                                                        </div>
                                                        <?php
                                                            switch (round($produto['classificacao_usuario'])) {
                                                                case 1:
                                                                    $classe    = 'text-danger';
                                                                    $reputação = 'Reputação Péssima';
                                                                    break;
                                                                case 2:
                                                                    $classe    = 'text-warning';
                                                                    $reputação = 'Reputação Ruim';
                                                                    break;
                                                                case 3:
                                                                    $classe    = 'text-info';
                                                                    $reputação = 'Reputação Regular';
                                                                    break;
                                                                case 4:
                                                                    $classe    = 'text-primary';
                                                                    $reputação = 'Reputação Boa';
                                                                    break;
                                                                case 5:
                                                                    $classe    = 'text-success';
                                                                    $reputação = 'Reputação Excelente';
                                                                    break;
                                                                default:
                                                                    $classe    = '';
                                                                    $reputação = 'Sem Reputação';
                                                                    break;
                                                            }
                                                        ?>
                                                        <div class="text-center <?= $classe ?>" style="color: #ccc; font-size: 12px; font-weight: 400;">
                                                            <strong><?= $reputação ?></strong>
                                                            <strong>(<?= $produto['quantidade_avaliacoes_usuario'] ?>)</strong>
                                                        </div>
                                                    <?php } ?>
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