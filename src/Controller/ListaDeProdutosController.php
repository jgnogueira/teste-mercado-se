<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
require_once __DIR__ . '/../Model/Produto.php';
require_once __DIR__ . '/../Model/TipoProduto.php';

class ListaDeProdutosController
{
    public static function exibirPagina() : void
    {
        $parametroPesquisa     = filter_has_var(INPUT_GET, 'pesquisa') ? filter_input(INPUT_GET, 'pesquisa', FILTER_SANITIZE_STRING)                       : '';
        $parametrosTipoProduto = filter_has_var(INPUT_GET, 'tipo')     ? filter_input(INPUT_GET, 'tipo',     FILTER_VALIDATE_INT,    FILTER_REQUIRE_ARRAY) : null;

        if (isset($parametrosTipoProduto)) {
            $parametrosTipoProduto = array_filter($parametrosTipoProduto, function ($valor) {
                return $valor !== null && $valor !== false && $valor !== '';
            });
        }

        if (is_array($parametrosTipoProduto) && count($parametrosTipoProduto) === 0) {
            $parametrosTipoProduto = null;
        }

        $produtos = Produto::buscarProdutosPorPesquisa($parametroPesquisa, $parametrosTipoProduto);
        $tipos    = self::gerarParametrosUrlTipos(TipoProduto::buscarTiposPorPesquisa($parametroPesquisa), $parametrosTipoProduto);
        
        echo RenderizadorDeHtmlHelper::renderizarHtml('lista-de-produtos',
                                                                        [
                                                                            'pesquisa' => $parametroPesquisa,
                                                                            'produtos' => $produtos,
                                                                            'tipos'    => $tipos,
                                                                        ]);
    }

    private static function gerarParametrosUrlTipos(array $tipos, ?array $parametrosTipos) : array
    {
        foreach ($tipos as $chave => &$tipo) {
            $tipo['selecionado'] = '';

            $urlAtual      = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            $parametrosUrl = parse_url($urlAtual, PHP_URL_QUERY);

            parse_str($parametrosUrl, $parametrosUrl);

            if (array_key_exists('pagina', $parametrosUrl)) {
                unset($parametrosUrl['pagina']);
            }

            $parametrosUrl['tipo['. $chave. ']'] = $tipo['id'];

            $tipo['url'] = preg_replace('/%5B[0-9]+%5D/', '[]', http_build_query($parametrosUrl));
        }

        if (isset($parametrosTipos)) {
            foreach ($tipos as &$tipo) {
                if (in_array($tipo['id'], $parametrosTipos)) {
                    $tipo['selecionado'] = 'checked';

                    $urlAtual      = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
                    $parametrosUrl = parse_url($urlAtual, PHP_URL_QUERY);

                    parse_str($parametrosUrl, $parametrosUrl);

                    if (array_key_exists('pagina', $parametrosUrl)) {
                        unset($parametrosUrl['pagina']);
                    }

                    if (($chave = array_search($tipo['id'], $parametrosUrl['tipo'])) !== false) {
                        unset($parametrosUrl['tipo'][$chave]);
                    }
                    
                    $tipo['url'] = preg_replace('/%5B[0-9]+%5D/', '[]', http_build_query($parametrosUrl));
                }
            }
        }

        return $tipos;
    }
}
