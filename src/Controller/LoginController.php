<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
//require_once __DIR__ . '/../Models/Usuario.php';

class LoginController
{
    public static function exibirPagina() : void
    {
        /*$email     = filter_has_var(INPUT_GET, 'email')      ? filter_input(INPUT_GET, 'email',      FILTER_VALIDATE_EMAIL)  : null;
        $token     = filter_has_var(INPUT_GET, 'token')      ? filter_input(INPUT_GET, 'token',      FILTER_SANITIZE_STRING) : null;
        $aposLogin = filter_has_var(INPUT_GET, 'apos-login') ? filter_input(INPUT_GET, 'apos-login', FILTER_SANITIZE_URL)    : '/minha-conta';

        $possuiToken = false;
        $tokenValido = false;

        if ($email !== null && $email !== false && $token !== null) {
            $email = trim($email);
            $token = trim($token);

            try {
                list($possuiToken, $tokenValido) = Usuario::validarEmailUsuario($email, $token);
            } catch (Exception $ex) {
                $possuiToken = false;
                $tokenValido = false;
            }
        }*/

        echo RenderizadorDeHtmlHelper::renderizarHtml('login'/*, ['email' => $email, 'possuiToken' => $possuiToken, 'tokenValido' => $tokenValido, 'aposLogin' => $aposLogin]*/);
    }

    /*public static function realizarLogin() : void
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
    }*/
}
