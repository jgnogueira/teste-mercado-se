<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/ImpostoTipoProduto.php';
require_once __DIR__ . '/../Model/TipoProduto.php';

class CadastrarImpostoTipoProdutoController
{
    public static function exibirPagina() : void
    {
        $tipos = TipoProduto::buscarTiposProduto();

        echo RenderizadorDeHtmlHelper::renderizarHtml('cadastrar-imposto-tipo-produto', ['tipos' => $tipos]);
    }

    public static function cadastrarImposto() : void
    {
        $percentual  = filter_input(INPUT_POST, 'percentual', FILTER_VALIDATE_INT);
        $tipoProduto = filter_input(INPUT_POST, 'tipo',       FILTER_VALIDATE_INT);

        try {
            list($sucesso, $mensagemErro) = ImpostoTipoProduto::cadastrarImposto($percentual, $tipoProduto);
            echo json_encode(['sucesso' => $sucesso, 'erro' => $mensagemErro, 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }
}
