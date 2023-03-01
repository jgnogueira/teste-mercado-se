<?php

require_once __DIR__ . '/../../src/Helper/ConexaoHelper.php';
require_once __DIR__ . '/../../src/Model/Venda.php';

use PHPUnit\Framework\TestCase;

class VendaTest extends TestCase
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

        // Criando Usuários
        $database->prepare("INSERT INTO tbusuarios (id, nome , senha, email, administrador)  VALUES (1, 'USUARIO', '1234', 'USUARIO@EMAIL.COM', FALSE);")->execute();

        // Criando Tipos dos Produtos
        $database->prepare("INSERT INTO tbtipos_produto (id, nome) VALUES (1, 'BEBIDA');")->execute();

        // Criando Impostos para Tipos de Produtos
        $database->prepare("INSERT INTO tbimposto_tipos_produto (id, id_tipo, porcentagem_imposto) VALUES (1, 1, 10);")->execute();

        // Criando Produtos
        $database->prepare("INSERT INTO tbprodutos (id, id_tipo , nome, imagem, valor)  VALUES (1, 1, 'PRODUTO 1', 'CAMINHO.PNG', 10);")->execute();
        $database->prepare("INSERT INTO tbprodutos (id, id_tipo , nome, imagem, valor)  VALUES (2, 1, 'PRODUTO 2', 'CAMINHO.PNG', 10);")->execute();

        // Criando Produtos no Carrinho
        $database->prepare("INSERT INTO tbcarrinho (id, id_produto , id_usuario, quantidade) VALUES (1, 1, 1, 1);")->execute();
        $database->prepare("INSERT INTO tbcarrinho (id, id_produto , id_usuario, quantidade) VALUES (2, 2, 1, 1);")->execute();
    }

    public function criarSessionTest(int $idUsuario = 1) : void
    {
        $_SESSION['id_usuario'] = $idUsuario;
    }

    public function testFinalizarCompraQuandoNaoHaProdutosNoCarrinho() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest(2);

        $finalizarCompra = Venda::finalizarCompra();

        $this->assertFalse($finalizarCompra);
    }

    public function testFinalizarCompra() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();
        $database = ConexaoHelper::retornarConexao();

        $finalizarCompra = Venda::finalizarCompra();
        $query = $database->prepare("SELECT * FROM tbvendas WHERE id_usuario = 1");
        $query->execute();
        $venda = $query->fetch();

        $vendaId = $venda['id'];
        $query   = $database->prepare("SELECT * FROM tbdados_vendas WHERE id_venda = $vendaId");
        $query->execute();
        $dadosVenda = $query->fetchAll();

        $query = $database->prepare("SELECT * FROM tbcarrinho WHERE id_usuario = 1");
        $query->execute();
        $produtosCarrinho = $query->fetchAll();

        $this->assertTrue($finalizarCompra);
        $this->assertIsArray($venda);
        $this->assertEquals(2, count($dadosVenda));
        $this->assertEquals(0, count($produtosCarrinho));
    }
}
