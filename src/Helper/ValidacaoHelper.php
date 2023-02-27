<?php

require_once __DIR__ . '/ConexaoHelper.php';

class ValidacaoHelper
{
    public static function tamanho(string $valor, int $tamanhoMinimo, int $tamanhoMaximo) : bool
    {
        if ($tamanhoMinimo === $tamanhoMaximo) {
            return mb_strlen($valor) === $tamanhoMinimo ? true : false;
        }

        return mb_strlen($valor) >= $tamanhoMinimo && mb_strlen($valor) <= $tamanhoMaximo ? true : false;
    }

    public static function email(string $email) : bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function cpf(string $cpf) : bool
    {
        $cpf = preg_replace( '/[^0-9]/is', '', $cpf );
        
        if (strlen($cpf) != 11) {
            return false;
        }

        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

       for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                return false;
            }
        }

        return true;
    }

    public static function unico(string $valor, string $tabela, string $coluna) : bool
    {
        $conexao = ConexaoHelper::retornarConexao();
        $query   = $conexao->prepare("SELECT count(1) quantidade FROM $tabela WHERE UPPER($coluna) = UPPER(:valor)");
        $query->execute([':valor' => $valor]);

        $resultado = $query->fetch();

        return intval($resultado['quantidade']) === 0 ? true : false;
    }

    public static function celular(string $celular) : bool
    {
        return preg_match("/\(\d{2}\)?\s?\d{5}\-?\d{4}/", $celular);
    }

    public static function numeroInteiro(int $valor) : bool
    {
        return filter_var($valor, FILTER_VALIDATE_INT);
    }

    public static function numeroFloat(float $valor) : bool
    {
        return filter_var($valor, FILTER_VALIDATE_FLOAT);
    }
}