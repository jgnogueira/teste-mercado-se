<?php

class LogoutController
{
    public static function realizarLogout() : void
    {
        $_SESSION = [];
        session_destroy();
        header('location: /login');
    }
}
