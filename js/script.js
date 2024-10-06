"use strict";
import { globalVars, DOMvars } from "./globals.js";
import { shuffle, resetBoard } from "./utils.js";
import { updateDisplay, showPopup } from "./ui.js";
import { handleEventListeners } from "./event.js";

// Resetea contadores
function resetCounters() {
  globalVars.triesCounter = 0;
  globalVars.errorCounter = 0;
  globalVars.successCounter = 0;
}

// Inicio de juego
export function startGame() {
  resetCounters();
  updateDisplay();

  //Generar cartas según nivel actual
  generateCards(globalVars.allLevels[globalVars.currentLevel]);

  //Resetear el tablero
  resetBoard(globalVars);
}

// Generamos cartas según el nivel
function generateCards(numCards) {
  DOMvars.cardContainer.innerHTML = ""; //borra el valor de las cartas (si es que existe)
  setCardGrid(numCards); // Ajusta la cuadrícula de cartas según el número de cartas

  // Ajusta el array según el nivel
  const pairedEmojis = globalVars.emojis
    .slice(0, numCards / 2)
    .concat(globalVars.emojis.slice(0, numCards / 2));
  const shuffledEmojis = shuffle(pairedEmojis); //Baraja cartas

  //bucle para crear las cartas
  for (let i = 0; i < numCards; i++) {
    const card = createCard(shuffledEmojis[i]);
    DOMvars.cardContainer.appendChild(card);
  }
  resetBoard(globalVars);
}

function createCard(emoji) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `
        <div class="content">
          <div class="front">❔</div>
          <div class="back">${emoji}</div>
        </div>`;

  card.addEventListener("click", flipCard); //evento flipCard en cada carta
  return card;
}

//función que se llama cada vez que hay un click en una carta:
function flipCard() {
  if (globalVars.notBingo || this === globalVars.firstCard) return; // Si no hay bingo o la carta ya está volteada, se sale de la función

  // Agrega la clase .flipped para voltear la carta
  this.classList.add("flipped");

  // Si no hay primera carta, asigna la actual como firstCard
  if (!globalVars.firstCard) {
    globalVars.firstCard = this;
    return;
  }

  globalVars.secondCard = this; //Si firstCard ya tiene un valor asigna la carta actual (this) a secondCard
  globalVars.triesCounter++; //Incrementamos el contador de tries
  updateDisplay();
  checkForMatch(); //Llama a la función checkForMatch para comprobar si las cartas coinciden, para dejarlas boca arriba (disabledCards()) o volverlas a voltear (unflipCards()).
}

// Comprueba si el contenido de las 2 cartas coincide:
function checkForMatch() {
  const isMatch =
    globalVars.firstCard.querySelector(".back").textContent ===
    globalVars.secondCard.querySelector(".back").textContent;

  if (isMatch) {
    disableCards();
    globalVars.successCounter++; // Incrementa el contador de aciertos
    updateDisplay();

    if (
      globalVars.successCounter ===
      globalVars.allLevels[globalVars.currentLevel] / 2
    ) {
      //compara los aciertos actuales con el nº total de pares
      showPopup();
    }
  } else {
    unflipCards();
  }
}

//la llamaremos cuando las 2 cartas volteadas coincidan para deshabilitar su interactividad y q se queden boca arriba
function disableCards() {
  globalVars.firstCard.removeEventListener("click", flipCard); //eliminamos evento
  globalVars.secondCard.removeEventListener("click", flipCard);
  resetBoard(globalVars); //reseteamos valores 1ra, 2da y comparación de cartas
}

//las cartas vuelven a su estado original si, al clickarlas no hay coincidencias
function unflipCards() {
  globalVars.errorCounter++; //sumamos contador fallos
  updateDisplay();
  globalVars.notBingo = true; //no hay bingo, las 2 cartas desvolteadas, se vuelven a voltear

  //función que eliminará el evento flipped pasado 1 sec
  setTimeout(() => {
    globalVars.firstCard.classList.remove("flipped");
    globalVars.secondCard.classList.remove("flipped");
    resetBoard(globalVars); //reseteamos valores 1ra, 2da y comparación de cartas
  }, 1000);
}

//Inicialización del juego al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  startGame();
  handleEventListeners(); // Inicia los eventos necesarios

  //menú lateral izquierdo
  const dropbtn = document.querySelector(".dropbtn");
  const dropdownContent = document.querySelector(".dropdown-content");

  //abrir y cerrar el menu
  dropbtn.addEventListener("click", () => {
    dropdownContent.style.display =
      dropdownContent.style.display === "block" ? "none" : "block";
  });

  //cerramos el menú lateral izquierdo si se clicka fuera de él
  window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropbtn")) {
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      }
    }
  });
});

function setCardGrid(numCards) {
  //Eliminar grids previos (si existiesen)
  DOMvars.cardContainer.classList.remove("grid-4x4", "grid-5x4", "grid-6x4");

  //Asignar la clase correcta según el número de cartas
  if (numCards === 16) {
    DOMvars.cardContainer.classList.add("grid-4x4"); //lama al css
  } else if (numCards === 20) {
    DOMvars.cardContainer.classList.add("grid-5x4");
  } else if (numCards === 24) {
    DOMvars.cardContainer.classList.add("grid-6x4");
  }
}
