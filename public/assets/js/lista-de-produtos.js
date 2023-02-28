$('.btn-carrinho').on('click', function () {
    var produto = $(this).data('id');

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    var data = {
        produto: produto
    };

    $.ajax({
        url: '/adicionar-produto-carrinho',
        type: 'POST',
        dataType: 'json',
        data: data
    }).done(function (data) {
        if (data.sucesso) {
            $('#btn-carrinho-' + produto).prop('disabled', true);
            $('#btn-carrinho-' + produto).css('cursor', 'not-allowed');

            Toast.fire({
                icon: 'success',
                title: 'PRODUTO ADICIONADO EM SEU CARRINHO!'
            })
        } else {
            console.log(data.log);
            Toast.fire({
                icon: 'error',
                title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SEU CARRINHO!'
            })
        }
    }).fail(function () {
        Toast.fire({
            icon: 'error',
            title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SEU CARRINHO!'
        })
    })
});