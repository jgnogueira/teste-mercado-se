<?php

$rotas = [
    '/login'             => 'LoginController@exibirPagina@GET',
    '/realizar-login'    => 'LoginController@realizarLogin@POST',
    '/cadastro'          => 'CadastroController@exibirPagina@GET',
    '/criar-conta'       => 'CadastroController@criarConta@POST',
    '/404'               => 'NaoEncontradoController@exibirPagina@GET',
    '/lista-de-produtos' => 'ListaDeProdutosController@exibirPagina@GET',
];
