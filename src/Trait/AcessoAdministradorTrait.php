<?php

trait AcessoAdministrador
{
    public static function permitirAcessoAdministrador() : void
    {
        if (!$_SESSION['usuario_administrador']) {
            header('location: http://localhost:8080/404');
            exit();
        }
    }
}
