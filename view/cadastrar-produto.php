<!DOCTYPE html>
<html lang="pt-br">

<head>
    <?php require_once '_head.php' ?>
    <title>Mercado SoftExpert - Cadastrar Produto</title>
</head>

<body>
    <?php require_once '_menu_superior.php' ?>
    <div class="osahan-breadcrumb">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/lista-de-produtos"><i class="icofont icofont-ui-home"></i> Home</a></li>
                        <li class="breadcrumb-item active">Cadastrar Produto</li>
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
                                Cadastrar Produto
                            </h5>
                        </div>
                        <form>
                            <div class="row">
                                <div class="col-sm-12">
                                    <fieldset class="form-group position-relative">
                                        <label for="nome">Nome</label>
                                        <input type="text" class="form-control" id="nome" name="nome" title="Preencha este campo" value="">
                                        <span style="position: absolute; right: 10px; top: 38px;" class="icofont" id="icone-feedback-nome"></span>
                                        <div class="invalid-feedback" id="feedback-nome" style="font-size: 12px;">

                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <fieldset class="form-group">
                                        <label for="tipo">Tipo de Produto</label>
                                        <select class="form-control" id="tipo" name="tipo">
                                            <?php foreach ($tipos as $tipo) { ?>
                                                <option value="<?= $tipo['id'] ?>"><?= $tipo['nome'] ?></option>
                                            <?php } ?>
                                        </select>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <fieldset class="form-group position-relative">
                                        <label for="valor">Valor</label>
                                        <input type="text" class="form-control" id="valor" name="valor" title="Preencha este campo" value="" maxlength="9">
                                        <span style="position: absolute; right: 10px; top: 38px;" class="icofont" id="icone-feedback-valor"></span>
                                        <div class="invalid-feedback" id="feedback-valor" style="font-size: 12px;">

                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <fieldset class="form-group position-relative">
                                        <label for="imagem">Imagem</label>
                                        <input type="file" class="form-control" id="imagem" name="imagem" title="Selecione o arquivo" accept="image/png, image/jpeg">
                                        <span style="position: absolute; right: 10px; top: 38px;" class="icofont" id="icone-feedback-imagem"></span>
                                        <div class="invalid-feedback" id="feedback-imagem" style="font-size: 12px;">

                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-12 text-right">
                                    <button type="button" class="btn btn-outline-danger  btn-md" id="btn-cancelar" style="cursor: pointer;"><i class="icofont icofont-ui-close"></i> Cancelar </button>
                                    <button type="button" class="btn btn-outline-success btn-md" id="btn-salvar"   style="cursor: pointer;"><i class="icofont icofont-save"></i> Salvar </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <?php require_once '_footer.php' ?>
    </footer>
    <?php require_once '_scripts.php' ?>
    <script src="assets/js/cadastrar-produto.js"></script>
    <script src="assets/js/jquery.maskMoney.js"></script>
    <script>
        $(document).ready(function() {
            $('#cadastrar-produto').addClass('active');
            $('#valor').maskMoney({
                symbol: 'R$ ',
                showSymbol: true,
                thousands: '.',
                decimal: ',',
                symbolStay: true
            });
        });
    </script>
</body>

</html>