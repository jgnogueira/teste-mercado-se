<a class="btn btn-info btn-lg" id="link-ajuda" style="position: fixed; bottom: 30px; right: 30px; z-index: 1; border-radius: 50px;" target="_blank" rel="noopener noreferrer"><i class="icofont icofont-question"></i></a>
<nav class="navbar navbar-light navbar-expand-lg bg-faded osahan-menu osahan-menu-top-4">
    <div class="container">
        <a class="navbar-brand" href="/lista-de-produtos"> <span class="text-primary">GAME</span><span class="text-danger">PASS</span> </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse" id="navbarNavDropdown">
            <div class="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                <div class="top-categories-search" id="div-pesquisa">
                    <form method="GET" action="/lista-de-produtos" id="form-pesquisa">
                        <div class="input-group">
                            <input class="form-control" id="pesquisa" placeholder="Pesquisar jogos, plataformas, desenvolvedoras, gêneros..." aria-label="Pesquisar jogos, plataformas, desenvolvedoras, gêneros..." type="text" title="Pesquisar jogos, plataformas, desenvolvedoras, gêneros..." name="pesquisa">
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
                                <a class="dropdown-item" href="/minha-conta"><i class="icofont icofont-ui-user"></i> Minha Conta</a>
                                <a class="dropdown-item" href="/meu-endereco"><i class="icofont icofont-location-pin"></i> Meu Endereço</a>
                                <a class="dropdown-item" href="/lista-de-desejos"><i class="icofont icofont-heart-alt"></i> Lista de Desejos</a>
                                <a class="dropdown-item" href="/negociacoes-finalizadas"><i class="fa fa-check-square-o"></i> Negociações Finalizadas</a>
                                <a class="dropdown-item" href="/negociacoes-abertas"><i class="fa fa-handshake-o"></i> Negociações Abertas</a>
                                <a class="dropdown-item" href="/meus-produtos"><i class="icofont icofont-game"></i> Meus Produtos</a>
                                <a class="dropdown-item" href="/novo-produto"><i class="icofont icofont-ui-add"></i> Novo Produto</a>
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