<?php

require_once __DIR__ . '/../DAO/VendaDAO.php';
require_once __DIR__ . '/../Model/Carrinho.php';
require_once __DIR__ . '/../Model/ImpostoTipoProduto.php';

class Venda 
{
    public static function finalizarCompra() : bool
    {
        $produtos = Carrinho::buscarProdutos();
        
        if (!$produtos) {
            return false;
        }

        $idVenda  = VendaDAO::gravarVenda($_SESSION['id_usuario']);
        $impostos = ImpostoTipoProduto::buscarImpostos();

        foreach ($produtos as $produto) {
            VendaDAO::gravarDadosVenda($idVenda, $produto['id_produto'], $produto['valor'], $impostos[$produto['tipo_produto']], $produto['quantidade']);
        }

        Carrinho::limparCarrinho();

        return true;
    }
}
