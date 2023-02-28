<!DOCTYPE html>
<html lang="pt-br">

<head>
   <?php require_once '_head.php' ?>
   <title>Mercado SoftExpert - 404</title>
</head>

<body class="error-page-main">
   <canvas></canvas>
   <section class="error-page-main-inner">
      <div class="container">
         <div class="row">
            <div class="col-lg-12 col-md-12 block-404 text-center">
               <h1><img src="assets/images/404.png" alt="404"></h1>
               <h2>Página não encontrada!</h2>
               <h4>Infelizmente a página que você procura não está disponível.</h4>
               <div class="center-holder">
                  <a href="/lista-de-produtos" class="btn btn-secondary btn-lg"><i class="icofont icofont-login"></i> IR PARA LISTA DE PRODUTOS</a>
               </div>
            </div>
         </div>
      </div>
   </section>
   <script>
      var canvas = document.querySelector("canvas");
      var c = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      var mouse = {
         x: canvas.width / 2,
         y: canvas.height / 2
      }

      window.addEventListener("resize", function() {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      });

      window.addEventListener("mousemove", function(e) {
         mouse.x = e.clientX;
         mouse.y = e.clientY;
      });

      var colors = [{
            r: 255,
            g: 71,
            b: 71
         },
         {
            r: 0,
            g: 206,
            b: 237
         },
         {
            r: 255,
            g: 255,
            b: 255
         }
      ];

      function Particle(x, y, dx, dy, r, ttl) {
         this.x = x;
         this.y = y;
         this.dx = dx;
         this.dy = dy;
         this.r = r;
         this.opacity = 1;
         this.shouldRemove = false;
         this.timeToLive = ttl;
         this.randomColor = Math.floor(Math.random() * colors.length);


         this.update = function() {
            this.x += this.dx;
            this.y += this.dy;
            if (this.x + this.r >= canvas.width || this.x - this.r <= 0) {
               this.dx = -this.dx;
            };

            if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
               this.dy = -this.dy;
            };

            // Ensure that particles cannot be spawned past canvas boundaries
            this.x = Math.min(Math.max(this.x, 0 + this.r), canvas.width - this.r);
            this.y = Math.min(Math.max(this.y, 0 + this.r), canvas.height - this.r);

            c.beginPath();
            c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            // c.strokeStyle = 'rgba(0, 0, 0,' + this.opacity + ')';
            c.strokeStyle = 'rgba(' + colors[this.randomColor].r + ',' + colors[this.randomColor].g + ',' + colors[this.randomColor].b + ',' + this.opacity + ')';
            c.fillStyle = 'rgba(' + colors[this.randomColor].r + ',' + colors[this.randomColor].g + ',' + colors[this.randomColor].b + ',' + this.opacity + ')';
            // c.fill();
            c.stroke();
            c.closePath();

            this.opacity -= 1 / (ttl / 0.1);
            this.r -= r / (ttl / 0.1);
            this.timeToLive -= 0.1;
         }

         this.remove = function() {
            // If timeToLive expires, return a true value.
            // This signifies that the particle should be removed from the scene.
            return this.timeToLive <= 0;
         }
      }

      function Explosion(x, y) {
         this.particles = [];

         this.init = function() {
            for (var i = 1; i <= 1; i++) {
               var randomVelocity = {
                  x: (Math.random() - 0.5) * 3.5,
                  y: (Math.random() - 0.5) * 3.5,
               }
               this.particles.push(new Particle(x, y, randomVelocity.x, randomVelocity.y, 30, 8));
            }
         }

         this.init();

         this.draw = function() {
            for (var i = 0; i < this.particles.length; i++) {
               this.particles[i].update();

               if (this.particles[i].remove() == true) {
                  this.particles.splice(i, 1);
               };
            }
         }
      }

      var explosions = [];

      function animate() {
         window.requestAnimationFrame(animate);

         c.fillStyle = "#1e1e1e";
         c.fillRect(0, 0, canvas.width, canvas.height);

         explosions.push(new Explosion(mouse.x, mouse.y));

         for (var i = 0; i < explosions.length; i++) {
            explosions[i].draw();
         }
      }
      animate();
   </script>
   <?php require_once '_scripts.php' ?>
</body>

</html>