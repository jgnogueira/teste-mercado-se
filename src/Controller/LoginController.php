<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/Usuario.php';

class LoginController
{
    public static function exibirPagina() : void
    {
        $aposLogin = filter_has_var(INPUT_GET, 'apos-login') ? filter_input(INPUT_GET, 'apos-login', FILTER_SANITIZE_URL) : '/lista-de-produtos';

        echo RenderizadorDeHtmlHelper::renderizarHtml('login', ['aposLogin' => $aposLogin]);
    }

    public static function realizarLogin() : void
    {
        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        $senha = filter_input(INPUT_POST, 'senha', FILTER_SANITIZE_STRING);

        $email = trim($email);
        $senha = trim($senha);

        try {
            list($sucesso, $mensagemErro) = Usuario::realizarLogin($email, $senha);
            echo json_encode(['sucesso' => $sucesso, 'erro' => $mensagemErro, 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }
}
