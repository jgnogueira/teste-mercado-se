<?php

require_once __DIR__ . '/../../src/Helper/ConexaoHelper.php';
require_once __DIR__ . '/../../src/Model/Carrinho.php';

use PHPUnit\Framework\TestCase;

class CarrinhoTest extends TestCase
{
    public function setUp() : void
    {
        parent::setUp();

        $database = ConexaoHelper::retornarConexao();
        $database->prepare('DELETE FROM tbcarrinho')->execute();
        $database->prepare('DELETE FROM tbprodutos')->execute();
        $database->prepare('DELETE FROM tbusuarios')->execute();
        $database->prepare('DELETE FROM tbtipos_produto')->execute();
    }

    public function criarDataTest() : void
    {
        $database = ConexaoHelper::retornarConexao();

        // Criando Uusários
        $database->prepare("INSERT INTO tbusuarios (id, nome , senha, email, administrador)  VALUES (1, 'USUARIO', '1234', 'USUARIO@EMAIL.COM', FALSE);")->execute();

        // Criando Tipos dos Produtos
        $database->prepare("INSERT INTO tbtipos_produto (id, nome) VALUES (1, 'BEBIDA');")->execute();

        // Criando Produtos
        $database->prepare("INSERT INTO tbprodutos (id, id_tipo , nome, imagem, valor)  VALUES (1, 1, 'PRODUTO', 'CAMINHO.PNG', 10);")->execute();
        $database->prepare("INSERT INTO tbprodutos (id, id_tipo , nome, imagem, valor)  VALUES (2, 1, 'PRODUTO', 'CAMINHO.PNG', 10);")->execute();

        // Criando Produtos no Carrinho
        $database->prepare("INSERT INTO tbcarrinho (id, id_produto , id_usuario, quantidade) VALUES (1, 1, 1, 1);")->execute();
    }

    public function criarSessionTest() : void
    {
        $_SESSION['id_usuario'] = 1;
    }

    public function testAdicionarProdutoQuandoProdutoJaExiste() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();
        $idProduto = 1;

        $produtoAdicionado = Carrinho::adicionarProduto($idProduto);

        $this->assertFalse($produtoAdicionado);
    }

    public function testAdicionarProdutoQuandoProdutoNaoExiste() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();
        $database  = ConexaoHelper::retornarConexao();
        $idProduto = 2;

        $produtoAdicionado = Carrinho::adicionarProduto($idProduto);
        $query = $database->prepare("SELECT * FROM tbcarrinho WHERE id_usuario = 1 AND id_produto = $idProduto");
        $query->execute();
        $retorno = $query->fetch();

        $this->assertTrue($produtoAdicionado);
        $this->assertEquals(1, $retorno['id_usuario']);
        $this->assertEquals(2, $retorno['id_produto']);
    }

    public function testVerificarExisteProdutoQuandoProdutoNaoExiste() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();
        $idProduto = 9;

        $existeProduto = Carrinho::verificarExisteProduto($idProduto);

        $this->assertFalse($existeProduto);
    }

    public function testVerificarExisteProdutoQuandoProdutoExiste() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();
        $idProduto = 1;

        $existeProduto = Carrinho::verificarExisteProduto($idProduto);

        $this->assertTrue($existeProduto);
    }

    public function testBuscarProdutos() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();

        $produtos = Carrinho::buscarProdutos();

        $this->assertEquals(1, count($produtos));
    }

    public function testRemoverProduto() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();
        $database   = ConexaoHelper::retornarConexao();
        $idCarrinho = 1;

        $removerProduto = Carrinho::removerProduto($idCarrinho);
        $query = $database->prepare("SELECT * FROM tbcarrinho WHERE id = $idCarrinho AND id_usuario = 1");
        $query->execute();
        $retorno = $query->fetch();

        $this->assertTrue($removerProduto);
        $this->assertFalse($retorno);
    }

    public function testAtualizarQuantidadeProduto() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();
        $database   = ConexaoHelper::retornarConexao();
        $idCarrinho = 1;
        $quantidade = 5;

        $atualizarQuantidade = Carrinho::atualizarQuantidadeProduto($idCarrinho, $quantidade);
        $query = $database->prepare("SELECT * FROM tbcarrinho WHERE id = $idCarrinho AND id_usuario = 1");
        $query->execute();
        $retorno = $query->fetch();

        $this->assertTrue($atualizarQuantidade);
        $this->assertEquals(5, $retorno['quantidade']);
    }

    public function testLimparCarrinho() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();
        $database = ConexaoHelper::retornarConexao();

        Carrinho::limparCarrinho();
        $query = $database->prepare("SELECT * FROM tbcarrinho WHERE id_usuario = 1");
        $query->execute();
        $retorno = $query->fetch();

        $this->assertFalse($retorno);
    }
}
