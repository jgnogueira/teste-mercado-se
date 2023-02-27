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
                            <li><a href="/minha-conta">Minha Conta</a></li>
                            <li><a href="/meu-endereco">Meu Endereço</a></li>
                            <li><a href="/lista-de-desejos">Lista de Desejos</a></li>
                            <li><a href="/negociacoes-finalizadas">Negociações Finalizadas</a></li>
                            <li><a href="/negociacoes-abertas">Negociações Abertas</a></li>
                            <li><a href="/meus-produtos">Meus Produtos</a></li>
                            <li><a href="/novo-produto">Novo Produto</a></li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>