$('#btn-enviar-mensagem').on('click', function () {
    var interesse         = $(this).data('interesse');
    var usuarioSecundario = $(this).data('usuario-secundario');
    var mensagem          = $('#mensagem').val();
    var mensagem          = mensagem.toString();
    var mensagem          = mensagem.trim();

    if (mensagem === '') {
        $('#mensagem').focus();
        Swal.fire({
            icon: 'warning',
            title: 'MENSAGEM DEVE SER INFORMADA!',
            width: 630,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return;
            }
        })
    } else if (mensagem.length > 200) {
        $('#mensagem').focus();
        Swal.fire({
            icon: 'warning',
            title: 'MENSAGEM DEVE TER NO MÁXIMO 200 CARACTERES!',
            width: 850,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                return;
            }
        })
    } else {
        adicionarMensagemChat(mensagem, interesse, usuarioSecundario);
    }
});

function adicionarMensagemChat(mensagem, interesse, usuarioSecundario) {
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
        'interesse': interesse,
        'usuario-secundario': usuarioSecundario,
        'mensagem': mensagem
    };

    $.ajax({
        url: '/cadastrar-mensagem-usuario',
        type: 'POST',
        dataType: 'json',
        data: data
    }).done(function (data) {
        if (data.sucesso) {
            var possuiMensagemHoje = $('#possui-mensagem-hoje').val();

            if (!$('#conteudo-chat div').length || possuiMensagemHoje === 'N') {
                $('#possui-mensagem-hoje').val('S');
                $('#conteudo-chat').append('<div class="media media-meta-day">Hoje</div>');
            }
        
            var horaMinuto = retornarHoraMinuto();
            var divChat = '<div class="media media-chat media-chat-reverse" style="margin-bottom: -30px;">';
            var divChat = divChat + '<div class="media-body">';
            var divChat = divChat + '<p>' + mensagem + '</p>';
            var divChat = divChat + '<p class="meta" style="color: #9b9b9b;"><time datetime="2021">' + horaMinuto + '</time></p></div></div>';
        
            $('#conteudo-chat').append(divChat);
            $('#mensagem').val('');
            $('#mensagem').focus();
            $('#conteudo-chat').scrollTop($('#conteudo-chat')[0].scrollHeight);
        } else {
            console.log(data.erro);
            console.log(data.log);
            Toast.fire({
                icon: 'error',
                title: 'NÃO FOI POSSÍVEL ENVIAR SUA MENSAGEM!'
            })
        }
    }).fail(function () {
        Toast.fire({
            icon: 'error',
            title: 'NÃO FOI POSSÍVEL ENVIAR SUA MENSAGEM!'
        })
    })
}

function retornarHoraMinuto() {
    var arrayMeses = ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Maio', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'];
    var dataAtual  = new Date();
    var horaMinuto = dataAtual.getDate() + ' de ' + arrayMeses[dataAtual.getMonth()] + ' de ' + dataAtual.getFullYear() + ' ' + dataAtual.getHours() + ':' + (dataAtual.getMinutes() < 10 ? 0 : '') + dataAtual.getMinutes();

    return horaMinuto;
}

function buscarNovasMensagens(interesse) {
    var data = {
        interesse: interesse
    };

    $.ajax({
        url: '/buscar-novas-mensagens-usuario',
        type: 'POST',
        dataType: 'json',
        data: data
    }).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            var possuiMensagemHoje = $('#possui-mensagem-hoje').val();

            if (!$('#conteudo-chat div').length || possuiMensagemHoje === 'N') {
                $('#possui-mensagem-hoje').val('S');
                $('#conteudo-chat').append('<div class="media media-meta-day">Hoje</div>');
            }
        
            var divChat = '<div class="media media-chat" style="margin-bottom: -30px;">';
            var divChat = divChat + '<div class="media-body">';
            var divChat = divChat + '<p>' + data[i]['mensagem'] + '</p>';
            var divChat = divChat + '<p class="meta"><time datetime="2021">' + data[i]['data_envio'] + '</time></p></div></div>';
        
            $('#conteudo-chat').append(divChat);
            $('#conteudo-chat').scrollTop($('#conteudo-chat')[0].scrollHeight);
        }
    })
}

$('#mensagem').keydown(function(e) {
    if(e.which === 13) {
        e.preventDefault();
        $('#btn-enviar-mensagem').click();
    }
});
