var pincel = document.getElementById("canvas").getContext("2d");
var canvas = document.getElementById("canvas");

//menu, jogando, gameover, vitoria
let estado = "menu";

//Telas e botões
const menu = document.getElementById("menu");
const gameOver = document.getElementById("gameOver");
const vitoria = document.getElementById("vitoria");
const btnJogar = document.getElementById("btnJogar");
const btnRetry = document.getElementById("btnRetry");
const btnPlayAgain = document.getElementById("btnPlayAgain");

//Funções de troca de tela
function mostrarMenu() {
  estado = "menu";
  menu.classList.remove("hidden");
  gameOver.classList.add("hidden");
  vitoria.classList.add("hidden");
}

function iniciarJogo() {
  estado = "jogando";
  menu.classList.add("hidden");
  gameOver.classList.add("hidden");
  vitoria.classList.add("hidden");
  reiniciarJogo();
}

function mostrarGameOver() {
  estado = "gameover";
  gameOver.classList.remove("hidden");
}

function mostrarVitoria() {
  estado = "vitoria";
  vitoria.classList.remove("hidden");
}

//Eventos dos botões
btnJogar.addEventListener("click", iniciarJogo);
btnRetry.addEventListener("click", iniciarJogo);
btnPlayAgain.addEventListener("click", iniciarJogo);

//Objetos do jogo
var bg = new Bg(0, 0, 900, 720, "img/30a05b8e-2812-49fe-b4d2-c78284a834c5.png");
var bg2 = new Bg(
  0,
  -900,
  900,
  720,
  "img/30a05b8e-2812-49fe-b4d2-c78284a834c5.png"
);
var flor, abelha, aranha;
var placar = new Text();
var perdeu = new Text();
var sons = new Sons();

//Variáveis de jogo
var floresColetadas,
  metaFlores,
  tempoTotal,
  tempoRestante,
  podeLevarDano,
  tempoInvulneravel;
var play = true;

function reiniciarJogo() {
  abelha = new Abelha(400, 600, 120, 120, "img/bee1.png");
  aranha = new Aranha(Math.random() * 800, -100, 110, 110, "img/spider1.png");
  flor = new Flor(Math.random() * 800, -50, 70, 70, "img/flower1.png");

  abelha.lifes = 3;
  floresColetadas = 0;
  metaFlores = 2;
  tempoTotal = 30;
  tempoRestante = tempoTotal;
  podeLevarDano = true;
  tempoInvulneravel = 1000;
  play = true;
}

//Cronômetr
function cronometro() {
  if (estado === "jogando" && tempoRestante > 0) {
    tempoRestante -= 1;
  } else if (tempoRestante <= 0 && floresColetadas < metaFlores) {
    play = false;
  }
}
setInterval(cronometro, 1000);

//Controles
document.addEventListener("keydown", function (event) {
  if (estado !== "jogando") return;
  if (event.key === "d") abelha.dir = 3;
  if (event.key === "a") abelha.dir = -3;
});
document.addEventListener("keyup", function (event) {
  if (estado !== "jogando") return;
  abelha.dir = 0;
});

//Colisões e fim de jogo
function collides() {
  if (abelha.collide(aranha) && podeLevarDano) {
    podeLevarDano = false;
    abelha.lifes -= 1;
    sons.tocarAranha();
    aranha.mudaPosicao();

    setTimeout(() => (podeLevarDano = true), tempoInvulneravel);
  }

  if (abelha.collide(flor)) {
    flor.mudaPosicao();
    floresColetadas += 1;
    sons.tocarFlor();
  }

  if (floresColetadas >= metaFlores) {
    play = false;
    setTimeout(mostrarVitoria, 1000);
  }
}

function gameover() {
  if (
    abelha.lifes <= 0 ||
    (tempoRestante <= 0 && floresColetadas < metaFlores)
  ) {
    play = false;
    sons.tocarGameOver();
    setTimeout(mostrarGameOver, 1000);
  }
}

//Loop principal
function update() {
  if (estado === "jogando" && play) {
    abelha.move();
    abelha.animation("bee");
    aranha.move();
    aranha.animation("spider");
    flor.move();
    collides();
    gameover();
  }
}

function draw() {
  pincel.clearRect(0, 0, 900, 720);
  bg.desenha();
  bg2.desenha();

  if (estado === "jogando") {
    abelha.desenha();
    aranha.desenha();
    flor.desenha();
    placar.draw("💛 Vida: " + abelha.lifes, 25, 45, "#ffb300");
    placar.draw(
      "🌸 Flores: " + floresColetadas + " / " + metaFlores,
      25,
      80,
      "#e91e63"
    );
    placar.draw("⏰ Tempo: " + tempoRestante + "s", 25, 115, "#2196f3");
  }
}

function main() {
  update();
  draw();
}

setInterval(main, 10);
