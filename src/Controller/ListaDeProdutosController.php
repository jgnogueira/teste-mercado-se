<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';
//require_once __DIR__ . '/../Models/Produto.php';

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

        /*if (isset($_SESSION['usuario_logado'])) {
            $plataformas     = self::gerarParametrosUrlPlataformas(Plataforma::buscarPlataformasPorPesquisaLogado($parametroPesquisa, $parametrosDesenvolvedoras, $parametrosGeneros, $parametrosEstados, $parametrosNegociacoes), $parametrosPlataformas);
            $desenvolvedoras = self::gerarParametrosUrlDesenvolvedoras(Desenvolvedora::buscarDesenvolvedorasPorPesquisaLogado($parametroPesquisa, $parametrosPlataformas, $parametrosGeneros, $parametrosEstados, $parametrosNegociacoes), $parametrosDesenvolvedoras);
            $generos         = self::gerarParametrosUrlGeneros(Genero::buscarGenerosPorPesquisaLogado($parametroPesquisa, $parametrosPlataformas, $parametrosDesenvolvedoras, $parametrosEstados, $parametrosNegociacoes), $parametrosGeneros);
            $estados         = self::gerarParametrosUrlEstados(Produto::buscarEstadosPorPesquisaLogado($parametroPesquisa, $parametrosPlataformas, $parametrosDesenvolvedoras, $parametrosGeneros, $parametrosNegociacoes), $parametrosEstados);
            $negociacoes     = self::gerarParametrosUrlNegociacoes(Produto::buscarNegociacoesPorPesquisaLogado($parametroPesquisa, $parametrosPlataformas, $parametrosDesenvolvedoras, $parametrosGeneros, $parametrosEstados), $parametrosNegociacoes);
        } else {
            $plataformas     = self::gerarParametrosUrlPlataformas(Plataforma::buscarPlataformasPorPesquisa($parametroPesquisa, $parametrosDesenvolvedoras, $parametrosGeneros), $parametrosPlataformas);
            $desenvolvedoras = self::gerarParametrosUrlDesenvolvedoras(Desenvolvedora::buscarDesenvolvedorasPorPesquisa($parametroPesquisa, $parametrosPlataformas, $parametrosGeneros), $parametrosDesenvolvedoras);
            $generos         = self::gerarParametrosUrlGeneros(Genero::buscarGenerosPorPesquisa($parametroPesquisa, $parametrosPlataformas, $parametrosDesenvolvedoras), $parametrosGeneros);
            $estados         = [];
            $negociacoes     = [];
        }*/
        
        /*if (isset($_SESSION['usuario_logado'])) {
            $produtos      = self::verificarAvisoProduto(self::verificarNegociacaoProduto(self::verificarProdutoListaDeDesejos(Produto::buscarProdutosPorPesquisaLogado($parametroPesquisa, $colunaOrdenacao, $parametrosPlataformas, $parametrosDesenvolvedoras, $parametrosGeneros, $inicioPesquisa, $quantidadeDeProdutosPorPagina, $parametrosEstados, $parametrosNegociacoes))));
            $totalProdutos = Produto::buscarTotalProdutosPorPesquisaLogado($parametroPesquisa, $parametrosPlataformas, $parametrosDesenvolvedoras, $parametrosGeneros, $parametrosEstados, $parametrosNegociacoes);
        } else {
            $produtos      = Produto::buscarProdutosPorPesquisa($parametroPesquisa, $colunaOrdenacao, $parametrosPlataformas, $parametrosDesenvolvedoras, $parametrosGeneros, $inicioPesquisa, $quantidadeDeProdutosPorPagina);
            $totalProdutos = Produto::buscarTotalProdutosPorPesquisa($parametroPesquisa, $parametrosPlataformas, $parametrosDesenvolvedoras, $parametrosGeneros);
        }*/

        $produtos = [];
        $tipos    = [];
        
        echo RenderizadorDeHtmlHelper::renderizarHtml('lista-de-produtos',
                                                                        [
                                                                            'pesquisa' => $parametroPesquisa,
                                                                            'produtos' => $produtos,
                                                                            'tipos'    => $tipos,
                                                                        ]);
    }

    private static function gerarParametrosUrlDesenvolvedoras(array $desenvolvedoras, ?array $parametrosDesenvolvedoras) : array
    {
        foreach ($desenvolvedoras as $chave => &$desenvolvedora) {
            $desenvolvedora['selecionado'] = '';

            $urlAtual      = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            $parametrosUrl = parse_url($urlAtual, PHP_URL_QUERY);

            parse_str($parametrosUrl, $parametrosUrl);

            if (array_key_exists('pagina', $parametrosUrl)) {
                unset($parametrosUrl['pagina']);
            }

            $parametrosUrl['desenvolvedora['. $chave. ']'] = $desenvolvedora['id'];

            $desenvolvedora['url'] = preg_replace('/%5B[0-9]+%5D/', '[]', http_build_query($parametrosUrl));
        }

        if (isset($parametrosDesenvolvedoras)) {
            foreach ($desenvolvedoras as &$desenvolvedora) {
                if (in_array($desenvolvedora['id'], $parametrosDesenvolvedoras)) {
                    $desenvolvedora['selecionado'] = 'checked';

                    $urlAtual      = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
                    $parametrosUrl = parse_url($urlAtual, PHP_URL_QUERY);

                    parse_str($parametrosUrl, $parametrosUrl);

                    if (array_key_exists('pagina', $parametrosUrl)) {
                        unset($parametrosUrl['pagina']);
                    }

                    if (($chave = array_search($desenvolvedora['id'], $parametrosUrl['desenvolvedora'])) !== false) {
                        unset($parametrosUrl['desenvolvedora'][$chave]);
                    }
                    
                    $desenvolvedora['url'] = preg_replace('/%5B[0-9]+%5D/', '[]', http_build_query($parametrosUrl));
                }
            }
        }

        return $desenvolvedoras;
    }
}
