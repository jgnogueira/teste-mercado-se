<?php

require_once __DIR__ . '/../DAO/CarrinhoDAO.php';

class Carrinho 
{
    public static function adicionarProduto(int $idProduto) : bool
    {
        if (self::verificarExisteProduto($idProduto)) {
            return false;
        }

        CarrinhoDAO::adicionarProduto($idProduto, $_SESSION['id_usuario']);
        return true;
    }

    public static function verificarExisteProduto(int $idProduto) : bool
    {
        $existe = CarrinhoDAO::verificarExisteProduto($idProduto, $_SESSION['id_usuario']);

        return intval($existe['quantidade']) === 0 ? false : true;
    }

    public static function buscarProdutos() : array
    {
        return CarrinhoDAO::buscarProdutos($_SESSION['id_usuario']);
    }

    public static function removerProduto(int $idCarrinho) : bool
    {
        CarrinhoDAO::removerProduto($idCarrinho, $_SESSION['id_usuario']);
        return true;
    }

    public static function atualizarQuantidadeProduto(int $idCarrinho, int $quantidade) : bool
    {
        CarrinhoDAO::atualizarQuantidadeProduto($idCarrinho, $quantidade, $_SESSION['id_usuario']);
        return true;
    }

    public static function limparCarrinho() : void
    {
        CarrinhoDAO::limparCarrinho($_SESSION['id_usuario']);
    }
}
