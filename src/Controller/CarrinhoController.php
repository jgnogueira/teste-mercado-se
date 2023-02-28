<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/Carrinho.php';

class CarrinhoController
{
    public static function exibirPagina() : void
    {
        $produtosCarrinho = Carrinho::buscarProdutos();

        echo RenderizadorDeHtmlHelper::renderizarHtml('carrinho', ['produtosCarrinho' => $produtosCarrinho]);
    }

    public static function adicionarProdutoCarrinho() : void
    {
        $produto = filter_input(INPUT_POST, 'produto', FILTER_VALIDATE_INT);

        try {
            $sucesso = Carrinho::adicionarProduto($produto);
            echo json_encode(['sucesso' => $sucesso, 'erro' => '', 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }

    public static function removerProdutoCarrinho() : void
    {
        $idCarrinho = filter_input(INPUT_POST, 'carrinho', FILTER_VALIDATE_INT);

        try {
            $sucesso = Carrinho::removerProduto($idCarrinho);
            echo json_encode(['sucesso' => $sucesso, 'erro' => '', 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }
}
