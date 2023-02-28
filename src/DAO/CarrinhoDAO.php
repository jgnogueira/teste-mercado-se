<?php

require_once __DIR__ . '/../Helper/ConexaoHelper.php';

class CarrinhoDAO 
{
    public static function adicionarProduto(int $idProduto, int $idUsuario) : void
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("INSERT INTO tbcarrinho (id_usuario, id_produto, quantidade) VALUES (:usuario, :produto, 1)");

        $query->execute([':usuario' => $idUsuario, ':produto' => $idProduto]);
    }

    public static function verificarExisteProduto(int $idProduto, int $idUsuario) : array|bool
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("SELECT COUNT(1) AS quantidade FROM tbcarrinho WHERE id_usuario = :usuario AND id_produto = :produto");
        $query->execute([':usuario' => $idUsuario, ':produto' => $idProduto]);

        return $query->fetch();
    }

    public static function buscarProdutos(int $idUsuario) : array
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("SELECT a.id AS id_carrinho, a.quantidade, b.nome, b.valor, 10 as valor_total, 10 as valor_total_imposto FROM tbcarrinho a, tbprodutos b WHERE a.id_usuario = :usuario AND b.id = a.id_produto ORDER BY a.data_cadastro");
        $query->execute([':usuario' => $idUsuario]);

        return $query->fetchAll();
    }

    public static function removerProduto(int $idCarrinho, int $idUsuario) : void
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("DELETE FROM tbcarrinho WHERE id = :id_carrinho AND id_usuario = :id_usuario");

        $query->execute([':id_carrinho' => $idCarrinho, ':id_usuario' => $idUsuario]);
    }
}
