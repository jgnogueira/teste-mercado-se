<?php

require_once __DIR__ . '/../routes/rotas.php';

$url = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/login';

if (array_key_exists($url, $rotas)) {
    try {
        session_start();

        $informacoesController = explode('@', $rotas[$url]);
        $classeController = $informacoesController[0];
        $metodoController = $informacoesController[1];
        $metodoRequisicao = $informacoesController[2];

        if ($_SERVER['REQUEST_METHOD'] !== $metodoRequisicao) {
            header('location: http://localhost:8080/404');
            exit();
        }

        if (array_key_exists(3, $informacoesController)) {
            if (!isset($_SESSION['usuario_logado'])) {
                header('location:  http://localhost:8080/login?apos-login=' . $url);
                exit();
            }
        }

        require_once __DIR__ . '/../src/Controller/' . $classeController . '.php';

        $classeController::$metodoController();
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
} else {
    header('location: http://localhost:8080/404');
}
