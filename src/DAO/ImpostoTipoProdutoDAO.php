<?php

require_once __DIR__ . '/../Helper/ConexaoHelper.php';

class ImpostoTipoProdutoDAO 
{
    public static function cadastrarImposto(int $percentual, int $tipoProduto) : void
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("INSERT INTO tbimposto_tipos_produto (id_tipo, porcentagem_imposto) VALUES (:tipo, :percentual) ");

        $query->execute([':tipo' => $tipoProduto, ':percentual' => $percentual]);
    }
}
