/* eslint-disable guard-for-in */
// Desafio 1
function compareTrue(condition1, condition2) {
  if (condition1 === true && condition2 === true) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, altura) {
  return (base * altura) / 2;
}

// Desafio 3
function splitSentence(string) {
  let array = string.split(' ');
  return array;
}

// Desafio 4
function concatName(array) {
  let string = `${array[array.length - 1]}, ${array[0]}`;

  return string;
}

// Desafio 5
function footballPoints(wins, ties) {
  let pontos = 0;
  let partidas = wins + ties;
  for (let index = 0; index < partidas; index += 1) {
    if (wins !== 0) {
      pontos += 3;
      wins -= 1;
    }
    if (ties !== 0) {
      pontos += 1;
      ties -= 1;
    }
  }
  return pontos;
}

// Desafio 6
function highestCount(numbers) {
  let contador = 0;
  // O codigo para o maior numeor foi retirdo de https://pt.stackoverflow.com/questions/35202/como-saber-o-maior-valor-de-um-array
  let maiorNumero = Math.max.apply(null, numbers);
  for (const number of numbers) {
    if (number === maiorNumero) {
      contador += 1;
    }
  }
  return contador;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  if (cat1 < cat2 && cat1 !== 0) {
    return 'cat1';
  }
  if (cat2 < cat1 && cat2 !== 0) {
    return 'cat2';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8 parte da resulução
function divisivel5E3(numero) {
  if (numero % 3 === 0 && numero % 5 !== 0) {
    return 'fizz';
  }
  if (numero % 5 === 0 && numero % 3 !== 0) {
    return 'buzz';
  }
  return 'fizzBuzz';
}

// Desafio 8
function fizzBuzz(numbers) {
  let result = [];
  for (const number of numbers) {
    if (number % 3 === 0 || number % 5 === 0) {
      result.push(divisivel5E3(number));
    } else {
      result.push('bug!');
    }
  }
  return result;
}

// Desafio 9 parte da resulução
function rename(char, bool) {
  let codigo = {
    a: 1,
    e: 2,
    i: 3,
    o: 4,
    u: 5,
  };
  let aux = char;
  for (const key in codigo) {
    if (key === char && bool) {
      aux = codigo[key];
      break;
    } else if (codigo[key].toString() === char) {
      aux = key;
    }
  }
  return aux;
}

// Desafio 9
function encode(string) {
  let arrayString = string.split('');

  for (let index = 0; index < arrayString.length; index += 1) {
    arrayString[index] = rename(arrayString[index], true);
  }

  return arrayString.join('');
}
function decode(string) {
  let arrayString = string.split('');

  for (let index = 0; index < arrayString.length; index += 1) {
    arrayString[index] = rename(arrayString[index], false);
  }

  return arrayString.join('');
}

// Desafio 10
function techList(array, nome) {
  let obj = [];
  if (array.length === 0) {
    return 'Vazio!';
  }
  array.sort();
  for (const tec of array) {
    obj.push({ tech: tec, name: nome });
  }
  return obj;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
