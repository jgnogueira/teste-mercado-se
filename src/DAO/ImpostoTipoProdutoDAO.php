<?php

require_once __DIR__ . '/../Helper/ConexaoHelper.php';

class ImpostoTipoProdutoDAO 
{
    public static function cadastrarImposto(int $percentual, int $tipoProduto) : void
    {
        $conexao = ConexaoHelper::retornarConexao();

        $query = $conexao->prepare("DELETE FROM tbimposto_tipos_produto WHERE id_tipo = :tipo ");

        $query->execute([':tipo' => $tipoProduto]);

        $query = $conexao->prepare("INSERT INTO tbimposto_tipos_produto (id_tipo, porcentagem_imposto) VALUES (:tipo, :percentual) ");

        $query->execute([':tipo' => $tipoProduto, ':percentual' => $percentual]);
    }

    public static function buscarImpostos() : array
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("SELECT id_tipo AS tipo_produto, porcentagem_imposto FROM tbimposto_tipos_produto ");
        $query->execute();

        return $query->fetchAll();
    }
}
