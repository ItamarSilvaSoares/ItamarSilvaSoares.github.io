// Desafio 11
function repeatThreeOver(numbers, string) {
  let result = null;
  for (let number of numbers) {
    let regEx = new RegExp(number, 'g');
    result = string.match(regEx);
    if (result.length >= 3) {
      result = true;
      break;
    } else {
      result = false;
    }
  }
  return result;
}

function generatePhoneNumber(array) {
  let arrayText = array.toString();
  let resultado = null;
  if (array.length !== 11) {
    resultado = 'Array com tamanho incorreto.';
  } else if (/\d{2}|-/.test(arrayText) || repeatThreeOver(array, arrayText)) {
    resultado = 'não é possível gerar um número de telefone com esses valores';
  } else {
    resultado = arrayText.replace(/\D/g, '');
    resultado = resultado.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  return resultado;
}

// Desafio 12
function menorQSoma(lineA, lineB, lineC) {
  let aux = false;
  let aMaisB = lineA + lineB;
  let aMaisC = lineA + lineC;
  let bMaisC = lineB + lineC;
  if (aMaisB > lineC && aMaisC > lineB && bMaisC > lineA) {
    aux = true;
  }
  return aux;
}

function maiorAbs(lineA, lineB, lineC) {
  let aux = false;
  let aMenosB = Math.abs(lineA - lineB);
  let aMenosC = Math.abs(lineA - lineC);
  let bMenosC = Math.abs(lineB - lineC);
  if (aMenosB < lineC && aMenosC < lineB && bMenosC < lineA) {
    aux = true;
  }
  return aux;
}

function triangleCheck(lineA, lineB, lineC) {
  let result = false;
  if (menorQSoma(lineA, lineB, lineC) && maiorAbs(lineA, lineB, lineC)) {
    result = true;
  }
  return result;
}

// Desafio 13
function hydrate(string) {
  let copos = 0;
  let arrayNumbers = string.match(/\d/g);
  for (const char of arrayNumbers) {
    copos += Number(char);
  }
  if (copos === 1) {
    return `${copos} copo de água`;
  }
  return `${copos} copos de água`;
}

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
