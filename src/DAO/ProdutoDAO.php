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
}
