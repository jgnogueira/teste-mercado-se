<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/TipoProduto.php';
require_once __DIR__ . '/../Trait/AcessoAdministradorTrait.php';

class CadastrarTipoProdutoController
{
    use AcessoAdministrador;

    public static function exibirPagina() : void
    {
        self::permitirAcessoAdministrador();

        echo RenderizadorDeHtmlHelper::renderizarHtml('cadastrar-tipo-produto');
    }

    public static function cadastrarTipo() : void
    {
        $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);

        $nome = trim($nome);

        try {
            list($sucesso, $mensagemErro) = TipoProduto::cadastrarTipo($nome);
            echo json_encode(['sucesso' => $sucesso, 'erro' => $mensagemErro, 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }
}
