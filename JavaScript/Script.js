function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("active");
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function changeFont(font) {
  document.body.style.fontFamily = font;
}

const imagens = [
  {
    src: "img3.png",
    descricao:
      "Casa Japonesa Antiga – Martial Spirit (em desenvolvimento)\nAno de desenvolvimento: 2025\n\nEsta modelagem 3D representa uma casa tradicional japonesa, criada com base em referências arquitetônicas reais para compor o universo estético e filosófico do jogo *Martial Spirit*. A modelagem e a texturização foram inteiramente desenvolvidas por mim no Blender, com atenção cuidadosa aos detalhes culturais, à paleta de cores e ao estilo low poly estilizado. Esse cenário faz parte de um conjunto maior de ambientes projetados para proporcionar uma experiência imersiva e respeitosa à tradição oriental. Este projeto ainda está em andamento, sendo parte integrante do TCC da nossa equipe no curso técnico de Jogos Digitais do IFPR.",
  },
  {
    src: "img4.png",
    descricao:
      "Colapso Cósmico – Jogo 3D de Sobrevivência Espacial\nAno de desenvolvimento: 2024\n\nNeste intenso jogo 3D de ficção científica, o jogador assume o papel do único tripulante sobrevivente de uma nave atingida por uma chuva de meteoros. Com os sistemas danificados e tempo limitado, é preciso agir rapidamente para completar tarefas, reparar estruturas e tentar sobreviver no espaço profundo. Atuei como programadora principal, responsável por implementar as mecânicas e interações na Unity, utilizando a linguagem C#. O projeto foi desenvolvido durante a disciplina de Programação de Jogos 3D e demonstra minhas habilidades em lógica, game design e resolução de problemas em cenários de tensão e emergência.",
  },
  {
    src: "img2.png",
    descricao:
      "Escola Japonesa 3D – Martial Spirit (em desenvolvimento)\nAno de desenvolvimento: 2025\n\nEsta construção 3D representa uma escola tradicional japonesa, pensada como espaço central de treino e convivência do protagonista do jogo *Martial Spirit*. Foi inteiramente modelada por mim no Blender, com foco estilizado, mantendo a harmonia estética do projeto geral. A proposta é integrar cultura, ambientação e narrativa em um só espaço. A estrutura ainda está em fase de desenvolvimento como parte de um cenário maior e mais complexo do nosso TCC. Este projeto reforça minha capacidade de criar ambientes narrativos imersivos e conectados à proposta pedagógica e filosófica do jogo.",
  },
  {
    src: "img1.png",
    descricao:
      "Martial Spirit – Jogo Educativo (TCC em equipe)\nAno de desenvolvimento: 2025\n\n*Martial Spirit* é um jogo RPG 3D educativo que está sendo desenvolvido como trabalho de conclusão de curso por nossa equipe no IFPR. O jogo propõe uma jornada imersiva que une a filosofia do Karate-Do a decisões éticas e conscientes feitas pelo jogador. O objetivo é provocar reflexão, aprendizado e empatia, usando o universo das artes marciais como pano de fundo.\n\nAtuo como gerente de projeto e designer geral, sendo responsável por todas as modelagens, texturizações, interfaces e elementos visuais — com exceção dos personagens. A experiência tem sido enriquecedora e desafiadora, exigindo visão de conjunto, coordenação de equipe, criatividade visual e domínio técnico em Blender e Unity. O desenvolvimento está em andamento, e estamos constantemente aperfeiçoando o projeto para entregar um jogo impactante, bonito e significativo.",
  },

  {
    src: "img5.png",
    descricao:
      "Jogo da Abelha — Um projeto desenvolvido com HTML, CSS e JavaScript, criado para a disciplina de Desenvolvimento Web. Neste jogo, o desafio é guiar uma abelha até as flores, desviando dos obstáculos pelo caminho. O projeto foi feito para praticar lógica de programação, manipulação de canvas e eventos de teclado, unindo criatividade e código em uma experiência leve e divertida!",
    link: "abelha.html",
  },
];

let indiceAtual = 0;
const imagensPorTela = 3;

function exibirImagens() {
  const container = document.getElementById("carrossel-imagens");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < imagensPorTela; i++) {
    const index = (indiceAtual + i) % imagens.length;
    const img = document.createElement("img");
    img.src = imagens[index].src;
    img.alt = `Imagem ${index + 1}`;
    img.classList.add("imagem-pop");
    img.setAttribute("data-descricao", imagens[index].descricao);
    container.appendChild(img);
  }
}

function mudarImagens(direcao) {
  indiceAtual =
    (indiceAtual + direcao * imagensPorTela + imagens.length) % imagens.length;
  exibirImagens();
}

function fecharViewer() {
  const viewerOverlay = document.getElementById("viewer-overlay");
  const viewer = document.getElementById("viewer");
  if (!viewerOverlay || !viewer) return;

  viewerOverlay.style.display = "none";
  viewer.innerHTML = "";
  const script = document.querySelector(
    'script[src="JavaScript/HouseViewer.js"]'
  );
  if (script) script.remove();
}

document.addEventListener("DOMContentLoaded", () => {
  exibirImagens();

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("imagem-pop")) {
      const src = e.target.getAttribute("src");
      const descricao = e.target.getAttribute("data-descricao");

      if (src.includes("img3.png")) {
        const viewerOverlay = document.getElementById("viewer-overlay");
        viewerOverlay.style.display = "flex";

        if (!document.getElementById("viewer").hasChildNodes()) {
          const script = document.createElement("script");
          script.type = "module";
          script.src = "JavaScript/HouseViewer.js";
          document.body.appendChild(script);
        }

        viewerOverlay.addEventListener("click", (ev) => {
          if (ev.target === viewerOverlay) {
            fecharViewer();
          }
        });

        document.addEventListener("keydown", (ev) => {
          if (ev.key === "Escape") {
            fecharViewer();
          }
        });
      } else if (src.includes("img5.png")) {
        const popup = window.open(
          "",
          "popupAbelha",
          `width=600,height=${screen.height},resizable=yes,scrollbars=yes`
        );

        if (popup) {
          popup.document.write(`
            <html>
              <head>
                <title>Jogo da Abelha</title>
                <style>
                  html, body {
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    font-family: 'Poppins', sans-serif;
                    background-color: #0e0e0e;
                    color: #f0f0f0;
                    text-align: center;
                    overflow-y: auto;
                  }
                  h1 {
                    color: #fff;
                    font-size: 1.8rem;
                    margin: 15px 0;
                    background: linear-gradient(
                      to right,
                      transparent,
                      #a259ff,  
                      #8e3ee6,
                      #a259ff,
                      transparent
                    );
                    opacity: 0.9;
                  }
                  img {
                    max-width: 90%;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                    margin-bottom: 20px;
                  }
                  p {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #ccc;
                    white-space: pre-line;
                    margin: 0 20px 20px;
                  }
                  a {
                    display: inline-block;
                    background: linear-gradient(to right, #a259ff, #8e3ee6);
                    color: #fff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-weight: bold;
                    transition: transform 0.2s ease;
                  }
                  a:hover {
                    transform: scale(1.05);
                  }
                </style>
              </head>
              <body>
                <h1>Jogo da Abelha</h1>
                <img src="${src}" alt="Imagem">
                <p>${descricao}</p>
                <a href="abelha.html" target="_blank">Acessar o jogo</a>
              </body>
            </html>
          `);
          popup.document.close();
          popup.focus();
        } else {
          alert("Por favor, permita pop-ups para visualizar as informações.");
        }
      } else if (src.includes("img1.png")) {
        const popup = window.open(
          "",
          "popupMartialSpirit",
          `width=600,height=${screen.height},resizable=yes,scrollbars=yes`
        );

        if (popup) {
          popup.document.write(`
            <html>
              <head>
                <title>Martial Spirit – Jogo Educativo</title>
                <style>
                  html, body {
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    font-family: 'Poppins', sans-serif;
                    background-color: #0e0e0e;
                    color: #f0f0f0;
                    text-align: center;
                    overflow-y: auto;
                  }
                  h1 {
                    color: #fff;
                    font-size: 1.8rem;
                    margin: 15px 0;
                    background: linear-gradient(
                      to right,
                      transparent,
                      #a259ff,  
                      #8e3ee6,
                      #a259ff,
                      transparent
                    );
                    opacity: 0.9;
                  }
                  img {
                    max-width: 90%;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                    margin-bottom: 20px;
                  }
                  p {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #ccc;
                    white-space: pre-line;
                    margin: 0 20px 20px;
                  }
                  a {
                    display: inline-block;
                    background: linear-gradient(to right, #a259ff, #8e3ee6);
                    color: #fff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-weight: bold;
                    transition: transform 0.2s ease;
                    margin-bottom: 30px;
                  }
                  a:hover {
                    transform: scale(1.05);
                  }
                </style>
              </head>
              <body>
                <h1>Martial Spirit – Jogo Educativo</h1>
                <img src="${src}" alt="Imagem">
                <p>${descricao}</p>
                <a href="https://maluespi.github.io/MartialSpiritSite/" target="_blank">Acessar o site do jogo</a>
              </body>
            </html>
          `);
          popup.document.close();
          popup.focus();
        } else {
          alert("Por favor, permita pop-ups para visualizar as informações.");
        }
      } else {
        const popup = window.open(
          "",
          "popupDescricao",
          `width=600,height=${screen.height},resizable=yes,scrollbars=yes`
        );

        if (popup) {
          popup.document.write(`
            <html>
              <head>
                <title>Visualização da Imagem</title>
                <style>
                  html, body {
                    margin: 0;
                    padding: 0;
                    height: 100vh;
                    font-family: 'Poppins', sans-serif;
                    background-color: #0e0e0e;
                    color: #f0f0f0;
                    text-align: center;
                    overflow-y: auto;
                  }
                  h1 {
                    color: #fff;
                    font-size: 1.8rem;
                    margin: 15px 0;
                    background: linear-gradient(
                      to right,
                      transparent,
                      #a259ff,  
                      #8e3ee6,
                      #a259ff,
                      transparent
                    );
                    opacity: 0.8;
                  }
                  img {
                    max-width: 90%;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
                    margin-bottom: 20px;
                  }
                  p {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: #ccc;
                    white-space: pre-line;
                    margin: 0 20px 20px;
                  }
                </style>
              </head>
              <body>
                <h1>Descrição da Imagem</h1>
                <img src="${src}" alt="Imagem">
                <p>${descricao}</p>
              </body>
            </html>
          `);
          popup.document.close();
          popup.focus();
        } else {
          alert("Por favor, permita pop-ups para visualizar as informações.");
        }
      }
    }
  });
});
