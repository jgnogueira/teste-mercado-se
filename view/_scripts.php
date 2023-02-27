<!-- Bootstrap Core JavaScript -->
<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/popper.min.js"></script>
<script src="assets/plugins/tether/tether.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<!-- Custom js -->
<script src="assets/js/custom.js"></script>
<!-- Select2 -->
<script src="assets/plugins/select2/js/select2.min.js"></script>
<!-- Owl Carousel -->
<script src="assets/plugins/owl-carousel/owl.carousel.js"></script>
<!-- Jquery Mask -->
<script src="assets/plugins/jquery-mask/jquery.mask.js"></script>
<!-- SweetAlert -->
<script src="assets/plugins/sweetalert/sweetalert2.all.min.js"></script>
<!-- Geral -->
<script src="assets/js/geral.js"></script>
<?php if (isset($_SESSION['usuario_logado'])) { ?>
    <script>
        verificarNotificacoes('<?= isset($_SERVER['PATH_INFO']) && $_SERVER['PATH_INFO'] !== '/chat' ? 'S' : 'N'?>', <?= intval($_SESSION['verifica_chat']) ?>, <?= intval($_SESSION['verifica_avaliacao']) ?>);
    </script>
<?php } ?>