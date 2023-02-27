<?php

require_once __DIR__ . '/../Helper/ConexaoHelper.php';

class UsuarioDAO 
{
    public static function criarConta(string $nome, string $email, string $senha) : void
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("INSERT INTO tbusuarios (nome, email, senha) VALUES (:nome, :email, :senha) ");

        $query->execute([':nome' => $nome, ':email' => $email, ':senha' => $senha]);
    }

    public static function buscarInformacoesUsuario(string|int $valor, string $coluna = 'id') : array|bool
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("SELECT * FROM tbusuarios WHERE UPPER($coluna) = UPPER(:valor) AND situacao = 'A'");
        $query->execute([':valor' => $valor]);

        return $query->fetch();
    }

    public static function gravarDataUltimoAcesso(int $idUsuario) : void
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("UPDATE tbusuarios SET data_ultimo_acesso = CURRENT_TIMESTAMP WHERE id = :id AND situacao = 'A'");

        $query->execute([':id' => $idUsuario]);
    }
}
