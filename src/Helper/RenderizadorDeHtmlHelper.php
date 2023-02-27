<?php

class RenderizadorDeHtmlHelper
{
    public static function renderizarHtml(string $nomeArquivo, array $dados = []) : string
    {
        extract($dados);
        ob_start();
        require __DIR__ . '/../../view/' . $nomeArquivo . '.php';
        $html = ob_get_clean();

        return $html;
    }
}
