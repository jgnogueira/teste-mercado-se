<?php

require_once __DIR__ . '/../DAO/UsuarioDAO.php';
require_once __DIR__ . '/../Helper/ValidacaoHelper.php';

class Usuario 
{
    public static function criarConta(string $nome, string $email, string $senha) : array
    {
        if (!ValidacaoHelper::tamanho($nome, 3, 200)) {
            return [false, 'Nome deve possuir entre 3 e 200 caracteres'];
        }

        if (!ValidacaoHelper::email($email)) {
            return [false, 'E-mail inválido'];
        }

        if (!ValidacaoHelper::unico($email, 'tbusuarios', 'email')) {
            return [false, 'E-mail já cadastrado'];
        }

        if (!ValidacaoHelper::tamanho($senha, 8, 200)) {
            return [false, 'Senha deve possuir entre 8 e 200 caracteres'];
        }
        
        UsuarioDAO::criarConta($nome, $email, password_hash($senha, PASSWORD_DEFAULT));
        return [true, ''];
        
    }

    public static function realizarLogin(string $email, string $senha) : array
    {
        $usuario = UsuarioDAO::buscarInformacoesUsuario($email, 'email');

        if ($usuario === false) {
            return [false, 'E-mail ou senha inválida'];
        }

        if (!password_verify($senha, $usuario['senha'])) {
            return [false, 'E-mail ou senha inválida'];
        }

        $_SESSION['usuario_logado'] = true;
        $_SESSION['id_usuario']     = $usuario['id'];
        $_SESSION['nome_usuario']   = $usuario['nome'];

        UsuarioDAO::gravarDataUltimoAcesso($usuario['id']);
        return [true, ''];
    }

    public static function buscarInformacoesUsuario(?int $id = null) : array
    {
        $idUsuario = $id === null ? $_SESSION['id_usuario'] : $id;
        $usuario   = UsuarioDAO::buscarInformacoesUsuario($idUsuario);

        return $usuario;
    }
}
