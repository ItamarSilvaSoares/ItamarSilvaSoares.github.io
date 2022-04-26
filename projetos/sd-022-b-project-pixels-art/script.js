// função que pinta um pixel
function pintar(e) {
  const cor = document.querySelector('.selected').style.backgroundColor;
  e.target.style.backgroundColor = cor;
}

// criador de elementos
function criarElemento(clase, tipo, fundoCor) {
  const element = document.createElement(tipo);
  element.addEventListener('click', pintar);
  if (clase.length !== 0) {
    element.setAttribute('class', clase);
  }
  if (fundoCor.length !== 0) {
    element.style.backgroundColor = fundoCor;
  }
  return element;
}

// seleciona color
function select(event) {
  const paletas = document.querySelectorAll('.color');
  for (let index = 0; index < paletas.length; index += 1) {
    paletas[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

// Função que cria as paletas e adicona a pagina
function criaPaletas(cores) {
  for (let index = 0; index < cores.length; index += 1) {
    const element = document.createElement('div');
    element.setAttribute('class', 'color');
    element.style.backgroundColor = cores[index];
    element.style.border = '1px solid black';
    element.style.display = 'inline-block';
    element.addEventListener('click', select);
    document.querySelector('#color-palette').appendChild(element);
  }
}

// criador da grid
function grid(pixels) {
  const grade = document.querySelector('#pixel-board');
  const colunas = `repeat(${pixels}, 42px)`;
  grade.style.gridTemplateColumns = colunas;
  for (let index = 0; index < pixels * pixels; index += 1) {
    grade.appendChild(criarElemento('pixel', 'div', 'rgb(255, 255, 255)'));
  }
}

// função que limpa os pixels
function limpar() {
  const paletas = document.querySelectorAll('.pixel');
  for (let index = 0; index < paletas.length; index += 1) {
    paletas[index].style.backgroundColor = 'rgb(255, 255, 255)';
  }
}

// criar botão
function criarBotao(id, funcao, text) {
  const botao = document.createElement('button');
  botao.setAttribute('id', id);
  botao.innerText = text;
  botao.addEventListener('click', funcao);
  botao.style.display = 'inline-block';
  botao.style.margin = '10px';
  document.querySelector('#bo').appendChild(botao);
}

// criar input
function criarInput() {
  const input = document.createElement('input');
  input.type = 'number';
  input.setAttribute('id', 'board-size');
  input.placeholder = '5 à 50';
  input.min = 1;
  document.querySelector('#bo').appendChild(input);
}

function enviar() {
  let valor = document.querySelector('#board-size').value;
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    document.querySelector('#pixel-board').removeChild(pixels[index]);
    console.log(document.querySelector('.pixel-board'));
  }
  if (valor === '') {
    window.alert('Board inválido!');
  }
  if (valor < 5) {
    valor = 5;
  }
  if (valor > 50) {
    valor = 50;
  }
  grid(valor);
}

// Geradore de cor
// codigo consultado em https://www.horadecodar.com.br/2022/01/16/gerar-cor-aleatoria-com-javascript/
function generateColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let index = 0; index < 6; index += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

window.onload = () => {
  const corPaleta = [
    'black',
    generateColor(),
    generateColor(),
    generateColor(),
  ];
  criaPaletas(corPaleta);
  grid(5);
  document.querySelector('.color').classList.add('selected');
  criarBotao('clear-board', limpar, 'Limpar');
  criarInput();
  criarBotao('generate-board', enviar, 'VQV');
};
