<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/Carrinho.php';

class CarrinhoController
{
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
}
