<?php

require_once __DIR__ . '/../Helper/ConexaoHelper.php';

class VendaDAO 
{
    public static function gravarVenda(int $idUsuario) : int
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("INSERT INTO tbvendas (id_usuario) VALUES (:usuario)");
        $query->execute([':usuario' => $idUsuario]);

        return $conexao->lastInsertId();
    }

    public static function gravarDadosVenda(int $idVenda, int $idProduto, float $valor, int $porcentagem, int $quantidade) : void
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("INSERT INTO tbdados_vendas (id_venda, id_produto, valor_unitario, porcentagem_imposto, quantidade) VALUES (:venda, :produto, :valor, :porcentagem, :quantidade)");

        $query->execute([':venda' => $idVenda, ':produto' => $idProduto, ':valor' => $valor, ':porcentagem' => $porcentagem, ':quantidade' => $quantidade]);
    }
}
