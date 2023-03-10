<?php

class ConexaoHelper
{
    private static bool $ambienteTeste  = false;
    private static ?PDO $conexao        = null;
    private static string $host         = 'localhost';
    private static string $usuario      = 'postgres';
    private static string $senha        = 'rootlocaldb';
    private static string $database     = 'mercado';
    private static string $testDatabase = 'test_mercado';
    private static int $port            = 5432;

    private static function realizarConexao() : PDO
    {
        $database = self::$ambienteTeste ? self::$testDatabase : self::$database;

        if (self::$conexao === null) {
            self::$conexao = new PDO('pgsql:host=' . self::$host . ';port=' . self::$port . ';dbname=' . $database, self::$usuario, self::$senha);
            self::$conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            self::$conexao->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }

        return self::$conexao;
    }

    public static function retornarConexao() : PDO
    {
        return self::realizarConexao();
    }
}
