<?php

require_once __DIR__ . '/../DAO/TipoProdutoDAO.php';
require_once __DIR__ . '/../Helper/ValidacaoHelper.php';

class TipoProduto 
{
    public static function cadastrarTipo(string $nome) : array
    {
        if (!ValidacaoHelper::tamanho($nome, 3, 100)) {
            return [false, 'Tipo deve possuir entre 3 e 100 caracteres'];
        }

        TipoProdutoDAO::cadastrarTipo($nome);
        return [true, ''];
        
    }
}
