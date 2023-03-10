<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/TipoProduto.php';
require_once __DIR__ . '/../Model/Produto.php';
require_once __DIR__ . '/../Trait/AcessoAdministradorTrait.php';

class CadastrarProdutoController
{
    use AcessoAdministrador;

    public static function exibirPagina() : void
    {
        self::permitirAcessoAdministrador();

        $tipos = TipoProduto::buscarTiposProduto();

        echo RenderizadorDeHtmlHelper::renderizarHtml('cadastrar-produto', ['tipos' => $tipos]);
    }

    public static function cadastrarProduto() : void
    {
        $nome        = filter_input(INPUT_POST, 'nome',  FILTER_SANITIZE_STRING);
        $valor       = filter_input(INPUT_POST, 'valor', FILTER_SANITIZE_STRING);
        $tipoProduto = filter_input(INPUT_POST, 'tipo',  FILTER_VALIDATE_INT);

        $nome = trim($nome);

        try {
            list($sucesso, $mensagemErro) = Produto::cadastrarProduto($nome, $valor, $tipoProduto);
            echo json_encode(['sucesso' => $sucesso, 'erro' => $mensagemErro, 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }
}
