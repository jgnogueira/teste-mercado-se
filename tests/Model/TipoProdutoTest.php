<?php

require_once __DIR__ . '/../../src/Helper/ConexaoHelper.php';
require_once __DIR__ . '/../../src/Model/TipoProduto.php';

use PHPUnit\Framework\TestCase;

class TipoProdutoTest extends TestCase
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

        // Criando Produtos
        $database->prepare("INSERT INTO tbprodutos (id, id_tipo , nome, imagem, valor)  VALUES (1, 1, 'PRODUTO 1', 'CAMINHO.PNG', 10);")->execute();
        $database->prepare("INSERT INTO tbprodutos (id, id_tipo , nome, imagem, valor)  VALUES (2, 2, 'PRODUTO 2', 'CAMINHO.PNG', 10);")->execute();
    }

    public function testCadastrarTipoQuandoTipoPossuiMenosQue3Caracteres() : void
    {
        $this->criarDataTest();
        $nome = 'AB';

        $cadastrarTipo = TipoProduto::cadastrarTipo($nome);

        $this->assertFalse($cadastrarTipo[0]);
        $this->assertEquals('Tipo deve possuir entre 3 e 50 caracteres', $cadastrarTipo[1]);
    }

    public function testCadastrarTipoQuandoTipoPossuiMaisQue50Caracteres() : void
    {
        $this->criarDataTest();
        $nome = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

        $cadastrarTipo = TipoProduto::cadastrarTipo($nome);

        $this->assertFalse($cadastrarTipo[0]);
        $this->assertEquals('Tipo deve possuir entre 3 e 50 caracteres', $cadastrarTipo[1]);
    }

    public function testCadastrarTipo() : void
    {
        $this->criarDataTest();
        $nome     = 'CONGELADOS';
        $database = ConexaoHelper::retornarConexao();

        $cadastrarTipo = TipoProduto::cadastrarTipo($nome);
        $query = $database->prepare("SELECT * FROM tbtipos_produto WHERE NOME = 'CONGELADOS'");
        $query->execute();
        $retorno = $query->fetchAll();

        $this->assertTrue($cadastrarTipo[0]);
        $this->assertEquals('', $cadastrarTipo[1]);
        $this->assertEquals(1, count($retorno));
    }

    public function testBuscarTiposProduto() : void
    {
        $this->criarDataTest();

        $tipos = TipoProduto::buscarTiposProduto();

        $this->assertEquals(2, count($tipos));
        $this->assertEquals(1, $tipos[0]['id']);
        $this->assertEquals('BEBIDA', $tipos[0]['nome']);
        $this->assertEquals(2, $tipos[1]['id']);
        $this->assertEquals('HIGIENE', $tipos[1]['nome']);
    }

    public function testBuscarTiposPorPesquisa() : void
    {
        $this->criarDataTest();
        $pesquisa = 'PRODUTO 2';

        $tipos = TipoProduto::buscarTiposPorPesquisa($pesquisa);

        $this->assertEquals(1, count($tipos));
        $this->assertEquals(2, $tipos[0]['id']);
        $this->assertEquals('HIGIENE', $tipos[0]['nome']);
    }
}
