<?php

require_once __DIR__ . '/../routes/rotas.php';

$url  = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : '/login';
$host = $_SERVER['HTTP_HOST'];

switch ($host) {
    case 'localhost:8080':
        if (array_key_exists($url, $rotas)) {
            try {
                session_start();

                $parametroAcao    = filter_has_var(INPUT_GET, 'acao')    ? filter_input(INPUT_GET, 'acao',    FILTER_VALIDATE_INT) : 0;
                $parametroProduto = filter_has_var(INPUT_GET, 'produto') ? filter_input(INPUT_GET, 'produto', FILTER_VALIDATE_INT) : 0;
                $parametroUsuario = filter_has_var(INPUT_GET, 'usuario') ? filter_input(INPUT_GET, 'usuario', FILTER_VALIDATE_INT) : 0;

                if ($parametroAcao !== 0 && $parametroProduto !== 0 && $parametroUsuario !== 0 && ($parametroAcao === 1 || $parametroAcao === 2) && $url === '/login') {
                    $_SESSION['tentativa_acao']            = $parametroAcao;
                    $_SESSION['tentativa_produto']         = $parametroProduto;
                    $_SESSION['tentativa_usuario_produto'] = $parametroUsuario;

                    header('location: http://localhost:8080/login');
                    exit();
                }

                $informacoesController = explode('@', $rotas[$url]);
                $classeController = $informacoesController[0];
                $metodoController = $informacoesController[1];
        
                if (array_key_exists(2, $informacoesController)) {
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
        break;
    case 'admin.localhost:8080':
        if (array_key_exists($url, $rotasAdmin)) {
            try {
                session_start();

                if (filter_has_var(INPUT_GET, 'modo_exibicao') && ($_GET['modo_exibicao'] === 'light' || $_GET['modo_exibicao'] === 'dark')) {
                    $_SESSION['modo_exibicao'] = $_GET['modo_exibicao'];

                    header('location: http://admin.localhost:8080' . $url);
                    exit();
                }
                
                $informacoesController = explode('@', $rotasAdmin[$url]);
                $classeController = $informacoesController[0];
                $metodoController = $informacoesController[1];
        
                if (array_key_exists(2, $informacoesController)) {
                    if (!isset($_SESSION['usuario_logado_admin'])) {
                        header('location:  http://admin.localhost:8080/login');
                        exit();
                    }
                }
        
                require_once __DIR__ . '/../src/admin/Controller/' . $classeController . '.php';
        
                $classeController::$metodoController();
            } catch (Exception $ex) {
                echo $ex->getMessage();
            }
        } else {
            header('location: http://admin.localhost:8080/404');
        }
        break;
    default:
        break;
}