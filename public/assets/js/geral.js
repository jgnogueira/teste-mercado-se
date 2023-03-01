$('#btn-pesquisar').on('click', function () {
    var pesquisa = $('#pesquisa').val();

    if (pesquisa === '') {
        window.location = '/lista-de-produtos';
    } else {
        $('#form-pesquisa').submit();
    }
});