<div class="col-lg-4 col-md-4 col-sm-5">
    <input type="hidden" id="quantidade-negociacoes-abertas" value="<?= $quantidadeDeNegociacoesAbertas ?>">
    <div class="user-account-sidebar">
        <nav class="list-group">
            <a class="list-group-item" id="menu-minha-conta" href="/minha-conta"><i class="icofont icofont-ui-user fa-fw"></i>Minha Conta</a>
            <a class="list-group-item" id="menu-meu-endereco" href="/meu-endereco"><i class="icofont icofont-location-pin fa-fw"></i>Meu Endereço</a>
            <a class="list-group-item justify-content-between" id="menu-lista-de-desejos" href="/lista-de-desejos"><span><i class="icofont icofont-heart-alt fa-fw"></i> Lista de Desejos</span> <span class="badge badge-danger"><?= $quantidadeDeProdutosListaDeDesejos > 1 ? $quantidadeDeProdutosListaDeDesejos . ' Produtos' : $quantidadeDeProdutosListaDeDesejos . ' Produto' ?></span></a>
            <a class="list-group-item justify-content-between" id="menu-negociacoes-finalizadas" href="/negociacoes-finalizadas"><span><i class="fa fa-check-square-o fa-fw"></i> Negociações Finalizadas</span> <span class="badge badge-warning"><?= $quantidadeDeNegociacoesFinalizadas > 1 ? $quantidadeDeNegociacoesFinalizadas . ' Produtos' : $quantidadeDeNegociacoesFinalizadas . ' Produto' ?></span></a>
            <a class="list-group-item justify-content-between" id="menu-negociacoes-abertas" href="/negociacoes-abertas"><span><i class="fa fa-handshake-o fa-fw"></i> Negociações Abertas<span class="badge badge-dark" id="texto-quantidade-negociacoes-abertas"><?= $quantidadeDeNegociacoesAbertas > 1 ? $quantidadeDeNegociacoesAbertas . ' Produtos' : $quantidadeDeNegociacoesAbertas . ' Produto' ?></span></span></a>
            <?php if (isset($chat)) { ?>
                <a class="list-group-item" id="menu-chat" href="/chat"><span><i class="icofont icofont-chat fa-fw"></i> Chat</span></a>
            <?php } ?>
            <a class="list-group-item justify-content-between" id="menu-meus-produtos" href="/meus-produtos"><span><i class="icofont icofont-game fa-fw"></i>Meus Produtos</span> <span class="badge badge-success"><?= $quantidadeDeProdutosCadastrados > 1 ? $quantidadeDeProdutosCadastrados . ' Produtos' : $quantidadeDeProdutosCadastrados . ' Produto' ?></span></a>
            <?php if (isset($editarProduto)) { ?>
                <a class="list-group-item" id="menu-editar-produto" href="/editar-produto?id=<?= $produto['id'] ?>"><span><i class="icofont icofont-edit fa-fw"></i> Editar Produto</span></a>
            <?php } ?>
            <a class="list-group-item" id="menu-novo-produto" href="/novo-produto"><span><i class="icofont icofont-ui-add fa-fw"></i> Novo Produto</span></a>
            <a class="list-group-item" href="/logout"><i class="icofont icofont-logout fa-fw"></i> Sair</a>
        </nav>
    </div>
</div>