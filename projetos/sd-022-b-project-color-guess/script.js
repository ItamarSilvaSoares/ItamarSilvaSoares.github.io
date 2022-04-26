let fist = true; // variavel de controle de pontos
let pontua = 0; // pontuação
const pText = document.querySelector('#rgb-color'); // Texto Do paragrafo que contem o rbg

console.log(pText.innerHTML);
// Funcão que gera numeros aleatorio entre 0 e 256
function mudaTextRGB() {
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const red = Math.floor(Math.random() * 256);
  return `(${red}, ${green}, ${blue})`;
}

// Cria o container das bolas e as bolas
function creatBall() {
  const conteinerball = document.createElement('div');
  conteinerball.setAttribute('class', 'ball-conterner');
  for (let index = 0; index < 6; index += 1) {
    const ball = document.createElement('div');
    ball.setAttribute('class', 'ball');
    conteinerball.appendChild(ball);
  }
  const sinb = document.querySelector('#content-rgb').parentNode;
  sinb.appendChild(conteinerball);
}

// funcão que verifica se a cor está certa
function select(e) {
  const cor = e.target.style.backgroundColor;
  const certo = `rgb${pText.innerHTML}`;
  const balls = document.querySelectorAll('.ball');
  for (let index = 0; index < balls.length; index += 1) {
    balls[index].removeAttribute('id');
  }
  e.target.setAttribute('id', 'select');
  if (cor === certo) {
    document.querySelector('#answer').innerHTML = 'Acertou!';
    if (fist) {
      pontua += 3;
      document.querySelector('#score').innerText = `Pontos: ${pontua}`;
    }
  } else {
    document.querySelector('#answer').innerHTML = 'Errou! Tente novamente!';
  }
  fist = false;
}

// Adiciona Cores as bolas e iguala a cor a ser adivinhada
function adionaCorBall() {
  const balls = document.querySelectorAll('.ball');
  const random = Math.floor(Math.random() * balls.length);
  for (let index = 0; index < balls.length; index += 1) {
    balls[index].style.backgroundColor = `rgb${mudaTextRGB()}`;
    balls[index].removeAttribute('id');
    balls[index].addEventListener('click', select);
  }
  balls[random].style.backgroundColor = `rgb${pText.innerHTML}`;
}

// função que inicia um novo jogo
function novoGame() {
  fist = true;
  pText.innerText = mudaTextRGB();
  document.querySelector('#answer').innerHTML = 'Escolha uma cor';
  adionaCorBall();
}

// função que criar um botão e adicona a pagina
function criarBotao() {
  const button = document.createElement('button');
  button.setAttribute('id', 'reset-game');
  button.innerHTML = 'Novo Jogo';
  button.addEventListener('click', novoGame);
  document.querySelector('#answer').parentNode.appendChild(button);
}

function placar() {
  const pontos = document.createElement('div');
  pontos.setAttribute('id', 'score');
  pontos.innerText = `Pontos: ${pontua}`;
  pText.parentNode.appendChild(pontos);
}

window.onload = () => {
  const resposta = document.createElement('div');
  resposta.setAttribute('id', 'answer');
  resposta.innerHTML = 'Escolha uma cor';
  pText.innerHTML = mudaTextRGB();
  creatBall();
  adionaCorBall();
  document.querySelector('.ball-conterner').parentNode.appendChild(resposta);
  criarBotao();
  placar();
};
