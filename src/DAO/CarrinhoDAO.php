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
}
