<?php

require_once __DIR__ . '/../Model/Venda.php';

class VendasController
{
    public static function finalizarCompra() : void
    {
        try {
            $sucesso = Venda::finalizarCompra();
            echo json_encode(['sucesso' => $sucesso, 'erro' => '', 'log' => '']);
        } catch (Exception $ex) {
            echo json_encode(['sucesso' => false, 'erro' => 'Tente novamente', 'log' => $ex->getMessage()]);
        }
    }
}
