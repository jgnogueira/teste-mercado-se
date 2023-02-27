<!DOCTYPE html>
<html lang="pt-br">

<head>
   <?php require_once '_head.php' ?>
   <title>Mercado SoftExpert - Login</title>
</head>

<body>
   <?php require_once '_menu_superior.php' ?>
   <div class="osahan-breadcrumb">
      <div class="container">
         <div class="row">
            <div class="col-lg-12 col-md-12">
               <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/minha-conta"><i class="icofont icofont-ui-home"></i> Home</a></li>
                  <li class="breadcrumb-item active">Login</li>
               </ol>
            </div>
         </div>
      </div>
   </div>
   <section class="login_page">
      <div class="container">
         <div class="row">
            <div class="col-lg-6 col-md-6 mx-auto">
               <div class="widget">
                  <div class="login-modal-right">
                     <!-- Tab panes -->
                     <div class="tab-content">
                        <form>
                           <input type="hidden" id="apos-login" value="<?= $aposLogin ?>">
                           <div class="tab-pane active" id="login" role="tabpanel">
                              <h5 class="heading-design-h5">Entre em sua conta</h5>
                              <fieldset class="form-group position-relative">
                                 <label for="email">E-mail</label>
                                 <input type="email" class="form-control" id="email" name="email" placeholder="usuario@mercadosoftexpert.com.br" title="Preencha este campo">
                                 <span style="position: absolute; right: 10px; top: 38px;" class="icofont" id="icone-feedback-email"></span>
                                 <div class="invalid-feedback" id="feedback-email" style="font-size: 12px;">

                                 </div>
                              </fieldset>
                              <fieldset class="form-group position-relative">
                                 <label for="senha">Senha</label>
                                 <input type="password" class="form-control" id="senha" name="senha" placeholder="********" title="Preencha este campo">
                                 <span style="position: absolute; right: 10px; top: 38px;" class="icofont" id="icone-feedback-senha"></span>
                                 <div class="invalid-feedback" id="feedback-senha" style="font-size: 12px;">

                                 </div>
                              </fieldset>
                              <fieldset class="form-group">
                                 <button type="button" class="btn btn-lg btn-theme-round btn-block" id="btn-login" style="cursor: pointer;">Entrar</button>
                              </fieldset>
                              <div class="login-with-sites text-center">
                                 <p>Esqueceu sua senha? <a href="/recuperar-senha">Clique aqui</a></p>
                              </div>
                           </div>
                        </form>
                     </div>
                     <div class="clearfix"></div>
                     <div class="text-center login-footer-tab">
                        <ul class="nav nav-tabs" role="tablist">
                           <li class="nav-item">
                              <a class="nav-link active"><i class="icofont icofont-login"></i> LOGIN</a>
                           </li>
                           <li class="nav-item">
                              <a class="nav-link" href="/cadastro"><i class="icofont icofont-pencil-alt-5"></i> CADASTRO</a>
                           </li>
                        </ul>
                     </div>
                     <div class="clearfix"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
   <footer>
      <?php require_once '_footer.php' ?>
   </footer>
   <?php require_once '_scripts.php' ?>
   <script src="assets/js/login.js"></script>
   <script>
      $(document).ready(function() {
         $('#link-ajuda').attr('href', 'assets/help/GAMEPASS - Ajuda.pdf#page=4');
         if ($('#token-validacao-email').length) {
            var tokenValido = $('#token-validacao-email').val();
            if (tokenValido) {
               Swal.fire({
                  icon: 'success',
                  title: 'ENDEREÇO DE E-MAIL VALIDADO COM SUCESSO!',
                  text: '',
                  width: 780,
                  allowOutsideClick: false,
                  showCancelButton: false
               })
            } else {
               Swal.fire({
                  icon: 'error',
                  title: 'NÃO FOI POSSÍVEL VALIDAR O ENDEREÇO DE E-MAIL!',
                  text: '',
                  width: 840,
                  allowOutsideClick: false,
                  showCancelButton: false
               })
            }
         }
      });
   </script>
</body>

</html>