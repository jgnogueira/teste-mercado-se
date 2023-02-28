<?php

require_once __DIR__ . '/../Helper/ConexaoHelper.php';

class ProdutoDAO 
{
    public static function cadastrarProduto(string $nome, float $valor, string $imagem, int $tipoProduto) : void
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("INSERT INTO tbprodutos (id_tipo, nome, imagem, valor) VALUES (:tipo, :nome, :imagem, :valor) ");

        $query->execute([':tipo' => $tipoProduto, ':nome' => $nome, ':imagem' => $imagem, ':valor' => $valor]);
    }

    public static function buscarProdutosPorPesquisa(string $pesquisa, ?array $tipos) : array
    {
        $conexao = ConexaoHelper::retornarConexao();
        $sql     = "SELECT a.*
                    FROM tbprodutos a
                    WHERE UPPER(a.nome) LIKE UPPER(:nome)";

        if (isset($tipos)) {
            $sql = $sql . ' AND a.id_tipo IN (' . implode(', ', $tipos) . ')';
        }

        $sql   = $sql . " ORDER BY NOME";
        $query = $conexao->prepare($sql);
        $query->execute([':nome' => "%{$pesquisa}%"]);

        return $query->fetchAll();
    }
}
