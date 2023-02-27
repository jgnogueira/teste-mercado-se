<nav class="navbar navbar-light navbar-expand-lg bg-faded osahan-menu osahan-menu-top-4">
    <div class="container">
        <a class="navbar-brand" href="/lista-de-produtos"> <span class="text-info">Mercado</span> <span class="text-danger">Soft</span><span class="text-primary">Expert</span> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" id="navbarNavDropdown">
            <div class="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                <div class="top-categories-search" id="div-pesquisa">
                    <form method="GET" action="/lista-de-produtos" id="form-pesquisa">
                        <div class="input-group">
                            <input class="form-control" id="pesquisa" placeholder="Pesquisar produtos" aria-label="Pesquisar produtos" type="text" title="Pesquisar produtos" name="pesquisa">
                            <span class="input-group-btn">
                                <button class="btn btn-primary" id="btn-pesquisar" type="button" style="cursor: pointer;"><i class="icofont icofont-search-alt-2"></i> Pesquisar</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
            <div class="my-2 my-lg-0">
                <ul class="list-inline main-nav-right">
                    <?php if (isset($_SESSION['usuario_logado'])) { ?>
                        <li class="list-inline-item dropdown osahan-top-dropdown">
                            <a class="btn btn-outline-primary dropdown-toggle dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <strong>Olá, </strong> <?= $_SESSION['nome_usuario'] ?>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-list-design">
                                <?php if (isset($_SESSION['usuario_administrador']) && $_SESSION['usuario_administrador']) { ?>
                                    <a class="dropdown-item" href="/cadastrar-produto"><i class="icofont icofont-edit"></i> Cadastrar Produto</a>
                                    <a class="dropdown-item" href="/cadastrar-tipo-produto"><i class="icofont icofont-bar-code"></i> Cadastrar Tipo de Produto</a>
                                    <a class="dropdown-item" href="/cadastrar-imposto-tipo-produto"><i class="icofont icofont-bars"></i> Cadastrar Imposto para Tipo de Produto</a>
                                <?php } ?>
                                <a class="dropdown-item" href="/carrinho"><i class="icofont icofont-shopping-cart"></i> Carrinho</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="/logout"><i class="icofont icofont-logout"></i> Sair</a>
                            </div>
                        </li>
                    <?php } else { ?>
                        <li class="list-inline-item">
                            <a class="btn btn-outline-primary" href="login"><i class="icofont icofont-login"></i> Login</a>
                            <a class="btn btn-outline-primary" href="cadastro"><i class="icofont icofont-pencil-alt-5"></i> Cadastro</a>
                        </li>
                    <?php } ?>
                </ul>
            </div>
        </div>
    </div>
</nav>