<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';

class CadastroController
{
    public static function exibirPagina() : void
    {
        /*$plataformasAtivas = Plataforma::buscarPlataformasAtivas();
        $generosAtivos     = Genero::buscarGenerosAtivos();*/

        echo RenderizadorDeHtmlHelper::renderizarHtml('cadastro'/*, ['plataformas' => $plataformasAtivas, 'generos' => $generosAtivos]*/);
    }

    /*public static function criarConta() : void
    {
        $nome       = filter_input(INPUT_POST, 'nome',       FILTER_SANITIZE_STRING);
        $email      = filter_input(INPUT_POST, 'email',      FILTER_VALIDATE_EMAIL);
        $senha      = filter_input(INPUT_POST, 'senha',      FILTER_SANITIZE_STRING);
        $celular    = filter_input(INPUT_POST, 'celular',    FILTER_SANITIZE_STRING);
        $cpf        = filter_input(INPUT_POST, 'cpf',        FILTER_SANITIZE_STRING);
        $plataforma = filter_input(INPUT_POST, 'plataforma', FILTER_VALIDATE_INT);
        $genero     = filter_input(INPUT_POST, 'genero',     FILTER_VALIDATE_INT);

        $nome    = trim($nome);
        $email   = trim($email);
        $senha   = trim($senha);
        $celular = trim($celular);
        $cpf     = trim($cpf);

        try {
            list($sucesso, $mensagemErro) = Usuario::criarConta($nome, $email, $senha, $celular, $cpf, $plataforma, $genero);
            echo json_encode(['sucesso' => $sucesso, 'erro' => $mensagemErro, 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }*/
}
