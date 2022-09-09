const display = document.getElementById("display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let novoNumero = true;
let armazenarNumero;
let armazenarOperador;

const atualizarDisplay = (texto) => {
  if (novoNumero) {
    display.textContent = texto.toLocaleString("BR");
    novoNumero = false;
  } else {
    display.textContent += texto.toLocaleString("BR");
  }
};

const operacaoPendente = () => armazenarOperador !== undefined;

const calcular = () => {
  if (operacaoPendente()) {
    const numeroAtual = parseFloat(display.textContent.replace(",","."));
    novoNumero = true;
    if (armazenarOperador === "+") {
      atualizarDisplay(armazenarNumero + numeroAtual);
    } else if (armazenarOperador === "-") {
      atualizarDisplay(armazenarNumero - numeroAtual);
    } else if (armazenarOperador === "*") {
      atualizarDisplay(armazenarNumero * numeroAtual);
    } else if (armazenarOperador === "/") {
      atualizarDisplay(armazenarNumero / numeroAtual);
    }
  }
};

const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

numeros.forEach((numero) => numero.addEventListener("click", inserirNumero));

const selecionarOperador = (evento) => {
  if (!novoNumero) {
    calcular();
    novoNumero = true;
    armazenarOperador = evento.target.textContent;
    armazenarNumero = parseFloat(display.textContent.replace(",","."));
  }
};

operadores.forEach((operador) =>
  operador.addEventListener("click", selecionarOperador)
);
const acionarIgual = () => {
  calcular();
  armazenarOperador = undefined;
};

document.getElementById("igual").addEventListener("click", acionarIgual);

const limparDisplay = () => (display.textContent = "");

document
  .getElementById("limparDisplay")
  .addEventListener("click", limparDisplay);

const limparCalculo = () => {
  limparDisplay();
  armazenarNumero = undefined;
  novoNumero = true;
  armazenarOperador = undefined;
};

document
  .getElementById("limparCalculo")
  .addEventListener("click", limparCalculo);

const removerUltimoNumero = () =>
  (display.textContent = display.textContent.slice(0, -1));

document
  .getElementById("backSpace")
  .addEventListener("click", removerUltimoNumero);

const trasformarEmNegativo = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
};

document
  .getElementById("inverter")
  .addEventListener("click", trasformarEmNegativo);

const existeVirgula = () => display.textContent.indexOf(",") !== -1;
const existeValor = () => display.textContent.length > 0;
const trasformarDecimal = () => {
  if (!existeVirgula()) {
    if (existeValor()) {
      atualizarDisplay(",");
    } else {
      atualizarDisplay("0,");
    }
  }
};
document.getElementById("decimal").addEventListener("click", trasformarDecimal);
