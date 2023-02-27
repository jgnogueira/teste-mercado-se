$('.btn-desejo').on('click', function () {
    var possuiEndereco = $('#possui-endereco').val();

    if (possuiEndereco === 'N') {
        Swal.fire({
            icon: 'warning',
            title: 'ATUALIZAÇÃO DE ENDEREÇO NECESSÁRIA!',
            footer: '<a href="/meu-endereco">Atualizar Endereço</a>',
            width: 700,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else {
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
            url: '/adicionar-lista-de-desejos-usuario',
            type: 'POST',
            dataType: 'json',
            data: data
        }).done(function (data) {
            if (data.sucesso) {
                $('#icone-desejo-' + produto).addClass('text-danger');
                $('#btn-desejo-' + produto).prop('disabled', true);
                $('#btn-desejo-' + produto).css('cursor', 'not-allowed');

                Toast.fire({
                    icon: 'success',
                    title: 'PRODUTO ADICIONADO EM SUA LISTA DE DESEJOS!'
                })
            } else {
                console.log(data.log);
                Toast.fire({
                    icon: 'error',
                    title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SUA LISTA DE DESEJOS!'
                })
            }
        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SUA LISTA DE DESEJOS!'
            })
        })
    }
});

$('.btn-interesse').on('click', function () {
    var possuiEndereco = $('#possui-endereco').val();

    if (possuiEndereco === 'N') {
        Swal.fire({
            icon: 'warning',
            title: 'ATUALIZAÇÃO DE ENDEREÇO NECESSÁRIA!',
            footer: '<a href="/meu-endereco">Atualizar Endereço</a>',
            width: 700,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else {
        var produto    = $(this).data('id');
        var usuario    = $(this).data('usuario');
        var negociacao = $(this).data('tipo-negociacao');

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
            'produto': produto,
            'usuario-secundario': usuario,
            'tipo-negociacao': negociacao
        }

        $.ajax({
            url: '/cadastrar-negociacao-usuario',
            type: 'POST',
            dataType: 'json',
            data: data
        }).done(function (data) {
            if (data.sucesso) {
                $('#btn-interesse-' + produto).prop('disabled', true);
                $('#btn-interesse-' + produto).css('cursor', 'not-allowed');
                Toast.fire({
                    icon: 'success',
                    title: 'PRODUTO ADICIONADO EM SUA LISTA DE NEGOCIAÇÕES!'
                })
            } else {
                console.log(data.log);
                Toast.fire({
                    icon: 'error',
                    title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SUA LISTA DE NEGOCIAÇÕES!'
                })
            }
        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'NÃO FOI POSSÍVEL ADICIONAR O PRODUTO EM SUA LISTA DE NEGOCIAÇÕES!'
            })
        })
    }
});

$('.btn-aviso').on('click', function () {
    var possuiEndereco = $('#possui-endereco').val();

    if (possuiEndereco === 'N') {
        Swal.fire({
            icon: 'warning',
            title: 'ATUALIZAÇÃO DE ENDEREÇO NECESSÁRIA!',
            footer: '<a href="/meu-endereco">Atualizar Endereço</a>',
            width: 700,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return false;
            }
        })
    } else {
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
            url: '/cadastrar-aviso-usuario',
            type: 'POST',
            dataType: 'json',
            data: data
        }).done(function (data) {
            if (data.sucesso) {
                $('#btn-aviso-' + produto).prop('disabled', true);
                $('#btn-aviso-' + produto).css('cursor', 'not-allowed');

                Toast.fire({
                    icon: 'success',
                    title: 'VOCÊ SERÁ NOTIFICADO VIA E-MAIL QUANDO O PRODUTO RETORNAR PARA A PLATAFORMA!'
                })
            } else {
                console.log(data.log);
                Toast.fire({
                    icon: 'error',
                    title: 'NÃO FOI POSSÍVEL GERAR A NOTIFICAÇÃO!'
                })
            }
        }).fail(function () {
            Toast.fire({
                icon: 'error',
                title: 'NÃO FOI POSSÍVEL GERAR A NOTIFICAÇÃO!'
            })
        })
    }
});