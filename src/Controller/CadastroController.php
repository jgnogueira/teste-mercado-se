<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/Usuario.php';

class CadastroController
{
    public static function exibirPagina() : void
    {
        echo RenderizadorDeHtmlHelper::renderizarHtml('cadastro');
    }

    public static function criarConta() : void
    {
        $nome  = filter_input(INPUT_POST, 'nome',  FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_STRING);

        $nome  = trim($nome);
        $email = trim($email);
        $senha = trim($senha);

        try {
            list($sucesso, $mensagemErro) = Usuario::criarConta($nome, $email, $senha);
            echo json_encode(['sucesso' => $sucesso, 'erro' => $mensagemErro, 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }
}
