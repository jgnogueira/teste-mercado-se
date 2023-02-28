<?php

$rotas = [
    '/login'                          => 'LoginController@exibirPagina@GET',
    '/realizar-login'                 => 'LoginController@realizarLogin@POST',
    '/cadastro'                       => 'CadastroController@exibirPagina@GET',
    '/criar-conta'                    => 'CadastroController@criarConta@POST',
    '/lista-de-produtos'              => 'ListaDeProdutosController@exibirPagina@GET',
    '/logout'                         => 'LogoutController@realizarLogout@GET@autenticado',
    '/404'                            => 'NaoEncontradoController@exibirPagina@GET',
    '/cadastrar-tipo-produto'         => 'CadastrarTipoProdutoController@exibirPagina@GET@autenticado',
    '/salvar-tipo-produto'            => 'CadastrarTipoProdutoController@cadastrarTipo@POST@autenticado',
    '/cadastrar-imposto-tipo-produto' => 'CadastrarImpostoTipoProdutoController@exibirPagina@GET@autenticado',
    '/salvar-imposto-tipo-produto'    => 'CadastrarImpostoTipoProdutoController@cadastrarImposto@POST@autenticado',
    '/cadastrar-produto'              => 'CadastrarProdutoController@exibirPagina@GET@autenticado',
    '/salvar-produto'                 => 'CadastrarProdutoController@cadastrarProduto@POST@autenticado',
    '/carrinho'                       => 'CarrinhoController@exibirPagina@GET@autenticado',
    '/adicionar-produto-carrinho'     => 'CarrinhoController@adicionarProdutoCarrinho@POST@autenticado',
    '/remover-produto-carrinho'       => 'CarrinhoController@removerProdutoCarrinho@POST@autenticado',
    '/atualizar-quantidade-produto'   => 'CarrinhoController@atualizarQuantidadeProdutoCarrinho@POST@autenticado',
    '/finalizar-compra'               => 'VendasController@finalizarCompra@POST@autenticado',
];
