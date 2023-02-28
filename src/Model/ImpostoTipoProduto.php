<?php

require_once __DIR__ . '/../DAO/ImpostoTipoProdutoDAO.php';

class ImpostoTipoProduto 
{
    public static function cadastrarImposto(int $percentual, int $tipoProduto) : array
    {
        ImpostoTipoProdutoDAO::cadastrarImposto($percentual, $tipoProduto);
        return [true, ''];
    }
}
