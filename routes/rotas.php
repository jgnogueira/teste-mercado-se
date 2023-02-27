<?php

$rotas = [
    '/login'          => 'LoginController@exibirPagina',
    '/realizar-login' => 'LoginController@realizarLogin',
    '/cadastro'       => 'CadastroController@exibirPagina',
    '/criar-conta'    => 'CadastroController@criarConta',
    '/404'            => 'NaoEncontradoController@exibirPagina',
    
];
