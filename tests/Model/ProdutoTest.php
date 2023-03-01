<?php

require_once __DIR__ . '/../../src/Helper/ConexaoHelper.php';
require_once __DIR__ . '/../../src/Model/Produto.php';

use PHPUnit\Framework\TestCase;

class ProdutoTest extends TestCase
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

        // Criando Produtos
        $database->prepare("INSERT INTO tbprodutos (id, id_tipo , nome, imagem, valor)  VALUES (1, 1, 'PRODUTO 1', 'CAMINHO.PNG', 10);")->execute();
        $database->prepare("INSERT INTO tbprodutos (id, id_tipo , nome, imagem, valor)  VALUES (2, 2, 'PRODUTO 2', 'CAMINHO.PNG', 10);")->execute();
    }

    public function testCadastrarProdutoQuandoNomePossuiMenosQue3Caracteres() : void
    {
        $this->criarDataTest();
        $nome  = 'AB';
        $valor = 'R$ 10,00';
        $tipoProduto   = 1;
        $validarImagem = false;

        $cadastrarProduto = Produto::cadastrarProduto($nome, $valor, $tipoProduto, $validarImagem);

        $this->assertFalse($cadastrarProduto[0]);
        $this->assertEquals('Nome deve possuir entre 3 e 50 caracteres', $cadastrarProduto[1]);
    }

    public function testCadastrarProdutoQuandoNomePossuiMaisQue50Caracteres() : void
    {
        $this->criarDataTest();
        $nome  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        $valor = 'R$ 10,00';
        $tipoProduto   = 1;
        $validarImagem = false;

        $cadastrarProduto = Produto::cadastrarProduto($nome, $valor, $tipoProduto, $validarImagem);

        $this->assertFalse($cadastrarProduto[0]);
        $this->assertEquals('Nome deve possuir entre 3 e 50 caracteres', $cadastrarProduto[1]);
    }

    public function testCadastrarProduto() : void
    {
        $this->criarDataTest();
        $nome  = 'PRODUTO 3';
        $valor = 'R$ 10,00';
        $database      = ConexaoHelper::retornarConexao();
        $tipoProduto   = 3;
        $validarImagem = false;

        $cadastrarProduto = Produto::cadastrarProduto($nome, $valor, $tipoProduto, $validarImagem);
        $query = $database->prepare("SELECT * FROM tbprodutos WHERE id_tipo = 3 AND NOME = 'PRODUTO 3'");
        $query->execute();
        $retorno = $query->fetchAll();

        $this->assertTrue($cadastrarProduto[0]);
        $this->assertEquals('', $cadastrarProduto[1]);
        $this->assertEquals(1, count($retorno));
    }

    public function testBuscarProdutosPorPesquisa() : void
    {
        $this->criarDataTest();
        $pesquisa     = 'PRODUTO 1';
        $tiposProduto = null;

        $produtos = Produto::buscarProdutosPorPesquisa($pesquisa, $tiposProduto);

        $this->assertEquals('PRODUTO 1', $produtos[0]['nome']);
        $this->assertEquals('CAMINHO.PNG', $produtos[0]['imagem']);
        $this->assertEquals(1, $produtos[0]['id_tipo']);
        $this->assertEquals(1, count($produtos));
    }

    public function testBuscarProdutosPorPesquisaComTipo() : void
    {
        $this->criarDataTest();
        $pesquisa     = '';
        $tiposProduto = [2];

        $produtos = Produto::buscarProdutosPorPesquisa($pesquisa, $tiposProduto);

        $this->assertEquals('PRODUTO 2', $produtos[0]['nome']);
        $this->assertEquals('CAMINHO.PNG', $produtos[0]['imagem']);
        $this->assertEquals(2, $produtos[0]['id_tipo']);
        $this->assertEquals(1, count($produtos));
    }
}
