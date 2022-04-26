const titulo = document.querySelector('#title');
const cabeca = document.querySelector('#cabecalho');
let contBottom = []; // recebe um elemento do container de botton buttons
let listTarefa = []; // recebe um elemento ul

// Criador de elementos
function criarElemento(elemento, indent, text) {
  const element = document.createElement(elemento);
  if (indent[0]) {
    element.setAttribute(indent[0], indent[1]);
  }

  if (text) {
    element.innerText = text;
  }
  return element;
}

// função que seleciona um item da lista
function select(e) {
  const lis = document.querySelectorAll('li');
  for (let index = 0; index < lis.length; index += 1) {
    if (lis[index].classList.contains('selected')) {
      lis[index].classList.remove('selected');
      break;
    }
  }
  e.target.classList.toggle('selected');
}

// função que marca o item da lista como feito
function feito(e) {
  e.target.classList.toggle('completed');
}

// função que acresenta tarefas a lista
function setTarefa() {
  const valor = document.querySelector('#texto-tarefa');
  if (valor.value.length !== 0) {
    const li = criarElemento('li', ['', ''], '');
    li.innerText = valor.value;
    li.addEventListener('click', select);
    li.addEventListener('dblclick', feito);
    listTarefa.appendChild(li);
    valor.value = '';
    valor.focus();
  }
}

// função que cria um paragrafo
function p() {
  const pText = 'Clique duas vezes em um item para marcá-lo como completo';
  titulo.parentNode.appendChild(criarElemento('p', ['id', 'funcionamento'], pText));
}

// criar conteiner do input e do botão
function inp() {
  cabeca.parentNode.appendChild(criarElemento('div', ['id', 'cont-button'], ''));
  const contBottun = document.querySelector('#cont-button');
  contBottun.appendChild(criarElemento('input', ['id', 'texto-tarefa'], ''));
  document.querySelector('#texto-tarefa').placeholder = 'tarefas';
}
// Lista ordenada
function lista(contBottun) {
  contBottun.parentNode.appendChild(criarElemento('div', ['id', 'cont-lista'], ''));
  const contList = document.querySelector('#cont-lista');
  contList.appendChild(criarElemento('ol', ['id', 'lista-tarefas'], ''));
  listTarefa = document.querySelector('#lista-tarefas');
}

// função que paga a lista toda
function aux(lis) {
  for (let index = 0; index < lis.length; index += 1) {
    listTarefa.removeChild(lis[index]);
  }
}
function apagar(e) {
  let lis = [];
  if (e.target.innerText === 'Remover Finalizados') {
    lis = document.querySelectorAll('.completed');
  } else {
    lis = document.querySelectorAll('li');
  }
  aux(lis);
}

// chamada que cria o botão apaga tudo e adicona a pagina
function bApaga() {
  // está confuso tenho que melhorar
  const listaNode = document.querySelector('#cont-lista').parentNode;
  listaNode.appendChild(criarElemento('div', ['id', 'bottom-Button'], ''));
  contBottom = document.querySelector('#bottom-Button');
  contBottom.appendChild(criarElemento('button', ['id', 'apaga-tudo'], 'Apagar Tudo'));
  const buttonBottom = document.querySelector('#apaga-tudo');
  buttonBottom.addEventListener('click', apagar);
  const bRemove = criarElemento('button', ['id', 'remover-finalizados'], 'Remover Finalizados');
  bRemove.addEventListener('click', apagar);
  contBottom.appendChild(bRemove);
}

// função que salva o conteudo dos itens, e as classes em um array de objs
function save() {
  localStorage.clear();
  const toSave = [];
  const lis = document.querySelectorAll('li');
  for (let index = 0; index < lis.length; index += 1) {
    toSave.push({ text: lis[index].innerText,
      clases: lis[index].classList });
    localStorage.setItem('lis', JSON.stringify(toSave));
    console.log(toSave[0].clases.length);
  }
}
// chamada que cria o botão salvar
function bSave() {
  const buSave = criarElemento('button', ['id', 'salvar-tarefas'], 'Salvar');
  buSave.addEventListener('click', save);
  contBottom.appendChild(buSave);
}

// função que restaura os itens salvos
function recover() {
  const objsRecover = JSON.parse(localStorage.getItem('lis'));
  for (let index = 0; index < objsRecover.length; index += 1) {
    const li = criarElemento('li', ['', ''], `${objsRecover[index].text}`);
    for (let indexC = 0; indexC < Object.keys(objsRecover[index]).length; indexC += 1) {
      li.classList.add(objsRecover[index].clases[indexC]);
      li.classList.remove('undefined');
    }
    li.addEventListener('click', select);
    li.addEventListener('dblclick', feito);
    listTarefa.appendChild(li);
  }
}

// codigo de referencia para os codigo moverCima e moverBaixo https://www.codegrepper.com/code-examples/javascript/javascript+move+list+items+up+and+down
// mover um item da lista para cima
function moverCima() {
  const lis = document.querySelectorAll('li');
  for (let index = 0; index < lis.length; index += 1) {
    if (lis[index].classList.contains('selected') && lis[index].previousElementSibling) {
      lis[index].parentNode.insertBefore(lis[index], lis[index].previousElementSibling);
      break;
    }
  }
}

// chamada de criação de botão up
function bCima() {
  const up = criarElemento('button', ['id', 'mover-cima'], '↑');
  up.addEventListener('click', moverCima);
  contBottom.appendChild(up);
}

// função que move um item da lista para baixo
function moverBaixo() {
  const lis = document.querySelectorAll('li');
  for (let index = 0; index < lis.length; index += 1) {
    if (lis[index].classList.contains('selected') && lis[index].nextElementSibling) {
      lis[index].parentNode.insertBefore(lis[index].nextElementSibling, lis[index]);
      break;
    }
  }
}

// chamada que cria o botão para baixo
function bBaixo() {
  const down = criarElemento('button', ['id', 'mover-baixo'], '↓');
  down.addEventListener('click', moverBaixo);
  contBottom.appendChild(down);
}

function apagarSelec() {
  if (document.querySelector('.selected')) {
    listTarefa.removeChild(document.querySelector('.selected'));
  }
}

function bApagaSelec() {
  const apagaSelec = criarElemento('button', ['id', 'remover-selecionado'], 'Remover Selecionado');
  apagaSelec.addEventListener('click', apagarSelec);
  contBottom.appendChild(apagaSelec);
}

window.onload = () => {
  p();
  // chamada de criação do input
  inp();
  // criação da variel que contem o container do input e botão
  const contBottun = document.querySelector('#cont-button');
  // Lista ordenada
  lista(contBottun);
  // botão criar tarefa
  contBottun.appendChild(criarElemento('button', ['id', 'criar-tarefa'], 'Criar Tarefa'));
  document.querySelector('#criar-tarefa').addEventListener('click', setTarefa);
  bApaga();
  bSave();
  bCima();
  bBaixo();
  bApagaSelec();
  if (localStorage.length !== 0) {
    recover();
  }
};
