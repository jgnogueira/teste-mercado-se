<?php

require_once __DIR__ . '/../../src/Helper/ConexaoHelper.php';
require_once __DIR__ . '/../../src/Model/ImpostoTipoProduto.php';

use PHPUnit\Framework\TestCase;

class ImpostoTipoProdutoTest extends TestCase
{
    public function setUp() : void
    {
        parent::setUp();

        $database = ConexaoHelper::retornarConexao();
        $database->prepare('DELETE FROM tbdados_vendas')->execute();
        $database->prepare('DELETE FROM tbvendas')->execute();
        $database->prepare('DELETE FROM tbcarrinho')->execute();
        $database->prepare('DELETE FROM tbprodutos')->execute();
        $database->prepare('DELETE FROM tbusuarios')->execute();
        $database->prepare('DELETE FROM tbimposto_tipos_produto')->execute();
        $database->prepare('DELETE FROM tbtipos_produto')->execute();
    }

    public function criarDataTest() : void
    {
        $database = ConexaoHelper::retornarConexao();

        // Criando Tipos dos Produtos
        $database->prepare("INSERT INTO tbtipos_produto (id, nome) VALUES (1, 'BEBIDA');")->execute();
        $database->prepare("INSERT INTO tbtipos_produto (id, nome) VALUES (2, 'HIGIENE');")->execute();
        $database->prepare("INSERT INTO tbtipos_produto (id, nome) VALUES (3, 'CONGELADOS');")->execute();

        // Criando Impostos para Tipos de Produtos
        $database->prepare("INSERT INTO tbimposto_tipos_produto (id, id_tipo, porcentagem_imposto) VALUES (1, 1, 10);")->execute();
        $database->prepare("INSERT INTO tbimposto_tipos_produto (id, id_tipo, porcentagem_imposto) VALUES (2, 2, 50);")->execute();
    }

    public function testCadastrarImposto() : void
    {
        $this->criarDataTest();
        $database    = ConexaoHelper::retornarConexao();
        $percentual  = 10;
        $tipoProduto = 3;

        $cadastrarImposto = ImpostoTipoProduto::cadastrarImposto($percentual, $tipoProduto);
        $query = $database->prepare("SELECT * FROM tbimposto_tipos_produto WHERE id_tipo = $tipoProduto");
        $query->execute();
        $retorno = $query->fetchAll();

        $this->assertTrue($cadastrarImposto[0]);
        $this->assertEquals(1, count($retorno));
    }

    public function testBuscarImpostos() : void
    {
        $this->criarDataTest();

        $impostos = ImpostoTipoProduto::buscarImpostos();
        $expected = [];
        $expected[1] = 10;
        $expected[2] = 50;

        $this->assertEquals($expected, $impostos);
    }
}
