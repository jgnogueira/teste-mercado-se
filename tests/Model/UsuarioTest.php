<?php

require_once __DIR__ . '/../../src/Helper/ConexaoHelper.php';
require_once __DIR__ . '/../../src/Model/Usuario.php';

use PHPUnit\Framework\TestCase;

class UsuarioTest extends TestCase
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
        $database->prepare("INSERT INTO tbusuarios (id, nome , senha, email, administrador)  VALUES (1, 'USUARIO 1', '" . password_hash('0123456789', PASSWORD_DEFAULT) . "', 'USUARIO@EMAIL.COM', FALSE);")->execute();
    }

    public function criarSessionTest() : void
    {
        $_SESSION['id_usuario'] = 1;
    }

    public function testCriarContaQuandoNomePossuiMenosQue3Caracteres() : void
    {
        $this->criarDataTest();
        $nome  = 'AA';
        $email = 'USUARIO2@EMAIL.COM';
        $senha = '1234';

        $criarConta = Usuario::criarConta($nome, $email, $senha);

        $this->assertFalse($criarConta[0]);
        $this->assertEquals('Nome deve possuir entre 3 e 50 caracteres', $criarConta[1]);
    }

    public function testCriarContaQuandoNomePossuiMaisQue50Caracteres() : void
    {
        $this->criarDataTest();
        $nome  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
        $email = 'USUARIO2@EMAIL.COM';
        $senha = '1234';

        $criarConta = Usuario::criarConta($nome, $email, $senha);

        $this->assertFalse($criarConta[0]);
        $this->assertEquals('Nome deve possuir entre 3 e 50 caracteres', $criarConta[1]);
    }

    public function testCriarContaComEmailInvalido() : void
    {
        $this->criarDataTest();
        $nome  = 'USUARIO 2';
        $email = 'USUARIO@';
        $senha = '1234';

        $criarConta = Usuario::criarConta($nome, $email, $senha);

        $this->assertFalse($criarConta[0]);
        $this->assertEquals('E-mail inválido', $criarConta[1]);
    }

    public function testCriarContaComEmailJaCadastrado() : void
    {
        $this->criarDataTest();
        $nome  = 'USUARIO 2';
        $email = 'USUARIO@EMAIL.COM';
        $senha = '1234';

        $criarConta = Usuario::criarConta($nome, $email, $senha);

        $this->assertFalse($criarConta[0]);
        $this->assertEquals('E-mail já cadastrado', $criarConta[1]);
    }

    public function testCriarContaQuandoSenhaPossuiMenosQue8Caracteres() : void
    {
        $this->criarDataTest();
        $nome  = 'USUARIO 2';
        $email = 'USUARIO2@EMAIL.COM';
        $senha = '1234567';

        $criarConta = Usuario::criarConta($nome, $email, $senha);

        $this->assertFalse($criarConta[0]);
        $this->assertEquals('Senha deve possuir entre 8 e 200 caracteres', $criarConta[1]);
    }

    public function testCriarContaQuandoSenhaPossuiMaisQue200Caracteres() : void
    {
        $this->criarDataTest();
        $nome  = 'USUARIO 2';
        $email = 'USUARIO2@EMAIL.COM';
        $senha = '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';

        $criarConta = Usuario::criarConta($nome, $email, $senha);

        $this->assertFalse($criarConta[0]);
        $this->assertEquals('Senha deve possuir entre 8 e 200 caracteres', $criarConta[1]);
    }

    public function testCriarConta() : void
    {
        $this->criarDataTest();
        $nome     = 'USUARIO 2';
        $email    = 'USUARIO2@EMAIL.COM';
        $senha    = '0123456789';
        $database = ConexaoHelper::retornarConexao();

        $criarConta = Usuario::criarConta($nome, $email, $senha);
        $query = $database->prepare("SELECT * FROM tbusuarios WHERE email = 'USUARIO2@EMAIL.COM'");
        $query->execute();
        $retorno = $query->fetchAll();

        $this->assertTrue($criarConta[0]);
        $this->assertEquals('', $criarConta[1]);
        $this->assertEquals(1, count($retorno));
    }

    public function testRealizarLoginComEmailInvalido() : void
    {
        $this->criarDataTest();
        $email = 'USUARIO2@EMAIL.COM';
        $senha = '0123456789';

        $login = Usuario::realizarLogin($email, $senha);

        $this->assertFalse($login[0]);
        $this->assertEquals('E-mail ou senha inválida', $login[1]);
    }

    public function testRealizarLoginComSenhaInvalida() : void
    {
        $this->criarDataTest();
        $email = 'USUARIO@EMAIL.COM';
        $senha = '012345';

        $login = Usuario::realizarLogin($email, $senha);

        $this->assertFalse($login[0]);
        $this->assertEquals('E-mail ou senha inválida', $login[1]);
    }

    public function testRealizarLogin() : void
    {
        $this->criarDataTest();
        $email = 'USUARIO@EMAIL.COM';
        $senha = '0123456789';

        $login = Usuario::realizarLogin($email, $senha);

        $this->assertTrue($login[0]);
        $this->assertEquals('', $login[1]);
    }

    public function testBuscarInformacoesUsuario() : void
    {
        $this->criarDataTest();
        $this->criarSessionTest();

        $usuario = Usuario::buscarInformacoesUsuario();

        $this->assertEquals('USUARIO 1', $usuario['nome']);
        $this->assertEquals('USUARIO@EMAIL.COM', $usuario['email']);
    }
}
