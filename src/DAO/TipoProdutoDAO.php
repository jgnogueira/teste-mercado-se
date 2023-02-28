<?php

require_once __DIR__ . '/../Helper/ConexaoHelper.php';

class TipoProdutoDAO 
{
    public static function cadastrarTipo(string $nome) : void
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("INSERT INTO tbtipos_produto (nome) VALUES (:nome) ");

        $query->execute([':nome' => $nome]);
    }

    public static function buscarTiposProduto() : array
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("SELECT id, nome FROM tbtipos_produto ORDER BY nome");
        $query->execute();

        return $query->fetchAll();
    }

    public static function buscarTiposPorPesquisa(string $pesquisa) : array
    {
        $conexao = ConexaoHelper::retornarConexao();
        $sql     = "SELECT b.id, b.nome
                    FROM tbprodutos a, tbtipos_produto b
                    WHERE a.nome LIKE :nome";
        
        $sql = $sql . " AND b.id = a.id_tipo";

        $sql   = $sql . " ORDER BY b.nome";
        $query = $conexao->prepare($sql);
        $query->execute([':nome' => "%{$pesquisa}%"]);

        return $query->fetchAll();
    }
}
