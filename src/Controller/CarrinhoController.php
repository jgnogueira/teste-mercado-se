<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/Carrinho.php';
require_once __DIR__ . '/../Model/ImpostoTipoProduto.php';

class CarrinhoController
{
    public static function exibirPagina() : void
    {
        $produtosCarrinho = self::atualizarValores(Carrinho::buscarProdutos());

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

    public static function atualizarQuantidadeProdutoCarrinho() : void
    {
        $idCarrinho = filter_input(INPUT_POST, 'carrinho',   FILTER_VALIDATE_INT);
        $quantidade = filter_input(INPUT_POST, 'quantidade', FILTER_VALIDATE_INT);

        try {
            $sucesso = Carrinho::atualizarQuantidadeProduto($idCarrinho, $quantidade);
            echo json_encode(['sucesso' => $sucesso, 'erro' => '', 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }

    private static function atualizarValores(array $produtos) : array
    {
        $impostos = ImpostoTipoProduto::buscarImpostos();

        foreach ($produtos as &$produto) {
            $valorImposto = ($impostos[$produto['tipo_produto']] * $produto['valor']) / 100;

            $produto['valor_total'] = $produto['valor'] * $produto['quantidade'];
            $produto['valor_total_imposto'] = $valorImposto * $produto['quantidade'];
        }

        return $produtos;
    }
}
