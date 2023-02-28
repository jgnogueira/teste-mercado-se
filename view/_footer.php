<section class="footer-Content">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="footer-widget">
                    <h3 class="block-title">Sobre</h3>
                    <div class="textwidget" style="text-align: justify;">
                        <p>O Mercado SoftExpert possui uma enorme variedade de produtos para você!</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="footer-widget">
                    <h3 class="block-title">Links Rápidos</h3>
                    <ul class="menu">
                        <?php if (!isset($_SESSION['usuario_logado'])) { ?>
                            <li><a href="/cadastro">Cadastro</a></li>
                            <li><a href="/login">Login</a></li>
                        <?php } else { ?>
                            <?php if (isset($_SESSION['usuario_administrador']) && $_SESSION['usuario_administrador']) { ?>
                                <li><a href="/cadastrar-produto">Cadastrar Produto</a></li>
                                <li><a href="/cadastrar-tipo-produto">Cadastrar Tipo de Produto</a></li>
                                <li><a href="/cadastrar-imposto-tipo-produto">Cadastrar Imposto para Tipo de Produto</a></li>
                            <?php } ?>
                            <li><a href="/carrinho">Carrinho</a></li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>