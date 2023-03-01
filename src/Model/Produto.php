<?php

require_once __DIR__ . '/../DAO/ProdutoDAO.php';
require_once __DIR__ . '/../Helper/ValidacaoHelper.php';

class Produto 
{
    public static function cadastrarProduto(string $nome, string $valor, int $tipoProduto, bool $validarImagem = true) : array
    {
        if (!ValidacaoHelper::tamanho($nome, 3, 50)) {
            return [false, 'Nome deve possuir entre 3 e 50 caracteres'];
        }

        $valor = explode('R$ ', $valor);
        $valor = str_replace('.', '',  $valor[1]);
        $valor = str_replace(',', '.', $valor);

        if (!ValidacaoHelper::numeroFloat($valor)) {
            return [false, 'Valor inválido'];
        }

        $imagem = 'CAMINHO.PNG';

        if ($validarImagem) {
            if (!file_exists($_FILES['imagem']['tmp_name']) || !is_uploaded_file($_FILES['imagem']['tmp_name'])) {
                return [false, 'Imagem deve ser selecionada'];
            }
    
            if ($_FILES['imagem']['type'] !== 'image/png' && $_FILES['imagem']['type'] !== 'image/jpeg' && $_FILES['imagem']['type'] !== 'image/jpg') {
                return [false, 'Imagem com formato inválido. Formatos aceitos: JPG e PNG']; 
            }
    
            [$larguraArquivo, $alturaArquivo] = getimagesize($_FILES['imagem']['tmp_name']);
    
            if ($larguraArquivo !== 1000 || $alturaArquivo !== 1000) {
                return [false, 'Imagem com dimensões inválidas. Dimensões aceitas: 1000 x 1000 pixels'];
            }
    
            $imagem = explode('.', $_FILES['imagem']['name']);
            $imagem = md5($imagem[0]) . round(microtime(true)) . '.' . $imagem[1];
            $diretorioImagem = __DIR__ . '/../../public/assets/images/produtos/';
    
            if (!move_uploaded_file($_FILES['imagem']['tmp_name'], $diretorioImagem . $imagem)) {
                return [false, 'Não foi possível fazer o upload da imagem'];    
            }
        }

        ProdutoDAO::cadastrarProduto($nome, $valor, $imagem, $tipoProduto);
        return [true, ''];
    }

    public static function buscarProdutosPorPesquisa(string $pesquisa, ?array $tipos) : array
    {
        return ProdutoDAO::buscarProdutosPorPesquisa($pesquisa, $tipos);
    }
}
