<?php

require_once __DIR__ . '/../Helper/RenderizadorDeHtmlHelper.php';

class NaoEncontradoController
{
    public static function exibirPagina() : void
    {
        echo RenderizadorDeHtmlHelper::renderizarHtml('404');
    }
}
