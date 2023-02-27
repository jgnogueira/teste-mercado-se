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
}
