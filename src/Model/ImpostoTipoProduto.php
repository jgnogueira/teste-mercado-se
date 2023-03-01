<?php

require_once __DIR__ . '/../DAO/ImpostoTipoProdutoDAO.php';
require_once __DIR__ . '/../Helper/ValidacaoHelper.php';

class ImpostoTipoProduto 
{
    public static function cadastrarImposto(int $percentual, int $tipoProduto) : array
    {
        if (!ValidacaoHelper::numeroInteiro($percentual)) {
            return [false, 'Percentual inválido'];
        }

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
