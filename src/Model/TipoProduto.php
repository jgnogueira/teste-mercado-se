<?php

require_once __DIR__ . '/../DAO/TipoProdutoDAO.php';
require_once __DIR__ . '/../Helper/ValidacaoHelper.php';

class TipoProduto 
{
    public static function cadastrarTipo(string $nome) : array
    {
        if (!ValidacaoHelper::tamanho($nome, 3, 50)) {
            return [false, 'Tipo deve possuir entre 3 e 50 caracteres'];
        }

        TipoProdutoDAO::cadastrarTipo($nome);
        return [true, ''];
        
    }

    public static function buscarTiposProduto() : array
    {
        $tipos = TipoProdutoDAO::buscarTiposProduto();

        return $tipos;
    }

    public static function buscarTiposPorPesquisa(string $pesquisa) : array
    {
        $tipos = TipoProdutoDAO::buscarTiposPorPesquisa($pesquisa);

        return $tipos;
    }
}
