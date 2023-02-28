<?php

require_once __DIR__ . '/../DAO/ImpostoTipoProdutoDAO.php';

class ImpostoTipoProduto 
{
    public static function cadastrarImposto(int $percentual, int $tipoProduto) : array
    {
        ImpostoTipoProdutoDAO::cadastrarImposto($percentual, $tipoProduto);
        return [true, ''];
    }

    public static function buscarImpostos() : array
    {
        $resultados = ImpostoTipoProdutoDAO::buscarImpostos();
        $impostos   = [];

        foreach ($resultados as $resultado) {
            $impostos[$resultado['tipo_produto']] = $resultado['porcentagem_imposto'];
        }

        return $impostos;
    }
}
