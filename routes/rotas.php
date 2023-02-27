<?php

$rotas = [
    '/login'             => 'LoginController@exibirPagina@GET',
    '/realizar-login'    => 'LoginController@realizarLogin@POST',
    '/cadastro'          => 'CadastroController@exibirPagina@GET',
    '/criar-conta'       => 'CadastroController@criarConta@POST',
    '/lista-de-produtos' => 'ListaDeProdutosController@exibirPagina@GET',
    '/logout'            => 'LogoutController@realizarLogout@GET@autenticado',
    '/404'               => 'NaoEncontradoController@exibirPagina@GET',
];
